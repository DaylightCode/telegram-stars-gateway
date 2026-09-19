import dotenv from 'dotenv';
import { signAndSendStarsTx } from '@/ton/wallet';

dotenv.config();

export async function buyStarsService(
    recipient: string, 
    qty: number,
) {
    const recipientResult: any = await searchStarsRecipient(recipient)

    const buyResult: any = await initBuyStarsRequest(
        recipientResult.found.recipient, 
        qty
    );
    if (buyResult.error) throw new Error(buyResult.error)
    

    const getBuyLink: any = await getBuyStarsLink(buyResult.req_id)
    if (getBuyLink.error) throw new Error(getBuyLink.error)
    console.log('confirm_params:', JSON.stringify(getBuyLink.confirm_params, null, 2));
    const boc = await signAndSendStarsTx(getBuyLink.transaction)

    const confirmResult: any = await confirmReq(
        getBuyLink.confirm_params.id,
        getBuyLink.transaction, 
        boc,
        JSON.stringify(getBuyLink.confirm_params.account ?? {}),
        JSON.stringify(getBuyLink.confirm_params.device ?? {})
    )
    
    console.log('confirmReq raw response:', JSON.stringify(confirmResult, null, 2));

    if (!confirmResult.ok) {
        throw new Error('confirmReq failed: ' + JSON.stringify(confirmResult))
    }

    return confirmResult;
}

async function searchStarsRecipient(recipient: string) {
    const response = await fetch(`https://fragment.com/api?hash=c4632bbde3243eaf0e`, {
        method: 'POST',

        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            "Referer": "https://fragment.com/stars/buy",
            "Origin": "https://fragment.com",
            "Cookie": process.env.FRAGMENT_COOKIE!,
        },

        body: new URLSearchParams({
            method: 'searchStarsRecipient',
            query: recipient,
            quantity: '',
        }),
    })

    const data = await response.json();

    return data
}

async function initBuyStarsRequest(recipient: string, qty: number) {
    const response = await fetch(`https://fragment.com/api?hash=c4632bbde3243eaf0e`, {
        method: 'POST',

        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            "Referer": "https://fragment.com/stars/buy",
            "Origin": "https://fragment.com",
            "Cookie": process.env.FRAGMENT_COOKIE!,
        },

        body: new URLSearchParams({
            method: 'initBuyStarsRequest',
            recipient,
            quantity: String(qty), 
            payment_method: 'ton'
        }),
    })

    const data = await response.json();

    return data
}

async function getBuyStarsLink(id: string) {
    const response = await fetch(`https://fragment.com/api?hash=c4632bbde3243eaf0e`, {
        method: 'POST',

        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            "Referer": "https://fragment.com/stars/buy",
            "Origin": "https://fragment.com",
            "Cookie": process.env.FRAGMENT_COOKIE!,
        },

        body: new URLSearchParams({
            method: 'getBuyStarsLink',
            id,
            transaction: '1',
            show_sender: '1'
        }),
    })

    const data = await response.json();

    return data
}

async function confirmReq(id: string, transaction: any, boc: string, account: string, device: string) {
    const response = await fetch(`https://fragment.com/api?hash=c4632bbde3243eaf0e`, {
        method: 'POST',

        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            "Referer": "https://fragment.com/stars/buy",
            "Origin": "https://fragment.com",
            "Cookie": process.env.FRAGMENT_COOKIE!,
        },

        body: new URLSearchParams({
            method: 'confirmReq',
            id,
            boc,
            device,
            account
        }),
    })

    
    const data = await response.json();

    return data
}

 