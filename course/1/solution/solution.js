const request = require('request-promise');
const cheerio = require('cheerio');

const main = async () => {

    const html = await request.get('http://127.0.0.1:5500/index.html');
    const $ = cheerio.load(html);

    let arr = [];

    let headers = [];
    $('body > table > tbody > tr').each((index, elem) => {
        
        if (index === 0){
            const ths = $(elem).find('th');
            ths.each((index, elem) => {
                headers.push($(elem).text().toLowerCase());
            });   
            return true; // do not move on to pushing to array instead => next iteration
        }

        const tds = $(elem).find('td');
        const tableRow = {};
        tds.each((index, elem) => {
            tableRow[headers[index]] = $(elem).text();
        });

        arr.push(tableRow);
    });

    console.log(arr);
};


main();