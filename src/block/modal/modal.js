(function(){
	let modal__close= function(event, el){
		let modal__close= document.querySelectorAll(el);
		for(let i= 0, l= modal__close.length; l > i; i++){
			modal__close[i].addEventListener(event, function(){
				document.querySelector('.modal.active').classList.remove('active');
			});
		}
	}

	modal__close('click', '.modal__close');
	modal__close('touch', '.modal__close');

	modal__close('click', '.form__modal-close');
	modal__close('touch', '.form__modal-close');
})();