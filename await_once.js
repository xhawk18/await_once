let map = {};

function once(name, func) {

    return new Promise(function(resolve, reject) {
        let instance = map[name];

        if(instance !== undefined) {
            if(!instance.initialized)
                instance.waiting.push({resolve, reject});
            else if(instance.error)
                reject(instance.error.error);
            else
                resolve(instance.result);
        }
        else{
            instance = {initialized: false, error: undefined, result: undefined, waiting: []};
            map[name] = instance;

            instance.waiting.push({resolve, reject});
            Promise.resolve().then(function(){
                return func();
            }).then(function(result){
                //console.log(result);
                instance.result = result;
                instance.initialized = true;
                instance.waiting.map(function(wait){ wait.resolve(instance.result); });
                instance.waiting = [];
            }, function(err){
                instance.initialized = true;
                instance.error = {error: err};
                instance.waiting.map(function(wait){ wait.reject(instance.error.error); });
                instance.waiting = [];
            });
        }
    });
}

module.exports = once;

