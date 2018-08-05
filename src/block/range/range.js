(function(){
	let range= function(range, sliderStart= 0, callback= false){
		let cb= callback ? callback : function(){};
		let range__slider= range.getElementsByClassName('range__slider')[0];
		let range__proggres= range.getElementsByClassName('range__proggres')[0];
		let sliderWidth= range__slider.clientWidth;
		let rangeWidth= range.clientWidth;
		// Проверка на максимальное минимальное значение положения .range__slider
		let sliderPos;
		// Если стартовая позиция задана в %
		if(sliderStart.indexOf('%') + 1){
			sliderPos= sliderStart.substring(0, sliderStart.length - 1)
			if(sliderPos > 100 || sliderPos < 0){
				sliderPos= 0;
			}else{
				sliderPos= sliderStart;
			}
		// Если стартовая позиция задана в px
		} else{
			sliderPos= sliderStart.substring(0, sliderStart.length - 2);
			if(sliderPos > rangeWidth || sliderPos < 0){
				sliderPos= 0;
			}else{
				sliderPos= sliderStart;
			}
		}
		// Задаётся положение слайдера и полосы прогресса
		range__slider.style.left= sliderPos;
		range__proggres.style.width= sliderPos;

		range__slider.addEventListener('mousedown', function(e){
			// Положение елемента .range на странице
			let rangePos= range.getBoundingClientRect().left;
			let move= function(e){
				/* 
					Изменить позицию .range__slider
					e.clientX - положение мыши
					rangePos - положение элемента .range с лева от края страницы
				*/
				sliderPos= e.clientX - rangePos;

				if( sliderPos <=  0 ){
					sliderPos= 0;
				}

				if( sliderPos >= rangeWidth ){
					sliderPos= rangeWidth;
				}

				range__slider.style.left= (sliderPos - sliderWidth / 2) + 'px';
				range__proggres.style.width= sliderPos + 'px';
				cb(sliderPos);
			}

			document.addEventListener('mousemove', move);
			document.addEventListener('mouseup', (e)=>{
				document.removeEventListener('mousemove', move);
			});
		});
	}

})();