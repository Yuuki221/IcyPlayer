(function(){
	var Test = function(num1, num2) {
		this.num1 = num1;
		this.num2 = num2;
	};

	Test.prototype.init = function(){
		console.log(this.num1 + this.num2);
	};
	module.exports = Test;
})();