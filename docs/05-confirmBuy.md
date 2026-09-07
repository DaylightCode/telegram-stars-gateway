# 05 - Confirm Stars Purchase

## Endpoint

POST /api?hash=<HASH>

## Required Cookies

stel_ssid=<SSID>
stel_dt=<TZ_OFFSET>
stel_token=<TOKEN>
stel_ton_token=<TON_TOKEN>

## Headers

Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Referer: https://fragment.com/stars/buy
Origin: https://fragment.com

## Body

account=<TON_CONNECT_ACCOUNT_JSON>
device=<TON_CONNECT_DEVICE_JSON>
boc=<SIGNED_BOC>
id=<ID>
method=confirmReq

## Response

{
  "ok": true
}


## Conclusion

confirmReq(account, device, boc, id) → ok=true