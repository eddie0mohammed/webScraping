
//web scraping in node
const rp = require('request-promise');
const cheerio = require('cheerio');
const Table = require('cli-table');

let users = [];
let table = new Table({
    head: ['username', '❤', 'challenges'],
    colWidths: [15, 5, 10]
});

const options = {
    url: `https://forum.freecodecamp.org/directory_items?period=weekly&order=likes_received`,
    json: true
}

rp(options)
.then((data) => {
    // console.log(data);
    let userData = [];
    // process.stdout.write('loading');
    for (let user of data.directory_items){
        userData.push({
            name: user.user.username,
            likes_received: user.likes_received
        });
        // process.stdout.write('.');
    }
    process.stdout.write('loading');
    getChallengesCompletedAndPushToUserArray(userData);
    // process.stdout.write('\n');
    // console.log(userData);
})
.catch((err) => {
    console.log(err);
});

const getChallengesCompletedAndPushToUserArray = (userData) => {
    // console.log(userData[0].name);
    var i = 0;
    function next(){
        if (i < userData.length){
            var option = {
                url: `https://www.freecodecamp.org/${userData[1].name}`,
                transform: body => cheerio.load(body),
            }
        
            rp(option)
                // .then(function ($){
                //     process.stdout.write('.');
                //     const fccAccount = $('h1.landing-heading').length === 0;
                //     const challengesPassed = fccAccount ? $('tbody tr').length : 'unknown';
                //     table.push([userData[i].name, userData[i].likes_received, challengesPassed]);
                //     ++i;
                //     return next();
                // })
                .then((x) => {
                    console.log(x);
                })
                .catch(err => {
                    console.log('error');
                    // console.log(err);
                })
        }else{
            printData();
        }
    }
    return next();
}

const printData = () => {
    console.log('✔');
    console.log('Done');
    // console.log(table.toString());
}