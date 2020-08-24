
const request = require('request-promise');
const cheerio = require('cheerio');


const url = 'https://sfbay.craigslist.org/search/jjj';


const scrapeData = async () => {

    try{

        const html = await request.get(url);
        const $ = await cheerio.load(html);

        let jobs = [];
        $('.result-info').each((index, elem) => {

            const date = $(elem).children('.result-date').attr('datetime');
            const job = $(elem).children('.result-title').text();
            const url = $(elem).children('.result-title').attr('href');

            jobs.push({
                datePosted: date,
                jobTitle: job,
                url: url,
            });
        })
        console.log(jobs);
        
    }catch(err){
        console.log(err);
    }

}


scrapeData();