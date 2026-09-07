# 03 - Authenticate TON Wallet

## Endpoint

POST /api?hash=<HASH>

## Required Cookies

stel_ssid=<SSID>
stel_dt=<TZ_OFFSET>
stel_token=<TOKEN>

## Headers

Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Referer: https://fragment.com/stars/buy
Origin: https://fragment.com

## Body

account=<TON_CONNECT_ACCOUNT_JSON>
device=<TON_CONNECT_DEVICE_JSON>
proof=<TON_CONNECT_PROOF_JSON>
method=checkTonProofAuth

## Response

{
    "verified":true
}

## Conclusion

checkTonProofAuth(account, device, proof) → verified=true
