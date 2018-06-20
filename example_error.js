let once = require('./await_once');
let util = require('util');

async function myFunc2(){
    console.log('before setTimeout');
    await util.promisify(setTimeout)(1000);

    let ret = Math.random();
    console.log('after setTimeout will throw err', ret);
    throw new Error(ret);
}


async function main() {
    try {
        let ret = await once('my_name2', myFunc2);
        console.log('ret =', ret);  //will not run to here
    } catch(err) {
        console.log('err = ', err);
    }
}


main();
main();
main();
setTimeout(main, 3000);

