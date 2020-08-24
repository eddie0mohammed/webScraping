
const request = require('request-promise');
const cheerio = require('cheerio');


const scrape = async () => {

    try{

        const html = await request('http://127.0.0.1:5500/index.html');
        const $ = cheerio.load(html);

        const trs = $('body > table > tbody > tr');

        const headers = [];
        let data = [];
        trs.each((index, tr) => {
            if (index === 0){
                const ths = $(tr).find('th');
                ths.each((index, elem) => {
                    headers.push($(elem).text());
                })
            }else{

                const tds = $(tr).find('td');
                let tempData = {};
                tds.each((i, elem) => {
                    tempData[headers[i]] = $(elem).text();
                });
                data.push(tempData);
            }

        })

        // console.log(headers);
        console.log(data);;


    }catch(err){
        console.log(err);
    }
}

scrape();