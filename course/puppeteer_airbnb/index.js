
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

// const sample = {
//     guests: 1,
//     bedrooms: 1,
//     beds: 1,
//     baths: 1,
//     pricePerNight: 200
// }


const url = `https://www.airbnb.com/s/Copenhagen--Denmark/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&source=structured_search_input_header&search_type=pagination&map_toggle=false&federated_search_session_id=ace17178-49a8-435a-9dd4-c5f9f209ae57&place_id=ChIJIz2AXDxTUkYRuGeU5t1-3QQ&items_offset=20&section_offset=2`

let browser;

const scrapeHomesInIndexPage = async () => {

    try{
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: 'networkidle2'});

        const html = await page.evaluate( () => document.body.innerHTML);
        const $ = await cheerio.load(html);

        const homes = $("[itemprop=url]").map((i, elem) => $(elem).attr('content')).get();
        const updatedHomesLink = homes.map(home => home.replace(/^(null)/, 'https://www.airbnb.com'));
        // console.log(updatedHomesLink);
        return updatedHomesLink;
    }catch(err){
        console.log(err);
    }
}

const scrapeDescriptionPage = async (url, page) => {

    try{
        //consider navigation to be finished when there are no more than 2 network connections for at least 500ms
        await page.goto(url, {waitUntil: 'networkidle2'});
        // await page.waitFor(3000);
        const html = await page.evaluate(() => document.body.innerHTML);
        const $ = await cheerio.load(html);

        const pricePerNight = $('#site-content > div > div > div > div > div > div > div:nth-child(1) > div > div > div > div > div > div > div > div > div > span > span').text();
        // console.log(pricePerNight);

        const roomText = $('#site-content').text();
        
        const guestMatches = roomText.match(/\d+ guest/);
        const bedrooms = roomText.match(/\d+ bedroom/);
        const baths = roomText.match(/\d+ (shared )?bath/);
        const beds = roomText.match(/\d+ bed/);

        const data = {
            guests: guestMatches[0],
            pricePerNight,
            bedrooms: bedrooms ? bedrooms[0] : '',
            baths: baths ? baths[0] : '',
            beds: beds ? beds[0] : '',
        }

        console.log(data);

    }catch(err){
        console.log(err);
    }
}


const main = async () => {
    browser = await puppeteer.launch({headless: false});
    const descriptionPage = await browser.newPage();
    const homeLinks = await scrapeHomesInIndexPage();

    for (let i = 0; i < homeLinks.length; i++){
        await scrapeDescriptionPage(homeLinks[i], descriptionPage);
    }


}


main();