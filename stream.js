var http = require('http');
var fs = require('fs');

var readStream = fs.createReadStream('d:/node.js/readme.txt','utf8');
var writeStream = fs.createWriteStream('d:/node.js/writeme.txt');

readStream.on('data',function(chunk){
    console.log('new chunk received');
    writeStream.write(chunk);
    console.log(chunk);
});

