
function timer(arg){
    setTimeout(function(){
        console.log(arg);
    }, 1000);
}

for(var i = 0; i < 10; i++){
    timer(i);
};


