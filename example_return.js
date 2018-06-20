let once = require('./await_once');
let util = require('util');

async function myFunc1(){
    console.log('before setTimeout');
    await util.promisify(setTimeout)(1000);

    let ret = Math.random();
    console.log('after setTimeout will return', ret);
    return ret;
}


async function main(){
   let ret = await once('my_name1', myFunc1);
   console.log('ret =', ret);
}


main();
main();
main();

