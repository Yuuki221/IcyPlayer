(function(){
	var UserOption = function(options){
		var userInput = {
			'url' : arguments[0],
			'name' : arguments[1]
		};
		return userInput;
	};
	module.exports = UserOption;
})();