<<<<<<< HEAD
var Test = require('./IcyPlayer2.js');
var test = new Test(4,5);
test.init();
console.log(test.num1);
console.log(test.num2);



=======
var loadView = require('./loadView');
var formatTime = function(seconds){
					var second = seconds%60;
					// if there is only zero, then we append 0s to it 
					if(second===0) second = '0' + second;
					var minutes = Math.floor(seconds/60);
					return '' + minutes + ':' + second;
				};
console.log(formatTime(23004));
// ------------------
var options = require('./options');
// var option = ["nothing", "me"];
var returnValue = options("nothing", "me");
console.log(returnValue.name);
>>>>>>> 470c79feaaa91f7a05a77c0488a59b9620716c7a
