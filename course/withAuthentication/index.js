
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
                UserAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36",
            },
            simple: false,
            followAllRedirects: true,
            jar: true,

        });

        fs.writeFileSync('./login.html', html);


    }catch(err){
        console.log(err);
    }
}

main();