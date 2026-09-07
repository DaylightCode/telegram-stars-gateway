# 01 - Receive recipient

## Endpoint

POST /api?hash=<HASH>

## Required Cookies

stel_ssid=<SSID>
stel_dt=<TZ_OFFSET>

## Headers

Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Referer: https://fragment.com/stars/buy
Origin: https://fragment.com

## Body

method=searchStarsRecipient
query=@username
quantity=<QUANTITY>

## Response

{
    "ok":true,
    "found":{
        "recipient": "...",
        "name": "..."
    }
}

## Conclusion

searchStarsRecipient(username) → recipient
