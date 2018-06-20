var map = {};

function once(name, func) {

    return new Promise(function(resolve, reject) {
        var instance = map[name];

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
                var waiting = instance.waiting;
                instance.initialized = true;
                instance.result = result;
                instance.waiting = [];
                waiting.map(function(wait){ wait.resolve(instance.result); });
            }, function(err){
                var waiting = instance.waiting;
                instance.initialized = true;
                instance.error = {error: err};
                instance.waiting = [];
                waiting.map(function(wait){ wait.reject(instance.error.error); });
            });
        }
    });
}

module.exports = once;

