var async = require('async');

// Async waterfall flow
async.waterfall([
  function(callback){
    callback(null, 'one', 'two');
  },
  function(arg1, arg2, callback){
     // arg1 now equals 'one' and arg2 now equals 'two'
    console.log(arg1);
    console.log(arg2);
    callback(null, 'three');
  },
  function(arg1, callback){
    // arg1 now equals 'three'
    console.log(arg1);
    callback(null, 'done');
  }
], function (err, result) {
   // result now equals 'done'    
   console.log(result);
});



// setTimeout illustration.
function calculateFibonacci(number) {
  if (number === 0 || number === 1) 
    return number;
  return (calculateFibonacci(number - 1) + calculateFibonacci(number - 2));
}

function doSomthing(number, successCB, errorCB) {
  setTimeout(function() {
    try {
      var result = [];
      for (var i = 0; i < number; i++) {
        var res = calculateFibonacci(i);
        // console.log(res);
        result.push(res);
      }
      console.log('for finished');

      if (typeof successCB === 'function') {
        successCB(result.join(', '));
      }
    } catch (ex) {
      if (typeof errorCB === 'function') {
        errorCB(ex.message);
      }
    }
  }, 100);
}

console.log('Initialization');

doSomthing(30, function(result) {
  console.log('The result is: ', result);
}, function(err) {
  console.log(err);
});





// Function injection
function do_a( callback ){
  setTimeout( function(){
    // simulate a time consuming function
    console.log( '`do_a`: this takes longer than `do_b`' );
    // if callback exist execute it
    callback && callback();
  }, 3000 );
}
 
function do_b(){
  console.log( '`do_b`: now we can make sure `do_b` comes out after `do_a`' );
}
 
do_a( function(){
  do_b();
});
