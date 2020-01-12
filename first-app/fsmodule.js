const fs = require('fs');

const files = fs.readdirSync('./');

console.log(files)

//The best way is to use the asynchronous method because they are not blocking

fs.readdir('./', (err, files) => {
    if(err) console.log(err);
    else console.log('This is the result', files)

})