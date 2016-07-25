# IcyPlayer
<img src="https://img.shields.io/badge/version-0.1.0-blue.svg?style=flat-square">
<img src="https://img.shields.io/badge/made%20with-%e2%9d%a4-ff69b4.svg?style=flat-square">
> A video player API writter in Javascript and HTML5.

> [IcyPlayer Demo Page](https://yuuki221.github.io/IcyPlayer/Demo/) 

<div style="text-align=""center">
<img alt="player-image" src="https://raw.githubusercontent.com/Yuuki221/IcyPlayer/master/image/show.png" >
</div>

This is an HTML5, CSS3 and Javascript based Video Player API, currently, it supports regular video player functions: play/pause video, volume adjustment, fullScreen option, play progress.

More importantly, it has awesome __DANMAKU( 弹幕，live video comments )__ function, you can express your feeling while watching the video！ 

## API Currently Available Methods:
1. `init()`: initialize video player
2. `play()`: play video
3. `pause()`: pause video 
4. `bindEvent()`: bind event to video


## Use
Attach the `IcyPlayer.js` and `style.css` file to your website or project. 

## Options 

```javascript
var input = {
				element : document.getElementsByClassName('plyr-wrap-wrap')[0],   
				// required, the element you would like to use the player
				url : 'TKLin.mp4'       
				// required, the url of the video 
			};
			var plyr = new IcyPlayer(input);
			plyr.init();
			
```

## Future Improvements
1. Make controller bar auto hide and show
2. Add backend to store danmaku
3. Add more options to the appearance of Player and Danmaku


