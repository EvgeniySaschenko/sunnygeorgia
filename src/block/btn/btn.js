(function(){
	let toggleBtn= (idBtn)=>{
		/*
			idBtn - id кнопки при нажатии на которую происходит прерключение
			data-id-control - id елемента которому добавляется/удаляется класс ".active" после нажатия на кнопку 
		*/
		// Клик
		document.getElementById(idBtn).addEventListener('click', function(){
			this.classList.toggle('active');
			let idControl= this.getAttribute('data-id-control');
			document.getElementById(idControl).classList.toggle('active');
		});
		// Касание
		document.getElementById(idBtn).addEventListener('touch', function(){
			this.classList.toggle('active');
			let idControl= this.getAttribute('data-id-control');
			document.getElementById(idControl).classList.toggle('active');
		});
	}


	// Кнопка показать / скрыть отзывы
	try{
		toggleBtn('btn_form-add-comment');
	} catch(err){

	}

})();


(function(){
	let showModal= (idBtn, idModal)=>{
		document.getElementById(idBtn).addEventListener('click', function(){
			document.getElementById(idModal).classList.add('active');
		})
	}
	// Кнопка бургер header - преключение навигации
	showModal('btn_modal-send-order-1', 'modal_send-order');
	showModal('btn_modal-send-order-2', 'modal_send-order');
	showModal('btn_modal-send-order-3', 'modal_send-order');
})();