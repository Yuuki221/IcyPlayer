(function(){
	var IcyPlayer = function(){ 
		this.prototype = {
			constructor: function(option){
				this.svg = {
					'play' : [],
					'pause' : [],
					'volume-up' : [],
					'volume-down' : [],
					'mute' : [],
					'loop' : [],
					'comment': [],
					'comment-off': [],
					'send': []
				};

				this.getSVG = function(item){
					// use template literals: literals allow embeded expressions 
					// add the svg element into the graph
					// viewbox is a list of four numbers: min-x, min-y, width and height, 
					// specify a rectangle in user space which should be mapped to the bounds of the viewport 
					// established by the given element 
					return '' + '<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewbox=' + 
					this.svg[type][0] + '> <use></use> <path d=' + this.svg[type][1] + '></path></svg>';
				};
				// a value for check mobile devices 
				this.isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);

				/**
				 * Convert time to 00:00 format
				 * @param {Number} seconds 
				 * @param {String} 00:00
				 */ 
				this.formatTime = function(seconds){
					var second = seconds%60;
					// if there is only zero, then we append 0s to it 
					if(second===0) second = '0' + second;
					// get the minute number in integer, take floor 
					var minutes = Math.floor(seconds/60);
					return '' + minutes + ':' + second;
				};

				/**
				 * function for all the progress bar updating 
				 * @param {String} barType - is it a volumn updater or a video progress updater
				 * @param {Number} percentage 
				 * @param {String} direction -> it is forwrad or backward 
				 *
				 */

				 this.progUpdater = function(barType, percentage, direction){
				 	percentage = percentage>0 ? percentage : 0;
				 	percentage = percentage<1 ? percentage : 1;
				 	this[barType].style[direction] = precentage*100 + '%';
				 };

				 // parse user's option 
				 this.option = option;

				 // define events that can happened on the player 
				 this.eventTypes = ['play', 'pause','playing','ended','error'];
				 this.event = {};
				 
				 // make a event map object 
				 for(var i=0; i<this.eventTypes.length; i++){
				 	this.event[this.eventTypes[i]] = [];
				 }

				 // event trigger
				 this.trigger = function(){
				 	for(var j=0; j<this.event[type].length; i++) {
				 		this.event[type][i]();
				 	}
				 };
			},
			// end of constructor 

			init: function(){
				this.element = this.option.element;	
				if(!this.option.comments){
					this.element.classList.add('no-comment-player');
				}
				this.element.innerHTML = /**
					keep this another portion of the page 
				*/;
			}


		};
	};
})();