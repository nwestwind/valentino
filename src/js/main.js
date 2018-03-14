var fs = fs || {};
fs.skies = fs.skies || {};

// Setup
fs.skies.setup = {
	settings: {
			timeout: 150,
	},

	state: {
		header: $('header'),
		win: $(window),
		body: $('body'),
		breakpoint: null
	},

	init: function () {
		var self = this;
		var timer;

		// Debounce
		self.state.win.on('resize', function() {
			clearTimeout( timer );
			timer = setTimeout(function(){
				self.state.win.trigger('resized');
			}, self.settings.timeout );
		});

		if (window.DeviceOrientationEvent) {
			window.addEventListener('orientationchange', function() {
				self.state.win.trigger('resized');
			});
		}

		self.state.win.on('resized', function() {
			var oldBreakpoint = self.state.breakpoint;
			var newBreakpoint = self.getResponsiveTag();


			if(oldBreakpoint !== newBreakpoint) {
				self.state.breakpoint = newBreakpoint;
				self.state.win.trigger('breakpointchange', [newBreakpoint, oldBreakpoint]);
			}
		});
	},

	getResponsiveTag: function () {
		return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
	}
};
// WayPoints
// fs.skies.wayPoint = {
// 	state: {
// 		namespace: 'wayPoint'
// 	},

// 	init: function() {
// 		this.listener();
// 	},

// 	listener: function () {
// 		var self = this;
		
// 		// pop in social icons
// 		var $footer = $('footer'),
// 		footer = new Waypoint({
// 			element: $footer,
// 			handler: function () {
// 				$footer.addClass('shown');

// 				setTimeout(function(){
// 					$footer.addClass('hover');
// 				}, 1000);
// 			},
// 			offset: "70%"
// 		});
		
// 	}
// };

// Scroll
fs.skies.scroll = {
		state: {
			namespace: 'scroll'
		},

		init: function() {
			this.listen();
		},

		listen: function () {
				var self = this,
					lastId,
					topMenu = $("nav"),
					topMenuHeight = parseInt(topMenu.outerHeight(true))+15,
					// All list items
					menuItems = topMenu.find("a"),
					// Anchors corresponding to menu items
					scrollItems = menuItems.map(function(){
						var item = $('#'+$(this).attr("href").split('#')[1]);
						if (item.length) {
							return item; 
						}
					});

				if($(document).scrollTop() > 0) {
					fs.skies.setup.state.header.addClass('scroll');
					fs.skies.setup.state.body.addClass('scroll');
				}

				fs.skies.setup.state.win.scroll(function() {
						//console.log('scroll');
						if(fs.skies.setup.state.win.width() >= 992) {
			 
						if($(document).scrollTop() > 0) {
							fs.skies.setup.state.header.addClass('scroll');
							fs.skies.setup.state.body.addClass('scroll');

						} else {
							fs.skies.setup.state.header.removeClass('scroll');
							fs.skies.setup.state.body.removeClass('scroll');
							$('.more-scroll').removeClass('scrolled');
						}
								
						}
						// Get container scroll position
					var fromTop = $(this).scrollTop() + topMenuHeight;

					 // Get id of current scroll item
					var cur = scrollItems.map(function(){
											if ($(this).offset().top < fromTop){
													return this;
											}
									});
					 // Get the id of the current element

									if(fromTop + $(this).height() > $(document).height()) {
											cur = $('footer');
									} else {
											cur = cur[cur.length-1];
									}
									var id = cur && cur.length ? cur[0].id : "";

					// console.log();

					if (lastId !== id) {
						lastId = id;
						// window.location.hash = lastId;
						// console.log( match);

						// Set/remove active class
						menuItems.removeClass("active").filter("[href='#"+id+"']").addClass("active");					
					}
				});
			// Bind click handler to menu items
			// so we can get a fancy scroll animation
			// menuItems.click(function(e){
			// 	var href = $(this).attr("href"),
			// 		offsetTop = href === "#" ? 0 : $(href).offset().top;
			// 	$('html, body').stop().animate({ 
			// 		scrollTop: offsetTop
			// 	}, 300);
			// 	 console.log(offsetTop);
			// 	 e.preventDefault();
			// });
		}
};
// back to top
fs.skies.backTop = {
		state: {
			namespace: 'backTop'
		},

		init: function() {
			this.listen();
		},

		listen: function () {
			var self = this,
			topMenu = $("nav"),
			topMenuHeight = parseInt(topMenu.outerHeight(true));

			$('.back-to-top').on('click', function() {
				var offsetTop = 0;
				$('html, body').stop().animate({
					 scrollTop: offsetTop
				}, 300);
			});
		}
};

$(function(){
	fs.skies.setup.init();
	fs.skies.scroll.init();
	fs.skies.backTop.init();
	//fs.skies.wayPoint.init(); 
 
});
 