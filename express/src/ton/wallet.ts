import { TonClient, WalletContractV5R1, internal } from '@ton/ton';
import { external, storeMessage, beginCell, Cell, SendMode, Address } from '@ton/core';
import { mnemonicToPrivateKey } from '@ton/crypto';
import dotenv from 'dotenv';

dotenv.config();

export class InsufficientBalanceError extends Error {
    constructor(
        public required: bigint,
        public available: bigint,
    ) {
        super(
            `Insufficient balance: you need ${required} nanoton, ` +
            `available ${available} nanoton (required ${required - available})`
        );
        this.name = 'InsufficientBalanceError';
    }
}

const GAS_RESERVE = 100_000_000n; 

let client: TonClient | null = null;

function getClient(): TonClient {
    if (!client) {
        const apiKey = process.env.TONCENTER_API_KEY;
        client = new TonClient({
            endpoint: 'https://toncenter.com/api/v2/jsonRPC',
            ...(apiKey ? { apiKey } : {}),
        });
    }
    return client;
}

async function getWallet() {
    const mnemonic = process.env.WALLET_MNEMONIC!.split(' ');
    const keyPair = await mnemonicToPrivateKey(mnemonic);
    const wallet = WalletContractV5R1.create({
        publicKey: keyPair.publicKey,
        workchain: 0,
    });
    return { wallet, keyPair };
}

export async function signAndSendStarsTx(tx: any): Promise<string> {
    const tonClient = getClient();
    const { wallet, keyPair } = await getWallet();
    const contract = tonClient.open(wallet);

    const balance = await contract.getBalance();
    const state = await tonClient.getContractState(wallet.address);
    console.log('Wallet address:', wallet.address.toString());
    console.log('Balance:', balance);
    console.log('Contract state:', state.state);

    const seqno = await contract.getSeqno();

    const totalNeeded = tx.messages.reduce(
        (sum: bigint, m: any) => sum + BigInt(m.amount),
        0n
    ) + GAS_RESERVE;

    if (balance < totalNeeded) {
        throw new InsufficientBalanceError(totalNeeded, balance);
    }

    if (tx.from) {
        try {
            const fromMatches = Address.parse(tx.from).equals(wallet.address);
            if (!fromMatches) {
                console.warn(
                    'WARNING: Fragment waiting payment',
                    tx.from,
                    'payment',
                    wallet.address.toString()
                );
            }
        } catch {
            console.warn('error parse tx.from:', tx.from);
        }
    }
   

    const transferBody = wallet.createTransfer({
        seqno,
        secretKey: keyPair.secretKey,
 
        sendMode: SendMode.PAY_GAS_SEPARATELY,
        messages: tx.messages.map((m: any) =>
            internal({
                to: m.address,
                value: BigInt(m.amount),
                body: m.payload ? Cell.fromBase64(m.payload) : undefined,
                bounce: true,
            })
        ),
    });

  
    const externalMessage = external({
        to: wallet.address,
        init: seqno === 0 ? wallet.init : undefined,
        body: transferBody,
    });

    const cell = beginCell()
        .store(storeMessage(externalMessage))
        .endCell();

    const bocBuffer = cell.toBoc();
    const boc = bocBuffer.toString('base64');

     try {
        await tonClient.sendFile(bocBuffer);
    } catch (err: any) {
        console.error('TonCenter error status:', err.response?.status);
        console.error('TonCenter error body:', err.response?.data);
        throw err;
    }
   
    const CONFIRM_TIMEOUT_MS = 30_000;
    const POLL_INTERVAL_MS = 3_000;
    const deadline = Date.now() + CONFIRM_TIMEOUT_MS;
    let confirmed = false;

    while (Date.now() < deadline) {
        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
        const newSeqno = await contract.getSeqno();
        if (newSeqno > seqno) {
            confirmed = true;
            break;
        }
    }

    if (!confirmed) {
        throw new Error(
            'The transaction was not confirmed'
        );
    }

    console.log('The transaction was confirmed, seqno:', seqno, '→', seqno + 1);

    return boc;
}
 
export async function debugPrintAddress() {
    const { wallet } = await getWallet();
    console.log('Derived address:', wallet.address.toString());
    return wallet.address.toString();
}