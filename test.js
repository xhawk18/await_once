let once = require('./await_once');

async function test(){

    try{
        let getRandom = function(){
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    let random = Math.random();
                    resolve(random);
                }, 1000);
            });
        }

        let getRandom2 = function(){
            return new Promise((resolve, reject) => {
                let random = Math.random();
                if(random < 0.5)
                    resolve(random);
                else
                    reject(random);
            });
        }


        let result = await once('random', getRandom);
        console.log('result = ', result);

        let result2 = await once('random2', getRandom2);
        console.log('result2 = ', result2);
    }catch(err){
        console.log('error = ', err);
    }
}


test();
test();
test();
test();


