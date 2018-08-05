(function(){

	let swiper = new Swiper('.slider_top', {
		slidesPerView: 4,
		loop: true,
		pagination: {
			el: '.slider__pagination',
			clickable: true,
		},
		autoplay: {
			delay: 5000,
		},
		breakpoints: {
			1200: {
				slidesPerView: 3
			},
			720: {
				slidesPerView: 2
			},
			540: {
				slidesPerView: 1
			}
		},
	});

})();