# 00 - Guideline

## Where it comes from

GET https://fragment.com/

## Guide (hash)

1. Open https://fragment.com/stars/buy and log in your Telegram account 
2. Open DevTools (F12) and open Network tab
3. Filter by Fetch/XHR
4. Perform any action (e.g. search for a recipient)
5. Find request like 'api?hash=...' and copy it

Example:
POST https://fragment.com/api?hash=2adcbbe260cb5cf322


## Guide (stel_ssid)

1. Open https://fragment.com/stars/buy in your browser
2. Click "Connect Telegram"
3. Confirm the login 
4. Once redirected back to fragment.com, open DevTools → Application → Cookies → fragment.com
5. Copy the value of `stel_ssid`

## Guide (stel_dt)

1. Open https://fragment.com/stars/buy in your browser
2. Open DevTools → Console
3. Run: `-(new Date().getTimezoneOffset())`
4. The result is the value fragment.com sets as `stel_dt` cookie

## Guide (stel_token)

1. Open https://fragment.com/stars/buy in your browser
2. Log in with Telegram (same session as stel_ssid)
3. Open DevTools → Application → Cookies → fragment.com
4. Copy the value of `stel_token`

## Guide (stel_ton_token)

`stel_ton_token` is not obtained manually — it is issued by Fragment
after a successful TON wallet verification (see 03 - Authenticate TON Wallet).
1. Connect and verify your TON wallet on https://fragment.com/stars/buy (via TON Connect, as in step 03)
2. Once `checkTonProofAuth` returns `verified: true`, open DevTools → Application → Cookies → fragment.com
3. Copy the value of `stel_ton_token`