/*
	Stellar by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
		xxsmall: '(max-width: 360px)'
	});

	$(function() {

		var is_mobile = false;
		var	$window = $(window),
			$body = $('body'),
			$main = $('#main');

		// Check for mobile device
			if( $('#nav').css('display')=='none') {
				is_mobile = true;
			}

		// Add smooth scrolling to all links
		$("a").on('click', function(event) {

			// Make sure this.hash has a value before overriding default behavior
				if (this.hash !== "") {
					// Prevent default anchor click behavior
						event.preventDefault();

					// Store hash
			 			var hash = this.hash;

					// Using jQuery's animate() method to add smooth page scroll
					// The optional number (1000) specifies the number of milliseconds
					// it takes to scroll to the specified area
						if (is_mobile == false) {
				 			$('html, body').animate({
				 				scrollTop: $(hash).offset().top - 30}, 1000, function() {
									// Add hash (#) to URL when done scrolling (default click behavior)
										window.location.hash = hash;
							});
						} else {
				 			$('html, body').animate({
				 				scrollTop: $(hash).offset().top}, 1000, function() {
									// Add hash (#) to URL when done scrolling (default click behavior)
										window.location.hash = hash;
							});
						}
				} // End if
		});

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		var $header = $(".index-header");
		var $headerContent = $("#header-content");
		var headerHeight = window.innerHeight;
		var headerContentTop = (headerHeight / 2) - ($headerContent.height() / 1.5);
		var headerContentLeft = ($header.width() / 2) - ($headerContent.width() / 2);

		$headerContent.css("position", "relative");

		if (is_mobile == false) {
			// Header
				headerHeight = headerHeight - $("#nav").height() * 4;

			// Header Content
				headerContentTop = headerContentTop - $("#nav").height() * 2;

			// Brand Name
				$("#header-content h1").css({"font-size":"4.25rem"});

			// Brand Tagline
				$("#header-content p").css({"font-size":"1.65rem"})
		} else {
			// Mobile exclusive code
				$("#wrapper").css({"max-width":"100%"});

			// Header
				$header.css({"padding":"0 10% 0 10%"});

			// Footer
				$("#footer").height(window.innerHeight - 40);
				$("#footer").css({"padding":"0", "margin":"0"});
				$("#footer-content").css({"padding":"8%", "margin":"0%"});
		}

	// Header
		$header.height(headerHeight);

	// Header Content
		$headerContent.css("top", headerContentTop);
		$headerContent.css("left", headerContentLeft);

	// Brand Logo (Light Bulb Pen)
		$brandLogo = $("#led-logo");
		$brandLogo.css({"-webkit-filter":"sepia(0.5) brightness(2.0) invert(0%)", "filter":"sepia(0.5) brightness(2.0) invert(0%)"});

	// Get Started Button
		$(".header-button").css({"padding":"2rem 0 0 0"});

		// Nav.
			var $nav = $('#nav');

			if ($nav.length > 0) {

				// Shrink effect.
					$main
						.scrollex({
							mode: 'top',
							enter: function() {
								$nav.addClass('alt');
							},
							leave: function() {
								$nav.removeClass('alt');
							},
						});

				// Links.
					var $nav_a = $nav.find('a');

					$nav_a
						.scrolly({
							speed: 1000,
							offset: function() {
								return $nav.height();
							}
						})
						.on('click', function() {

							var $this = $(this);

							// External link? Bail.
								if ($this.attr('href').charAt(0) != '#')
									return;

							// Deactivate all links.
								$nav_a
									.removeClass('active')
									.removeClass('active-locked');

							// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
								$this
									.addClass('active')
									.addClass('active-locked');

						})
						.each(function() {

							var	$this = $(this),
								id = $this.attr('href'),
								$section = $(id);

							// No section for this link? Bail.
								if ($section.length < 1)
									return;

							// Scrollex.
								$section.scrollex({
									mode: 'middle',
									initialize: function() {

										// Deactivate section.
											if (skel.canUse('transition'))
												$section.addClass('inactive');

									},
									enter: function() {

										// Activate section.
											$section.removeClass('inactive');

										// No locked links? Deactivate all links and activate this section's one.
											if ($nav_a.filter('.active-locked').length == 0) {

												$nav_a.removeClass('active');
												$this.addClass('active');

											}

										// Otherwise, if this section's link is the one that's locked, unlock it.
											else if ($this.hasClass('active-locked'))
												$this.removeClass('active-locked');

									}
								});

						});

			}

		// Scrolly.
			$('.scrolly').scrolly({
				speed: 1000
			});

	});

})(jQuery);
