var fs = require('fs');

// creates dir synchronously
// fs.mkdirSync('d:/node.js');

//removes dir synchronously
// fs.rmdirSync('d:/node.js');

// creating dir asynchronously
fs.mkdir('d:/node.js',function(){
    fs.readFile('d:/Assignment/readFile.txt', 'utf8', function(error,data){
        console.log(error);
        fs.writeFile('d:/node.js/writeFile.txt',data,function(){
            console.log(data);
        });
    });
});

//removing dir asynchronously
// fs.unlink('d:/node.js/writeFile.txt', function(){   //deletes the text file
//     fs.rmdir('d:/node.js',function(){
//         console.log('removed successfully');
//     }); //then removes the dir
// });


