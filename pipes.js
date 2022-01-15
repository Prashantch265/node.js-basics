var http = require('http');
var fs = require('fs');

// var readStream = fs.createReadStream('d:/node.js/readme.txt','utf8');
// var writeStream = fs.createWriteStream('d:/node.js/writeme.txt');

// readStream.pipe(writeStream);

var server = http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plaintext'});
    var readStream = fs.createReadStream('d:/node.js/readme.txt','utf8');
    readStream.pipe(res);
});
server.listen(3000,'127.0.0.1');
console.log('listening to port 3000');