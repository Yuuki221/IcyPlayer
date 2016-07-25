/** @param {Object} option
 * urls, element, 
 *
 */

(function(options){
	// constructor 
	
	var IcyPlayer = function(options){
		this.element = options.element;
		//this.color = options.color;
		this.videoScr = options.url;
		// a value for check mobile devices 
		this.isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);

	};
	
	// this part contains some prepare part
	// I don't like to include them into the constructor, since i would not like to expose them to 
	// user 

	// dealing with dvg part 
	var svg = {
				'play': ['0 0 16 32', 'M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z'],
                'pause': ['0 0 17 32', 'M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z'],
                'volume-up': ['0 0 21 32', 'M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528zM25.152 16q0 2.72-1.536 5.056t-4 3.36q-0.256 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.704 0.672-1.056 1.024-0.512 1.376-0.8 1.312-0.96 2.048-2.4t0.736-3.104-0.736-3.104-2.048-2.4q-0.352-0.288-1.376-0.8-0.672-0.352-0.672-1.056 0-0.448 0.32-0.8t0.8-0.352q0.224 0 0.48 0.096 2.496 1.056 4 3.36t1.536 5.056zM29.728 16q0 4.096-2.272 7.552t-6.048 5.056q-0.224 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.64 0.704-1.056 0.128-0.064 0.384-0.192t0.416-0.192q0.8-0.448 1.44-0.896 2.208-1.632 3.456-4.064t1.216-5.152-1.216-5.152-3.456-4.064q-0.64-0.448-1.44-0.896-0.128-0.096-0.416-0.192t-0.384-0.192q-0.704-0.416-0.704-1.056 0-0.448 0.32-0.8t0.832-0.352q0.224 0 0.448 0.096 3.776 1.632 6.048 5.056t2.272 7.552z'],
                'volume-down': ['0 0 21 32', 'M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528z'],
                'volume-off': ['0 0 21 32', 'M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z'],
                'loop': ['0 0 32 32', 'M1.882 16.941c0 4.152 3.221 7.529 7.177 7.529v1.882c-4.996 0-9.060-4.222-9.060-9.412s4.064-9.412 9.060-9.412h7.96l-3.098-3.098 1.331-1.331 5.372 5.37-5.37 5.372-1.333-1.333 3.1-3.098h-7.962c-3.957 0-7.177 3.377-7.177 7.529zM22.94 7.529v1.882c3.957 0 7.177 3.377 7.177 7.529s-3.221 7.529-7.177 7.529h-7.962l3.098-3.098-1.331-1.331-5.37 5.37 5.372 5.372 1.331-1.331-3.1-3.1h7.96c4.998 0 9.062-4.222 9.062-9.412s-4.064-9.412-9.060-9.412z'],
                'full': ['0 0 32 33', 'M6.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v4h4c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333zM30.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h4v-4c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM30.667 12c-0.8 0-1.333-0.533-1.333-1.333v-4h-4c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM1.333 12c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333h-4v4c0 0.8-0.533 1.333-1.333 1.333z'],
                'setting': ['0 0 32 28', 'M28.633 17.104c0.035 0.21 0.026 0.463-0.026 0.76s-0.14 0.598-0.262 0.904c-0.122 0.306-0.271 0.581-0.445 0.825s-0.367 0.419-0.576 0.524c-0.209 0.105-0.393 0.157-0.55 0.157s-0.332-0.035-0.524-0.105c-0.175-0.052-0.393-0.1-0.655-0.144s-0.528-0.052-0.799-0.026c-0.271 0.026-0.541 0.083-0.812 0.17s-0.502 0.236-0.694 0.445c-0.419 0.437-0.664 0.934-0.734 1.493s0.009 1.092 0.236 1.598c0.175 0.349 0.148 0.699-0.079 1.048-0.105 0.14-0.271 0.284-0.498 0.432s-0.476 0.284-0.747 0.406-0.555 0.218-0.851 0.288c-0.297 0.070-0.559 0.105-0.786 0.105-0.157 0-0.306-0.061-0.445-0.183s-0.236-0.253-0.288-0.393h-0.026c-0.192-0.541-0.52-1.009-0.982-1.402s-1-0.589-1.611-0.589c-0.594 0-1.131 0.197-1.611 0.589s-0.816 0.851-1.009 1.375c-0.087 0.21-0.218 0.362-0.393 0.458s-0.367 0.144-0.576 0.144c-0.244 0-0.52-0.044-0.825-0.131s-0.611-0.197-0.917-0.327c-0.306-0.131-0.581-0.284-0.825-0.458s-0.428-0.349-0.55-0.524c-0.087-0.122-0.135-0.266-0.144-0.432s0.057-0.397 0.197-0.694c0.192-0.402 0.266-0.86 0.223-1.375s-0.266-0.991-0.668-1.428c-0.244-0.262-0.541-0.432-0.891-0.511s-0.681-0.109-0.995-0.092c-0.367 0.017-0.742 0.087-1.127 0.21-0.244 0.070-0.489 0.052-0.734-0.052-0.192-0.070-0.371-0.231-0.537-0.485s-0.314-0.533-0.445-0.838c-0.131-0.306-0.231-0.62-0.301-0.943s-0.087-0.59-0.052-0.799c0.052-0.384 0.227-0.629 0.524-0.734 0.524-0.21 0.995-0.555 1.415-1.035s0.629-1.017 0.629-1.611c0-0.611-0.21-1.144-0.629-1.598s-0.891-0.786-1.415-0.996c-0.157-0.052-0.288-0.179-0.393-0.38s-0.157-0.406-0.157-0.616c0-0.227 0.035-0.48 0.105-0.76s0.162-0.55 0.275-0.812 0.244-0.502 0.393-0.72c0.148-0.218 0.31-0.38 0.485-0.485 0.14-0.087 0.275-0.122 0.406-0.105s0.275 0.052 0.432 0.105c0.524 0.21 1.070 0.275 1.637 0.197s1.070-0.327 1.506-0.747c0.21-0.209 0.362-0.467 0.458-0.773s0.157-0.607 0.183-0.904c0.026-0.297 0.026-0.568 0-0.812s-0.048-0.419-0.065-0.524c-0.035-0.105-0.066-0.227-0.092-0.367s-0.013-0.262 0.039-0.367c0.105-0.244 0.293-0.458 0.563-0.642s0.563-0.336 0.878-0.458c0.314-0.122 0.62-0.214 0.917-0.275s0.533-0.092 0.707-0.092c0.227 0 0.406 0.074 0.537 0.223s0.223 0.301 0.275 0.458c0.192 0.471 0.507 0.886 0.943 1.244s0.952 0.537 1.546 0.537c0.611 0 1.153-0.17 1.624-0.511s0.803-0.773 0.996-1.297c0.070-0.14 0.179-0.284 0.327-0.432s0.301-0.223 0.458-0.223c0.244 0 0.511 0.035 0.799 0.105s0.572 0.166 0.851 0.288c0.279 0.122 0.537 0.279 0.773 0.472s0.423 0.402 0.563 0.629c0.087 0.14 0.113 0.293 0.079 0.458s-0.070 0.284-0.105 0.354c-0.227 0.506-0.297 1.039-0.21 1.598s0.341 1.048 0.76 1.467c0.419 0.419 0.934 0.651 1.546 0.694s1.179-0.057 1.703-0.301c0.14-0.087 0.31-0.122 0.511-0.105s0.371 0.096 0.511 0.236c0.262 0.244 0.493 0.616 0.694 1.113s0.336 1 0.406 1.506c0.035 0.297-0.013 0.528-0.144 0.694s-0.266 0.275-0.406 0.327c-0.542 0.192-1.004 0.528-1.388 1.009s-0.576 1.026-0.576 1.637c0 0.594 0.162 1.113 0.485 1.559s0.747 0.764 1.27 0.956c0.122 0.070 0.227 0.14 0.314 0.21 0.192 0.157 0.323 0.358 0.393 0.602v0zM16.451 19.462c0.786 0 1.528-0.149 2.227-0.445s1.305-0.707 1.821-1.231c0.515-0.524 0.921-1.131 1.218-1.821s0.445-1.428 0.445-2.214c0-0.786-0.148-1.524-0.445-2.214s-0.703-1.292-1.218-1.808c-0.515-0.515-1.122-0.921-1.821-1.218s-1.441-0.445-2.227-0.445c-0.786 0-1.524 0.148-2.214 0.445s-1.292 0.703-1.808 1.218c-0.515 0.515-0.921 1.118-1.218 1.808s-0.445 1.428-0.445 2.214c0 0.786 0.149 1.524 0.445 2.214s0.703 1.297 1.218 1.821c0.515 0.524 1.118 0.934 1.808 1.231s1.428 0.445 2.214 0.445v0z'],
                'right': ['0 0 32 32', 'M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z'],
                'comment': ['0 0 32 32', 'M27.128 0.38h-22.553c-2.336 0-4.229 1.825-4.229 4.076v16.273c0 2.251 1.893 4.076 4.229 4.076h4.229v-2.685h8.403l-8.784 8.072 1.566 1.44 7.429-6.827h9.71c2.335 0 4.229-1.825 4.229-4.076v-16.273c0-2.252-1.894-4.076-4.229-4.076zM28.538 19.403c0 1.5-1.262 2.717-2.819 2.717h-8.36l-0.076-0.070-0.076 0.070h-11.223c-1.557 0-2.819-1.217-2.819-2.717v-13.589c0-1.501 1.262-2.718 2.819-2.718h19.734c1.557 0 2.819-0.141 2.819 1.359v14.947zM9.206 10.557c-1.222 0-2.215 0.911-2.215 2.036s0.992 2.035 2.215 2.035c1.224 0 2.216-0.911 2.216-2.035s-0.992-2.036-2.216-2.036zM22.496 10.557c-1.224 0-2.215 0.911-2.215 2.036s0.991 2.035 2.215 2.035c1.224 0 2.215-0.911 2.215-2.035s-0.991-2.036-2.215-2.036zM15.852 10.557c-1.224 0-2.215 0.911-2.215 2.036s0.991 2.035 2.215 2.035c1.222 0 2.215-0.911 2.215-2.035s-0.992-2.036-2.215-2.036z'],
                'comment-off': ['0 0 32 32', 'M27.090 0.131h-22.731c-2.354 0-4.262 1.839-4.262 4.109v16.401c0 2.269 1.908 4.109 4.262 4.109h4.262v-2.706h8.469l-8.853 8.135 1.579 1.451 7.487-6.88h9.787c2.353 0 4.262-1.84 4.262-4.109v-16.401c0-2.27-1.909-4.109-4.262-4.109v0zM28.511 19.304c0 1.512-1.272 2.738-2.841 2.738h-8.425l-0.076-0.070-0.076 0.070h-11.311c-1.569 0-2.841-1.226-2.841-2.738v-13.696c0-1.513 1.272-2.739 2.841-2.739h19.889c1.569 0 2.841-0.142 2.841 1.37v15.064z'],
                'send': ['0 0 32 32', 'M13.725 30l3.9-5.325-3.9-1.125v6.45zM0 17.5l11.050 3.35 13.6-11.55-10.55 12.425 11.8 3.65 6.1-23.375-32 15.5z']
            };

    var getSvg = function(type){
			return '' + '<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewbox= "' + 
			svg[type][0] + '"> <use></use> <path d="' + svg[type][1] + '"></path></svg>';
	};

	/**
	 * Convert time to 00:00 format
	 * @param {Number} seconds 
	 * @param {String} 00:00
	 */ 
	 // past test 
	var formatTime = function(seconds){
		var second = Math.floor(seconds%60);
		// if there is only zero, then we append 0s to it 
		if(second<10) second = '0' + second;
		// get the minute number in integer, take floor 
		var minutes = Math.floor(seconds/60);
		if(minutes<10) minutes = '0' + minutes;
		return '' + minutes + ':' + second;
	}; 

	/**
	 * function getElementLeftView(element)
	 * @param {Object} element 
	 * @return {Number} the left position of the input element
	 */
	 var getElementLeftView = function(element){
	 	var parentContainer = element.offsetParent; // the container
	 	var realLeft = element.offsetLeft; // left position relative to the parent 
	 	var scrollLeft = 0; 
	 	if(!document.fullscreenElement && !document.mozFullScreenElement && 
	 	   !document.webkitFullscreenElement && !document.msFullscreenElement ){
	 		// recursively get the realLeft position of element
	 		while(parentContainer!==null){
	 			realLeft += parentContainer.offsetLeft;
	 			parentContainer = parentContainer.offsetParent;
	 		}
	 	}else{
	 		while(parentContainer!==null && parentContainer!=this.element){
	 			realLeft += parentContainer.offsetLeft;
	 			parentContainer = parentContainer.offsetParent;
	 		}
	 	}
	 	scrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
	 	return realLeft - scrollLeft;
	 };

	 /**  
	  *  fuction getElementTopView(element)
	  *  @param {Object} element
	  *  @return {Number} the top position of the input element 
	  */
	  var getElementTopView = function(element){
	  	var parentContainer = element.offsetParent;
	  	var realTop = element.offsetTop;
	  	var scrollTop = 0;
	  	if(!document.fullscreenElement && !document.mozFullScreenElement &&
	  	   !document.webkitFullscreenElement && !document.msFullscreenElement){
	  		while(parentContainer!==null){
	  			realTop += parentContainer.offsetTop;
	  			parentContainer = parentContainer.offsetParent;
	  		}
	  	}else{
	  		while(parentContainer!==null && parentContainer!==this.element){
	  			realTop +=parentContainer.offsetTop;
	  			parentContainer = parentContainer.offsetParent;
	  		}
	  	}
	  }; 
	// start of Player's prototype
	/** method load(); 
	 *  load the view of player 
	 */
	IcyPlayer.prototype.load = function(){
		this.element.innerHTML = 
		'<div class="icyplyr">' + 
			'<div class="icyplyr-video-wrap">' +
             	'<!-- video source -->' +
                '<video class="icyplyr-video" width="320px" height="180px">' +
                    '<source src="' + this.videoScr + '" type="video/mp4">' +
                '</video>' +
                '<div class="icyplyr-danmaku-container"></div>' + 
            '</div>'+
            		'<div class="icyplyr-comment-box">' + 
            			'<div class="comment-input-wrap">' +
							'<div class="icyplyr-comment-bar">' + 
								'<input class="icyplyr-comment-input" name="comment-content" type="text" placeholder=" click button to send">' + 
							'</div>' +
							'<div class="comment-send-wrap">' + 
								'<button class="plyr-icon icyplyr-comment-sendBtn">' +
									getSvg('send') + 
								'</button>' +
							'</div>' + 
						'</div>' + 
						'<div class="icyplyr-comment-setting-wrap">' +
							'<span class="comment-setting-label">' + 
								'Danmaku Position:' +
							'</span>' + 
							'<div class="icyplyr-comment-wrap">' +
								'<div class="comment-type-wrap">' +
									// '<span>Type</span>' + 
									'<label class="comment-type">' + 
										'<input class="danmaku-pos-option" type="radio" name="icyplyr-danmaku-type" value="top" checked>' +
									'<span>Top</span>' + 
									'</label>' + 
									'<label class="comment-type">' + 
										'<input class="danmaku-pos-option" type="radio" name="icyplyr-danmaku-type" value="fly">' +
										'<span>Moving</span>' + 
									'</label>' + 
									'<label class="comment-type">' + 
										'<input class="danmaku-pos-option" type="radio" name="icyplyr-danmaku-type" value="bottom">' +
										'<span>Bottom</span>' + 
									'</label>' + 
								'</div>' +  
							'</div>' + 
						'</div>' + 
					'</div>' + 
            // '<div class="icyplyr-controller-maks"></div>' +
            '<div class="icyplyr-controller">' + 
            	'<button class="play-button plyr-icon">' + 
	            			getSvg('play') +
		    	'</button>' +
		    	'<div class="icyplyr-volume">' +
		           	'<div class="icyplyr-volume-control">' +
						'<button class="plyr-icon icyplyr-volume-icon">' +
							getSvg('volume-up') + 
						'</button>' + 
					'</div>' +
					'<div class="icyplyr-volume-bar-wrap" style="min-width: 55px;">' + 
						'<div class="icyplyr-volume-bar" style="min-width:55px;">' + 
							'<div class="icyplyr-volume-inner" style="background: #bbffff; width:0; height: 5px; max-width: 100px;">' +
								'<span class="icyplyr-volume-thumb"></span>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="icyplyr-play-progress" style="background-color: #aaa; height: 7px;">' +
						'<div class="icyplyr-play-progress-wrap" style="background : #bbffff; height: 7px; width:0;">' +
							'<div class="icyplyr-play-bar-wrap">' +
								'<span class="icyplyr-play-bar-inner"></span>' +
							'</div>' +
						'</div>' +
				'</div>' +
				'<div class="icyplyr-playtime">' +
					'<div class="icyplyr-playtime-bar">' +
						'<span class="playtime"><span class="icyplyr-played">00:00</span>/<span class="icyplyr-totaltime">00:00</span></span>' +
					'</div>' +
				'</div>' +
				'<div class="icyplyr-comment-out">' +
					// '<div class="icyplyr-comment-wrap">' +
					'<div class="icyplyr-comment-outer">' +
						'<div class="icyplyr-comment-wrap">' +
							'<button class="plyr-icon icyplyr-comment-icon">' +
								getSvg('comment') + 
							'</button>' + 
						'</div>' +
					'</div>' + 
				'</div>' +
				'<div class="icyplyr-full">' +
					'<div class="icyplyr-full-wrap">' +
						'<button class="plyr-icon icyplyr-full-icon">' + 
							getSvg('full') +
						'</button>' +
					'</div>' +
				'</div>' + 
			'</div>' +
		'</div>';
	};

	/** initialized the player 
	 *
	 */
	IcyPlayer.prototype.init = function(){
		// make a local copy of the object; 
		// load the player 
		// console.log(this);
		this.load();
		this.eventTypes = ['play', 'pause', 'canplay','playing','ended','error'];
		this.event = {};
		// event trigger
		// make a event map object 
		for(var i=0; i<this.eventTypes.length; i++){
			this.event[this.eventTypes[i]] = [];
		}

		/**
		 * function for all the progress bar updating 
		 * @param {String} barType -> is it a volumn updater or a video progress updater
		 * @param {Number} percentage 
		 * @param {String} direction -> it is forwrad or backward 
		 *
		 */

		this.progUpdater = function(barType, percentage, direction){
		 	percentage = percentage>0 ? percentage : 0;
		 	percentage = percentage<1 ? percentage : 1;
		 	// console.log(this.volumeBar);
		 	// console.log(this);
		 	this[barType + 'Bar'].style[direction] = percentage*100 + '%';
		};

		/**
		 * function fro toggle the play button 
		 */
		this.toggle = function(){
			//console.log("say!");
			if(this.video.paused){
				this.play();
			}else{
				this.pause();
			}
		};
 		/**
 		 * function for trigger events, 
 		 * default API event has priority
 		 * then will deal with customize bind event 
 		 */
		this.trigger = function(type){
			for(var j=0; j<this.event[type].length; i++) {
				this.event[type][j]();
			}
			// this is equal to this.play(), this.pause(), this.canplay() ect
		};

		// get all buttons the elements we need for handle events 
		this.video = this.element.getElementsByClassName('icyplyr-video')[0];
		this.plyrtime = this.element.getElementsByClassName('icyplyr-time')[0];
		this.playButton = this.element.getElementsByClassName('play-button')[0];
		this.fullButton = this.element.getElementsByClassName('icyplyr-full-icon')[0];
		this.shouldPause = true;
		// volume elements
		var volumeEle = this.element.getElementsByClassName('icyplyr-volume')[0];
		var volumeIcon = this.element.getElementsByClassName('icyplyr-volume-icon')[0];
		var volumeBarOutest = this.element.getElementsByClassName('icyplyr-volume-bar-wrap')[0];
		var volumeBarWrap = this.element.getElementsByClassName('icyplyr-volume-bar')[0];
		this.volumeBar = this.element.getElementsByClassName('icyplyr-volume-inner')[0];
		var VOLUME_BAR_PADDING = 0;
		// playprogress elements 
		// show time elements 
		this.dragTrackerBar = this.element.getElementsByClassName('icyplyr-play-drag')[0];
		var playedTime = this.element.getElementsByClassName('icyplyr-played')[0];
		var totalTime = this.element.getElementsByClassName('icyplyr-totaltime')[0];
		var dragTime = this.element.getElementsByClassName('icyplyr-drag-time')[0];
		// playprogress progress bar elements
		var playprogressBar = this.element.getElementsByClassName('icyplyr-play-progress')[0];
		this.playBar = this.element.getElementsByClassName('icyplyr-play-progress-wrap')[0];

		// full screen button 
		var fullscreenBtn = this.element.getElementsByClassName('icyplyr-full-wrap')[0];


		/**
		 * dealing with video events 
		 */

		this.ended = false;
		this.video.addEventListener('ended', function(){
			this.progUpdater('play', 1, 'width');
			this.ended = true;
			this.pause();
			this.trigger('ended');
		}.bind(this));
		/**
		 *  should continue dealing with ended events here 
		 */

		// bind event listener to this 
		this.playButton.addEventListener('click', function(){
			this.toggle();
		}.bind(this));

		/**
	 	 *	Control the volume 
	 	 *
	 	 */
	 	// function for change volume icon: 
		// loud, quiet and mute 
		this.switchVolumeIcon = function(){
			if(this.video.volume >= 0.8) {
				volumeIcon.innerHTML = getSvg('volume-up');
			}else if(this.video.volume > 0) {
				volumeIcon.innerHTML = getSvg('volume-down');
			}else{
				volumeIcon.innerHTML = getSvg('volume-off');
			}
		};

		// handle move the volume bar 
		var volumeMove = function(event){
			var ev = event || window.event;
			var VOLUME_BAR_LENGTH = document.getElementsByClassName('icyplyr-volume-bar')[0].clientWidth;
			var movePercentage = (ev.clientX - getElementLeftView(volumeBarWrap)-3)/VOLUME_BAR_LENGTH;
			// console.log(movePercentage);
			movePercentage = movePercentage > 0? movePercentage : 0;
			movePercentage = movePercentage < 1? movePercentage : 1;
			// console.log(this);// print document 
			console.log(movePercentage);
			this.progUpdater('volume', movePercentage, 'width');
			this.video.volume = movePercentage;
			if(this.video.muted) this.video.muted = false;
			this.switchVolumeIcon();
			// console.log("moving vol");
		}.bind(this);

		// unattach the event after the the mouseup on the volume bar 
		// pass test 
		var volumeFinish = function(){
			// console.log("removed volume");
			document.removeEventListener('mouseup', volumeFinish);
			document.removeEventListener('mousemove', volumeMove);
		}.bind(this);
		// add EventListener to the volume icon 
		// past test
		volumeIcon.addEventListener('click', function(){
			if(this.video.muted){
				this.video.muted = false;
				this.switchVolumeIcon();
				this.progUpdater('volume', this.video.volume, 'width');
			}else{
				this.video.muted = true;
				volumeIcon.innerHTML = getSvg('volume-off');
				this.progUpdater('volume', 0, 'width');
			}
		}.bind(this));
		volumeBarWrap.addEventListener('click', function(e){
			var ev = e || window.event;
			var VOLUME_BAR_LENGTH = document.getElementsByClassName('icyplyr-volume-bar')[0].clientWidth;
			var percentageChange = (ev.clientX - getElementLeftView(volumeBarWrap))/VOLUME_BAR_LENGTH;
			percentageChange = percentageChange > 0 ? percentageChange : 0;
			percentageChange = percentageChange < 1 ? percentageChange : 1;
			this.video.volume = percentageChange;
			console.log(percentageChange);
			this.progUpdater('volume', percentageChange, 'width');
			if(this.video.muted) this.video.muted=false;
			this.switchVolumeIcon();
		}.bind(this));
		// the event will be passed to addEventListener automatically
		volumeBarWrap.addEventListener('mousedown', function(){
			document.addEventListener('mousemove',volumeMove); // the event been handled is mousemove 
			document.addEventListener('mouseup', volumeFinish); 
		}.bind(this));

		/**
		 * control play progress 
		 *
		 */
		 // function to compute time played by the video 
		var lastPlayPos = 0;
		var currentPlayPos = 0;
		var buffering = false;
		// check if the the video is buffering and the playing status
		this.detectPlayStatus = function(){
			if(!this.video.paused && !this.video.ended){
			this.detect = setInterval(function(){
				currentPlayPos = this.video.currentTime;
				// detect buffering 
				if(!buffering && currentPlayPos<(lastPlayPos + 0.01) && !this.video.paused){ 
					// the video is buffering for some reason 
					buffering = true;
				}
				if(buffering && currentPlayPos > (lastPlayPos + 0.01) && this.video.paused){
					// the video is playing 
					buffering = false;
				}
				lastPlayPos = currentPlayPos;
				playedTime.innerHTML = formatTime(currentPlayPos);
				totalTime.innerHTML = formatTime(this.video.duration);
				this.progUpdater('play', this.video.currentTime/this.video.duration, 'width');
				this.trigger('playing');
				// console.log("tracking");
			}.bind(this), 100);
			}
		}.bind(this);

		// function to clear time when finishing playing 
		this.clearTime = function(){
			window.clearInterval(this.detect);
			// console.log("cleared!");
		};

		// add event listener to the play-progree bar 
		playprogressBar.addEventListener('click', function(e){
			var ev = e || window.event;
			var clickPoint = ev.clientX;
			var barWidth = playprogressBar.clientWidth;
			var playPercent = (clickPoint-getElementLeftView(this.playBar))/barWidth;
			playPercent = playPercent > 0 ? playPercent : 0;
			playPercent = playPercent < 1 ? playPercent : 1;
			this.progUpdater('play', playPercent, 'width');
			this.video.currentTime = playPercent*this.video.duration;
			//dragTime.innerHTML = formatTime(this.video.currentTime);
			playedTime.innerHTML = formatTime(this.video.currentTime);
			//dragTime = playPercent*this.video.duration;
		}.bind(this));

		// control the thumbMove events 
		var thumbMove = function(event){
			var ev = event || window.event;
			var thumbPoint = ev.clientX;
			var barWidth = playprogressBar.clientWidth;
			var thumbPercent = (thumbPoint-getElementLeftView(this.playBar))/barWidth;
			//playprogressBar.clientWidth;
			thumbPercent = thumbPercent>0 ? thumbPercent : 0;
			thumbPercent = thumbPercent<1 ? thumbPercent : 1;
			this.progUpdater('play', thumbPercent, 'width'); // update play while drag bar
			//dragTime.innerHTML = formatTime(thumbPercent*this.video.duration);// update the time of thumb place 
			//console.log("moving");
			//console.log(dragTime); 
			// fix this later not showing number on the play time but on the cursor 
		}.bind(this);

		var thumbUp = function(){
			document.removeEventListener('mouseup', thumbUp);
			// console.log(window);
			document.removeEventListener('mousemove', thumbMove);
			this.video.currentTime = (parseFloat(this.playBar.style.width))/100*this.video.duration;
			//console.log(this.playBar.style.width);
			if(!this.video.paused && !this.video.ended) this.detectPlayStatus();
		}.bind(this);

		playprogressBar.addEventListener('mousedown', function(){
			this.clearTime();
			// console.log("clear mouseDown");
			document.addEventListener('mousemove', thumbMove);
			document.addEventListener('mouseup', thumbUp);
		}.bind(this));
		
		/**
		 * control fullscreen option 
		 * lots of browser compatibility problem 
		 */
		 fullscreenBtn.addEventListener('click', function(){
		 	if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement){
		 		// if not set as a fullscreen element, then set it and deal with browser compatibility
		 		if(this.element.requestFullscreen){
		 			this.element.requestFullscreen();
		 		}else if (this.element.mozRequestFullScreen){
		 			this.element.mozRequestFullScreen();
		 		}else if (this.element.webkitRequestFullscreen){
		 			// For security reason some browser block keyboard input while in full screen mode 
		 			// BUGGY Safari for full-screen input .....
		 			this.element.webkitRequestFullscreen();
		 			//commentBtn.style.visibility = 'hidden';
		 			if(commentSettingBox.classList.contains('icyplyr-comment-open')){
		 				commentSettingBox.classList.add('icyplyr-remove-box');
		 			}
		 		}
		 	}else{
		 		// if it is already in full screen mode, then toggle it back to small window
		 		if(document.cancelFullscreen){
		 			// console.log("worked 1");
		 			document.cancelFullscreen();
		 		}else if(document.mozCancelFullScreen){
		 			// console.log("worked 2");
		 			document.mozCancelFullScreen();
		 		}else if(document.msExitFullscreen){
		 			// console.log("worked 3");
		 			document.msExitFullscreen();
		 		}else if(document.webkitCancelFullScreen){
		 			// console.log("worked 4");
		 			//commentBtn.style.visibility = 'visible';
		 			document.webkitCancelFullScreen();
		 			if(commentSettingBox.classList.contains('icyplyr-comment-open')){
		 				commentSettingBox.classList.remove('icyplyr-remove-box');
		 			}
		 		}
		 	}
		 }.bind(this));

		 /**
		  * Toggle the danmaku input area 
		  */ 
		 var commentBtn = this.element.getElementsByClassName('icyplyr-comment-icon')[0];
		 var commentSettingBox = this.element.getElementsByClassName('icyplyr-comment-box')[0];
		 var commentBoxSafariFull = function(){
		 	commentSettingBox.innerHTML = "Sorry, Safari does not allow for fullscreen keyboard input, exit fullscreen to send comments.";
		 };
		 commentBtn.addEventListener('click', function(){
		 	commentSettingBox.classList.toggle('icyplyr-comment-open');
		 	if(commentSettingBox.classList.contains('icyplyr-comment-open')){
		 		// cancel hotkey events when have comment box open
		 		document.removeEventListener('keydown', hotkeyDown);
		 		commentInput.focus();
		 	}else{
		 		document.addEventListener('keydown', hotkeyDown);
		 	}
		 });
		 //var sendCommentBtn = this.element.getElementsByClassName('icyplyr-comment-sendBtn')[0];

		/**
		 *	control danmaku
		 */
	 	var danContainer = this.element.getElementsByClassName('icyplyr-danmaku-container')[0];
	 	var danWidth;		 
	 	var DAN_HEIGHT = 30;
	 	var containerHeight;
	 	var containerWidth;
	 	var danPath = {
	 		'top' : {},
	 		'fly' : {},
	 		'bottom' : {}
	 	}; // container to store danmaku 

	 	var danItemRight = function(elem){
	 		return danContainer.getBoundingClientRect().right - elem.getBoundingClientRect().right;
	 	};

	 	var danSpeed = function(elem){
	 		return (danWidth + elem.offsetWidth)/5;
	 	};
	 	// method dealing with danmaku position
	 	// change this method  

	 	// for use in animateioned event 
	 	var animatePath = function(type, i){
	 		danPath[type][i+''].splice(0,1);
	 	};
	 	function getPath(elem, type){
	 		// first check if the path is empty now
	 		console.log(danPath);
	 		console.log(elem);
	 		console.log(type);
	 		for(var i=0; ;i++){
	 			var old = danPath[type][i+''];
	 			if( old && old.length){
	 				for(var j=0; j<old.length; j++){
	 					var danRight = danItemRight(old) - 10;
	 					if(danRight<=0) break;
	 					// when we reach the final one, 
	 					// we push the new danmaku into path 
	 					if(j===old.length-1){
	 						danPath[type][i+''].push(elem);
	 						ele.addEventListener('animationed', animatePath(type,i));
	 						return i%itemY;
	 					}
	 				}
	 			}else{
	 				// if the path is empty right now. 
	 				danPath[type][i+''] = [elem];
	 				console.log(danPath[type][i+'']);
	 				elem.addEventListener('animationed', animatePath(type,i));
	 				return i%itemY;
	 			}
	 		}
	 	}

	 	this.danmakuBegin = function(text, pos){
	 		var singleDan = document.createElement('div');
	 		singleDan.innerHTML = text;
	 		containerHeight = danContainer.offsetHeight;
	 		containerWidth = danContainer.offsetWidth;
	 		itemY = parseInt(containerHeight/DAN_HEIGHT);
	 		singleDan.classList.add('icyplyr-comment-'+pos.toLowerCase());
	 		singleDan.classList.add('icyplyr-comment');


	 		// sent the danmaku 
	 		console.log(singleDan);
	 		danContainer.appendChild(singleDan);
	 		switch(pos){
	 			case 'top':
	 				singleDan.style.top = DAN_HEIGHT*getPath(singleDan, 'top') + 'px';
	 				singleDan.addEventListener('animationend', function(){
	 					danContainer.removeChild(singleDan);
	 					console.log('removed!');
	 				});
	 				break;
	 			case 'fly':
	 				singleDan.style.top = DAN_HEIGHT*getPath(singleDan, 'fly') + 'px';
	 				singleDan.style.width = (singleDan.offsetWidth + 1) + 'px';
	 				// move the item through the danContainer 
	 				singleDan.style.transform = 'translateX' + '(-' + danWidth + 'px)';
	 				singleDan.addEventListener('animationend', function(){
	 					danContainer.removeChild(singleDan);
	 				});
	 				break;
	 			case 'bottom':
	 				singleDan.style.bottom = DAN_HEIGHT*getPath(singleDan, 'bottom') + 'px';
	 				singleDan.addEventListener('animationend', function(){
	 					danContainer.removeChild(singleDan);
	 				});
	 				break;
	 			default:
	 				console.error('Can not handle danmaku type ' + pos);
	 		}
	 		// move the danmaku 
	 		singleDan.classList.add('icyplyr-danmaku-move');
		};

		/**
		 *	comment settings  
		 */
		 // var commentBtn = this.element.getElementsByClassName('icyplyr-comment-icon')[0]; already defined 
		 var sendBtn = this.element.getElementsByClassName('icyplyr-comment-sendBtn')[0];
	 	// show opacity progress bar 
		 var commentOpacityThumbBar = this.element.getElementsByClassName('icyplyr-comment-opacitythumb')[0];
		 // comment input area 
		 var commentInput = this.element.getElementsByClassName('icyplyr-comment-input')[0];
		 // get comment position option value 

		 // function handle sending comment
		 // enconde comment content to avoid execution of fake html 
		 var htmlEncode = function(text){
		 	return text.replace(/&/g, "&amp;")
		 			   .replace(/</g, "&lt;")
		 			   .replace(/>/g, "&gt")
		 			   .replace(/"/g, "&quot")
		 			   .replace(/\//g, "&#x2f;")
		 			   .replace(/'/g, "&#x27");
		 };

		 this.controlAnimation = function(){
		 	var commentItems = document.getElementsByClassName('icyplyr-comment');
		 	if(this.video.paused){
		 		for(var i=0; i<commentItems.length; i++){
		 			commentItems[i].classList.add('icyplyr-stop-animation');
		 		}
		 	}else{
		 		for(var j=0; j<commentItems.length; j++){
		 			if(commentItems[j].classList.contains('icyplyr-stop-animation')){
		 				commentItems[j].classList.remove('icyplyr-stop-animation');
		 			}
		 		}

		 	}
		 };
		
		//sendBtn.addEventListener('click',sendComment);
		function sendComment(){
			console.log('in send Comment method');
			console.log(this.video);
			console.log(this);
		 	if(!commentInput || !commentInput.value.replace(/^\s+|\s+$/g,'')){
		 		// if the comment is empty ..... 
	 		// trim the comment, to make it work in IE, use regular expression instead of trim() method from ES5
	 		alert('Please type comment content before send.');
	 		return;
	 		}
	 	// Object for storing comment 
	 		//var typeOpt = this.element.querySelector('input[name="icyplyr-danmaku-type"]:checked').value;
	 		// console.log(this);
	 		// when come into the key-value, the this value become windwo instead of IcyPlayer ??
	 		var commentObj = {
	 				text: commentInput.value,
	 				time: this.video.currentTime,
	 				type: this.element.querySelector('input[name="icyplyr-danmaku-type"]:checked').value
	 				// add opacity here 
	 		};
	 		/**
	 		// deal with backend later 
	 		var xhr = new XMLHttpRequest();
	 	// handle post danmaku 
	 		xhr.onreadystatechange = function(){
			 	if(xhr.readystatus === 4){
			 		// if the respond content finish loading 
		 		// check the status of the respond
			 		if(xhr.status>=200 && xhr.status<300){
			 			// if the request is successful get the respond string to JSON format 
		 				var respondContent = JSON.parse(xhr.responseText);
			 			if(respondContent.fyi!==1){
		 					// something still wrong ...
		 					alert(respondContent.msg);
		 				}else{
		 					// otherwise show some message 
		 					console.log('POST danmaku', JSON.parse(xhr.responseText));	
		 				}
		 			}else{
		 				console.log('Request failed...' + xhr.status);
		 			}
		 		}
	 		};
	 		xhr.open('post', this.options.danmaku.api, true);
	 		xhr.send(JSON.stringify(commentObj));
			*/
	 		commentInput.value = ''; // clear input area
	 		//this.dan.splice(this.danIndex, 0, commentObj);
	 		// this.danIndex++;
	 		this.danmakuBegin(htmlEncode(commentObj.text), commentObj.type); 
	 	}


	 	// add event listenser to send comment button 
	 	sendBtn.addEventListener('click', sendComment.bind(this));
	 	/**
	 	 *	To deal with hot keys
	 	 */
	 	var hotkeyDown = function(e){
	 		var event = e || window.event;
	 		var percentage;
	 		switch(event.keyCode){
	 			case 32:
	 				event.preventDefault();
	 				this.toggle();
	 				break;
	 			case 37:
	 				event.preventDefault();
	 				this.video.currentTime = this.video.currentTime - 10;
	 				break;
	 			case 39: 
	 				event.preventDefault();
	 				this.video.currentTime = this.video.currentTime + 10;
	 				break;
	 			case 38:
	 				event.preventDefault();
	 				percentage = this.video.volume + 0.2;
	 				percentage = percentage > 0 ? percentage : 0;
	 				percentage = percentage < 1 ? percentage : 1;
	 				this.progUpdater('volume', percentage, 'width');
	 				this.video.volume = percentage;
	 				this.switchVolumeIcon();
	 				if(this.video.muted){
	 					this.video.muted = false;
	 				}
	 				break;
	 			case 40:
	 				event.preventDefault();
	 				percentage = this.video.volume - 0.2;
	 				percentage = percentage > 0 ? percentage : 0;
	 				percentage = percentage < 1 ? percentage : 1;
	 				this.progUpdater('volume', percentage, 'width');
	 				this.video.volume = percentage;
	 				this.switchVolumeIcon();
	 				if(this.video.muted){
	 					this.video.muted = false;
	 				}
	 				break;
	 		}
	 	}.bind(this);
	 	document.addEventListener('keydown', hotkeyDown);

	};



	/** 
	 *	Play() method 
	 */
	IcyPlayer.prototype.play = function(){
			if(this.video.paused){
			this.shouldPause = false;
			this.progUpdater('volume', this.video.volume, 'width');
			this.playButton.innerHTML = getSvg('pause');
			this.video.play();
			this.controlAnimation();
			// since the checking is removed when the video is paused
			// we need to get it back when play it again 
			this.detectPlayStatus();
			this.trigger('play');
		}

		//var video = this.video; // make a local copy of the video 
		//this.playButton.addEventListener('click', this.video.play());
	};

	/**
	 *	Pause() method 
	 */

	IcyPlayer.prototype.pause = function(){
		 	if(!this.shouldPause || this.ended){
	 		this.shouldPause = true;
	 		this.ended = false;

	 		this.playButton.innerHTML = getSvg('play');
	 		this.video.pause();
	 		this.controlAnimation();
	 		this.clearTime(); 
	 		// stop checking the status of playstatus when the video is stopped to be more efficient 
	 		this.trigger('pause');
	 	}
	};
	/**
	 *	 bindEvent() method, 
	 *	 Designed for people who would like to attach event to specific event type, 
	 *  But the API will handle the "defualt" event first, 
	 *  Then hander the customize event. 
	 */
	IcyPlayer.prototype.bindEvent = function(name, func){
			if(typeof func === 'function'){
			this.event[name].push(func);
		}
	};
window.IcyPlayer = IcyPlayer;
})();
