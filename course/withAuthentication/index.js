
const request = require('request-promise');
const fs = require('fs');


const main = async () => {

    try{
        const html = await request.post('https://accounts.craigslist.org/login', {
            form: {
                inputEmailHandle: "me3dun@gmail.com",
                inputPassword: "Moazzam0"
            },
            headers: {
                Referer: "https://accounts.craigslist.org/login",
                UserAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36"
            },
            simple: false
        });

        fs.writeFileSync('./login.html', html);


    }catch(err){
        console.log(err);``
    }
}

main();