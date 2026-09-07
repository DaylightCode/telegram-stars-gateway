# 02 - Initialize Stars Purchase

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

recipient=<RECIPIENT>
payment_method=ton
method=initBuyStarsRequest

## Response

{
    "need_ton":true
}

## Conclusion

initBuyStarsRequest(recipient, payment_method=ton) → need_ton=true


