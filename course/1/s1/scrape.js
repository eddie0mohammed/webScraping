
const request = require('request-promise');
const cheerio = require('cheerio');


const scrape = async () => {

    try{
        const html = await request('http://127.0.0.1:5500/index.html');
        const $ = cheerio.load(html);

        const trs = $('body > table > tbody > tr');
        const headers = [];
        let arr = [];
        trs.each((index, elem) => {
            if (index === 0){
                const ths = $(elem).find('th');
                ths.each((index, elem) => {
                    headers.push($(elem).text().toLowerCase());
                });
            }else{
                const tds = $(elem).find('td');
                let data = {};
                tds.each((index, elem) => {
                    data[headers[index]] = $(elem).text();
                });
                arr.push(data);
            }
        })
        // console.log(headers);
        console.log(arr);

    }catch(err){
        console.log(err);
    }
}

scrape();