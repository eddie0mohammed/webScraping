
const request = require('request-promise');
const cheerio = require('cheerio');


const scrape = async () => {

    let titles = [];
    for (let i = 0; i <= 1000; i += 120){
        const html = await request.get(`https://sfbay.craigslist.org/search/roo?s=${i}`);
        const $ = await cheerio.load(html);

        $('.result-title').each((index, elem) => {
            titles.push($(elem).text());
        })
    }
    console.log(titles);
    return titles;
}


scrape();