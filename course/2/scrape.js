
const request = require('request-promise');
const cheerio = require('cheerio');

//data format
// const scrapedResult = {
//     title: '',
//     description: '',
//     datePosted: new Date('2018-07-01'),
//     url: '',

// }

const scrapeResults = [];

const url = 'https://sfbay.craigslist.org/d/web-html-info-design/search/web';

const scrapeCraigslist = async () => {

    try{
        const html = await request.get(url);
        const $ = await cheerio.load(html);

        $('.result-info').each((index, elem) => {
            const resultTitle = $(elem).children('.result-title');
            const title = resultTitle.text();
            const url = resultTitle.attr('href');
            
            const dateTime = new Date($(elem).children('time').attr('dateTime'));

            const scrapeResult = {
                title,
                url,
                datePosted: dateTime,

            };
            scrapeResults.push(scrapeResult);
        })

        console.log(scrapeResults);

    }catch(err){
        console.log(err);
    }

}

scrapeCraigslist();