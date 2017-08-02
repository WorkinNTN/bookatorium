// To run this test server type the following from a command line within the bookatorium directory
//  node src/server.js
var http = require('http');

const books = [
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

const users = [
    {
        id: 1,
        userId: 'workinntn@hotmail.com',
        firstName: 'Rodney',
        lastName: 'Dixon',
        password: 'justtesting'
    },    
    {
        id: 2,
        userId: 'hankanddrover@outlook.com',
        firstName: 'Isaiah',
        lastName: 'Dixon',
        password: 'thisistheday'
    },    
]

http.createServer( (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let route = parser(req.url);
    if (route.route === '/INFO') {
        res.end( JSON.stringify({
            header: req.headers
            , rawHeader: req.rawHeaders
        }));
    } else if (route.route === '/LOGIN') {
        if ((!route.parameters) || (route.parameters.length != 2)) {
            res.end(JSON.stringify({message : 'Incorrect credentials supplied.'}))
        } else {
            let usernamePos = 0;
            let passwordPos = 1;
            let foundUsername = false;
            let foundPassword = false;

            foundUsername = (Object.keys(route.parameters[usernamePos]).indexOf('USERNAME') >= 0);
            if (!foundUsername) {
                usernamePos = 1;
                foundUsername = (Object.keys(route.parameters[usernamePos]).indexOf('USERNAME') >= 0);
            }

            if (foundUsername) {
                if (usernamePos === 1) { passwordPos = 0;}
                foundPassword = (Object.keys(route.parameters[passwordPos]).indexOf('PASSWORD') >= 0);
            }

            if (!route.parameters[usernamePos]['USERNAME']) {foundUsername = false;}
            if (!route.parameters[passwordPos]['PASSWORD']) {foundPassword = false;}

            if (foundPassword && foundUsername) {
                let user = users[0];
                delete user.password;
                res.end(JSON.stringify({user: user}));
            } else {
                res.end(JSON.stringify({message : 'Incorrect credentials supplied.'}))
            }
        }
    } else {
        res.end( JSON.stringify({
            passedIn: route
        }));
    }

}).listen(8080);

function parser(fullPath) {
    let packet = {
        originalPath : fullPath
        , route: (fullPath.split('?')[0]).toUpperCase()
    }

    let params = fullPath.split('?');
    if ((params.length > 1) && (params[1].length > 0)) {
        let paramList = params[1].split('&');
        let tmpList = []
        for (let i in paramList) {
            let j = paramList[i]
            k = j.split('=');
            let myObject = new Object;
            myObject[k[0].toUpperCase()] = k[1];
            tmpList.push(myObject);
        }
        if (tmpList.length > 0) {
            packet.parameters = tmpList;
        }
    }

    return packet;
}

