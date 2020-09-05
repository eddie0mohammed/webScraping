
const express = require('express');
const request = require('request-promise');
// //if headers are needed
// const request = require('request-promise').defaults({
//     headers: {
//         Authorization: 'asdkjahsfajnf',
//         NordVpnVerson: 1
//     }
// })



const app = express();


//routes
app.get('/nordstrom', async (req, res, next) => {

    let page = 1;
    if (req.query.page){
        page = req.query.page;
    }

    try {
        const url = `https://jsonplaceholder.typicode.com/posts/${page}`;
        const result = await request.get(url);
        // console.log(result);
        res.status(200).json(result);

    }catch(err){
        console.log(err);
    }
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log('server listening on port ', PORT);
});