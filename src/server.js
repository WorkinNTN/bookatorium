// To run this test server type the following from a command line within the bookatorium directory
//  node src/server.js
var http = require('http');

var books = [
        {
            id: 1,
            series: "Hank the Cowdog",
            seriesNo: 1,
            title: "The Case of the Wandering Goat",
            yearPublished: 2010,
            isbn: new Date().toISOString(),
        },
        {
            id: 2,
            series: "Hank the Cowdog",
            seriesNo: 2,
            title: "The Sheet Monster",
            yearPublished: 2015,
            isbn: new Date().toISOString(),
        },
        {
            id: 3,
            series: "Hank the Cowdog",
            seriesNo: 3,
            title: "Eddie the Rac",
            yearPublished: 2017,
            isbn: new Date().toISOString(),
        },
        {
            id: 4,
            title: "Once Upon A Time In America",
            yearPublished: 1950,
            isbn: new Date().toISOString(),
        },
        {
            id: 5,
            series: "The Chronicles of Narnia",
            seriesNo: 1,
            title: "The Lion, The Witch and the Wardrobe",
            yearPublished: 1950,
            isbn: new Date().toISOString(),
        },
    ]

http.createServer( (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end( JSON.stringify({requestingUrl: req.url, data: books}))
}).listen(8080);