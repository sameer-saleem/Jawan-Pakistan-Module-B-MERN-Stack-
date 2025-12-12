// console.log('hellow world');

// this is for importing main.js file
// const main = require('./main');
// console.log(main.hellow());
// console.log(main.hellow2());

// Class 2 work
const main = require('./main');

// console.log(main, 'main');

const http = require('http');
// console.log(http);

// console.log(main.readHtmlFile(), 'readHtmlFile');

const server = http.createServer((req, res) => {
    // console.log(req);
    main.readHtmlFile((err, data) => {
        if (err) {
            res.statusCode = 500;
            res.end('Error reading HTML file');
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }
    });       
    
});

server.listen(3000);