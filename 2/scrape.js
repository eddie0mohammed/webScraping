
const cheerio = require('cheerio');
const request  = require('request');
const fs = require('fs');

const writeStream = fs.createWriteStream('test.txt');

//Write Headers
writeStream.write('Titles: \n');

request('https://www.simplesite.com/', (error, response, html) => {
    const $ = cheerio.load(html);

    const selected = $('.title-header');
    selected.each((i, elem) => {
        const item = $(elem).text().replace(/\s\s+/g, '');
        
        // write to txt file
        writeStream.write(`${i + 1}. ${item} \n`);
    })
} );