# Lunch

Simple Node.js application wrapped inside a cron job which uses <a href="https://github.com/drawrowfly/instagram-scraper">Instatouch</a> to scrape the latest post (daily menu) from the an instagram account at 11.50am every weekday and email it to a group of hungry workers.

<img src="https://github.com/andyr00d/Lunch/blob/master/screenshot.PNG?raw=true"/>

Dependencies:
```javascript
npm install instatouch
npm install node-cron
```
Usage:
```sh
$ node lunch.js
```
