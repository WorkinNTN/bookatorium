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
    res.setHeader("Access-Control-Allow-Origin", "*");
    let urlPacket = parser(req.url);
    if (urlPacket.route === '/INFO') {
        res.end( JSON.stringify({
            header: req.headers
            , rawHeader: req.rawHeaders
        }));
    } else if (urlPacket.route === '/LOGIN') {
        let loginResponse = login(urlPacket, users);
        res.end(loginResponse);
    } else if (urlPacket.route.indexOf('/FINDBOOKS') === 0) {
        let fbResponse = findbooks(urlPacket, books);
        res.end(fbResponse);
    } else {
        res.end( JSON.stringify({
            passedIn: urlPacket
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

function findbooks(option, bookList) {
    let responseValue = JSON.stringify({result: 'success', message : 'No books matched criteria.'});
    let searchVal = "";

    if (option.parameters) {
        let foundSearchVal = (Object.keys(option.parameters[0]).indexOf('SEARCHVALUE') >= 0);
        if (!foundSearchVal) {
            responseValue = JSON.stringify({result: 'failure', message : 'Cannont find named parameter SearchValue'});
        } else {
            searchVal = option.parameters[0]['SEARCHVALUE'];
        }
    } else {
        searchVal = option.originalPath.toUpperCase().replace("FINDBOOKS","").replace("//", "");
    }
    if (!searchVal) {
        responseValue = JSON.stringify({result: 'failure', message : 'no search value provided'});
    } else {
        let foundList = [];
        bookList.forEach(function (item) {
            let it = item.title.toUpperCase();
            if (item.series) {
                it = it + ";" + item.series.toUpperCase();
            }
            if (it.indexOf(decodeURIComponent(searchVal).toUpperCase()) >= 0) {
                foundList.push(item);
            }
        });
        if (foundList.length > 0) {
            responseValue = JSON.stringify({result: 'success', list: foundList});
        }
    }

    return responseValue;
}

function login(option, userList)
{
    let responseValue = JSON.stringify({result: 'failure', message : 'Incorrect credentials supplied.'});
    
    if (option.parameters && (option.parameters.length === 2)) {
        let usernamePos = 0;
        let passwordPos = 1;
        let foundUsername = false;
        let foundPassword = false;

        foundUsername = (Object.keys(option.parameters[usernamePos]).indexOf('USERNAME') >= 0);
        if (!foundUsername) {
            usernamePos = 1;
            foundUsername = (Object.keys(option.parameters[usernamePos]).indexOf('USERNAME') >= 0);
        }

        if (foundUsername) {
            if (usernamePos === 1) { passwordPos = 0;}
            foundPassword = (Object.keys(option.parameters[passwordPos]).indexOf('PASSWORD') >= 0);
        }

        let userId = option.parameters[usernamePos]['USERNAME'];
        let password = option.parameters[passwordPos]['PASSWORD'];
        if (!userId) {foundUsername = false;}
        if (!password) {foundPassword = false;}

        if (foundPassword && foundUsername) {
            let validLogin = false;
            userList.forEach(function(item) {
                if (item.userId.toUpperCase() === userId.toUpperCase() && item.password === password) {
                    let user = Object.assign({}, item);
                    delete user.password;
                    responseValue = JSON.stringify({result: 'success', user: user});
                    validLogin = true;
                }
            }) 
            if (!validLogin) {
                //responseValue = JSON.stringify({userId: userId.toUpperCase(), password: password, object: option});
            }
        }
    }

    return responseValue;
}
