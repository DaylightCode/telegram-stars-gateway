# 04 - Get Stars Buy Link 

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

id=<ID>
show_sender=<SHOW_SENDER>
transaction=<TRANSACTION_JSON>
method=getBuyStarsLink

## Response


{
    "ok":true,
    "transaction":{
        "validUntil":...,
        "from": "0:...",
        "messages":[
            {
                "address":"...",
                "amount":"...",
                "payload":"..."
            }
        ]
    },
    "confirm_method":"confirmReq",
    "confirm_params":{
        "id":"..."
    }
}

## Conclusion

getBuyStarsLink(id, show_sender, transaction) → transaction, confirm_params
