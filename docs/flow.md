# Flow — Buy Telegram Stars via TON

```mermaid
flowchart TD
    A["01 · searchStarsRecipient(username)"] --> B["recipient"]
    B --> C["02 · initBuyStarsRequest(recipient)"]
    C --> D["need_ton = true"]

    subgraph AUTH["Authorization"]
        D --> E["TON Connect: build account + device + proof"]
        E --> F["03 · checkTonProofAuth(account, device, proof)"]
        F --> G["verified = true → stel_ton_token"]
    end

    subgraph PAYMENT["Payment"]
        G --> H["04 · getBuyStarsLink(id, transaction)"]
        H --> I["transaction + confirm_params.id"]
        I --> J["TON Wallet: sign transaction"]
        J --> K["boc (signed) → broadcast to TON network"]
    end

    subgraph CONFIRM["Confirmation"]
        K --> L["05 · confirmReq(account, device, boc, id)"]
        L --> M["ok = true"]
        M --> N["06 · updateStarsBuyState(mode, lv, dh)"]
        N --> O["mode = done"]
    end

    O --> P["⭐ Stars acquired!"]
```

## Step reference

| # | Method | Input (from) | Output (to) |
|---|--------|---------------|--------------|
| 01 | `searchStarsRecipient` | `username` | `recipient` → 02 |
| 02 | `initBuyStarsRequest` | `recipient` (01) | `need_ton=true` |
| 03 | `checkTonProofAuth` | TON Connect `account/device/proof` | `stel_ton_token` |
| 04 | `getBuyStarsLink` | `id` (from wallet session) | `transaction`, `confirm_params.id` → 05 |
| 05 | `confirmReq` | `boc` (signed tx), `id` (04) | `ok=true` |
| 06 | `updateStarsBuyState` | `mode`, `lv`, `dh` | `ok=true` |