var viewSetting = function(view_option){
	var setView = "test";
	var options = view_option; // an array 
	return {
		'html' : setView,
		'option': options
	};
};
module.exports = viewSetting;
