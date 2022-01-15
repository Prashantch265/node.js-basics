var http = require('http');

var server = http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});//writes response head
    res.end('hello world');//ends response
});

server.listen(3000,'127.0.0.1');
console.log('listening to port 3000');

//another way
http.createServer(function(req,res){
    res.write('Hello World');//writes response
    res.end();//end response
}).listen(8080);
console.log('listening to port 8080');