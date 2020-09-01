
const cheerio = require('cheerio');
const request = require('request-promise');



const scrapeJobs = async (url) => {

    try{
        const html = await request.get(url);
        const $ = await cheerio.load(html);

        let jobs = [];

        $('.result-info').each((index, row) => {
            const title = $(row).children('.result-title').text();
            const datePosted = $(row).children('.result-date').attr('datetime');
            const url = $(row).children('.result-title').attr('href');

            jobs.push({
                title,
                datePosted,
                url
            });
        })
        return jobs;

    }catch(err){
        console.log(err);
    }
}


const scrapeFullJobs = async (jobs) => {

    try{
        const fullJobs = await Promise.all(jobs.map(async (job) => {
            const html = await request.get(job.url);
            const $ = await cheerio.load(html);

            const compensation = $('.attrgroup > span:nth-child(1) > b:nth-child(1)').text();
            job.compensation = compensation;

            return job;
        })); 

        return fullJobs;
    }catch(err){
        console.log(err);
    }
     
}


const scrape = async (url) => {

    try{
        const jobs = await scrapeJobs(url);
        console.log('second');
        const fullJobs = await scrapeFullJobs(jobs);
        console.log(fullJobs);
    }catch(err){
        console.log(err);
    }
}


const url = `https://sfbay.craigslist.org/search/jjj`;
scrape(url);