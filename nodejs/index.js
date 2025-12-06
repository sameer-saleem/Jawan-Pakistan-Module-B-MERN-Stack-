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
            // If there's an error, return a 500 status code and an error message
            res.statusCode = 500;
            res.end('Error reading HTML file');
        } else {
            // If successful, return the HTML content with a 200 status code
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);  // Send the HTML file content to the client
        }
    });       
    
});

server.listen(3000);