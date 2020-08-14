
const puppeteer = require('puppeteer');


const scrapeProduct = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    
    //img
    const [el] = await page.$x('//*[@id="imgBlkFront"]');
    const src = await el.getProperty('src');
    let srcTxt = await src.jsonValue();

    srcTxt = srcTxt.replace(/\n/g, '');

    //txt
    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt = await el2.getProperty('textContent');
    let title = await txt.jsonValue();

    title = title.replace(/\n/g, '');

    //price
    const [el3] = await page.$x('//*[@id="a-autoid-6-announce"]/span[2]/span');
    const txt2 = await el3.getProperty('textContent');
    let price = await txt2.jsonValue();

    price = price.replace(/\n/g, '');


    
    // console.log(srcTxt.replace(/\s\s+/g, ''));
    // console.log(title.replace(/\n/g, ''));
    // console.log(price.replace(/\n/g, ''));

    console.log({
        srcTxt,
        title,
        price,
    });

    browser.close();
}


scrapeProduct('https://www.amazon.com/Black-Swan-Improbable-Robustness-Fragility/dp/081297381X/ref=sr_1_1?crid=2ZJTTKK28SAUR&dchild=1&keywords=black+swan+book&qid=1597384106&sprefix=black+swan+%2Caps%2C465&sr=8-1')