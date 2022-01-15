var fs = require('fs');

// sync means step wise it doesn't jump any step without completing it
fs.writeFileSync('d:/Assignment/writeFileSync.txt','writing synchronously in a file');
var read = fs.readFileSync('d:/Assignment/writeFileSync.txt','utf8');
console.log(read);
fs.writeFileSync('d:/Assignment/readFileSync.txt',read);

// async
fs.readFile('d:/Assignment/readFile.txt', 'utf8', function(error,data){
    console.log(error);
    console.log(data);
    fs.writeFile('d:/Assignment/writeFile.txt',data,function(error,data){
        this.data = data;
        console.log(data);
    });
});


console.log('test');