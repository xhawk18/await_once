# Description

This module helps to (await) call async function only once.

# Api

```javascript
let once = require('await_once');
await once(name, func);
```

* name - a custom defined unique name.
* func - an async or sync function.

# Usage

## Example 1 - call an async function once and await the same result

```javascript
let once = require('await_once');
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

```

## Example 2 - call an async function once and catch the same error

```javascript
let once = require('await_once');
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

```
