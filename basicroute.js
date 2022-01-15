var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res){
    console.log('request was made:' + req.url);
    if(req.url === '/home' || req.url === '/'){
        res.writeHead(200,{'Content-Type':'text/plaintext'});
        fs.createReadStream('d:/node.js/readme.txt','utf8').pipe(res);
    }else if(req.url === '/api/data'){
        var person = [{
            name: 'prashant',
            age: 19
        },
        {
            name: 'ashim',
            age: 21
        }
    ];
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify(person));
    }else{
        res.writeHead(200,{'Content-Type':'text/html'});
        fs.createReadStream('d:/node.js/404.html','utf8').pipe(res);
    }
});

server.listen(3000,'127.0.0.1');
console.log('listening to port 3000');