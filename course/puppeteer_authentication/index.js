
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const main = async (url) => {

    try{
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto(url);
        await page.type('input#inputEmailHandle', 'me3dun@gmail.com');
        await page.type('input#inputPassword', 'aaaaa');
        await page.click('button#login', {waitUntil: 'domcontentloaded'});
        await page.goto('https://accounts.craigslist.org/login/home?show_tab=billing');

        const content = await page.content();
        const $ = await cheerio.load(content);
        const textContent = $('body > article > section > fieldset > b').text();
        console.log(textContent); 


    }catch(err){
        console.log(err);
    }
};

const url = 'https://accounts.craigslist.org/login';

main(url);