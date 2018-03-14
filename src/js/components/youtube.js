	var tag = document.createElement('script');
	var player;
	tag.src = "https://www.youtube.com/iframe_api";

	var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	
	function onYouTubeIframeAPIReady() {
		player = new YT.Player('player', {
		videoId: 'zNeOTOytEeA',
		height: '100%',
		width: '100%',
			playerVars: { 
				'scrollwheel': false,
				'autoplay': 1, 
				'controls': 0 , 
				'disablekb': 1, 
				'modestbranding': 1, 
				'rel': 0, 
				'showinfo': 0, 
				'enablejsapi': 1
			},
			events: {
				'onReady': onPlayerReady
			}
		});
	}

	// 4. The API will call this function when the video player is ready.
	function onPlayerReady(event) {
		event.target.playVideo();
		event.target.mute();
	}
 