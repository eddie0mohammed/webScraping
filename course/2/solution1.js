
const request = require('request-promise');
const cheerio = require('cheerio');



const url = 'https://sfbay.craigslist.org/search/jjj';

const scrapeJobs = async () => {

    const html = await request.get(url);
    const $ = await cheerio.load(html);

    let jobs = [];
    $('.result-info').each((index, elem) => {

        const title = $(elem).children('.result-title').text();
        const datePosted = $(elem).children('.result-date').attr('datetime');
        const url = $(elem).children('.result-title').attr('href');

        jobs.push({
            jobTitle: title,
            datePosted,
            url
        });
    });
    return jobs;
}

const scrapeJobsDesc = async (jobsArray) => {

    const fullJobsDesc = await Promise.all(jobsArray.map(async (job) => {

        const html = await request.get(job.url);
        const $ = await cheerio.load(html);

        const compensation = $('.attrgroup').children('span:nth-child(1)').text().split(' ')[1];
        job.compensation = compensation;
        return job;
    }));
    return fullJobsDesc;
}

const scrape = async () => {
    const jobsArray = await scrapeJobs();
    const jobs = await scrapeJobsDesc(jobsArray);
    // console.log(jobs);
    return jobs;
}

console.log(scrape());