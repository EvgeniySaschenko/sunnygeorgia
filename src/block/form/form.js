(function(){
	// Сообщение при отправке письма
	$('#form_modal-send-order, #form_callback').on('submit', function(e) {
		let msg;
		if( $(this).data('lang') == 'en' ){
			msg= 'Thank you for your application! Our operator will contact you shortly.';
		} else{
			msg= 'Спасибо за заявку! Наш оператор с Вами скоро свяжется.'
		}
		var $this = $(this);
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: 'vendor/php_mailer/mail.php',
			data: $this.serialize()
		}).done(function() {
			alert(msg);
		});
		$(this)[0].reset();
	});

})();

// Добавить комментарий
(function(){
	let templateReview= function(){
		let template;
		if(localStorage.reviews){
			JSON.parse(`[${localStorage.reviews}]`).reverse().map(function(e){
					template+= 
					`<div class="reviews__item">
						<div class="reviews__box-avatar">
						<img class="reviews__img reviews__img_avatar" src="${ e.imgAvatar }" alt="" role="presentation">
						</div>
						<div class="reviews__box-comment">
							<div class="reviews__row reviews__row_1"><span class="reviews__name">${ e.name } ${ e.lastName }</span><span class="reviews__date">${ e.date }</span>
							</div>
						<div class="reviews__row reviews__row_2">
							<div class="reviews__rating">
								<i class="icon icon-star"></i>
								<i class="icon ${ e.rating < 2 ? 'icon-star-not-active' : 'icon-star'}"></i>
								<i class="icon ${ e.rating < 3 ? 'icon-star-not-active' : 'icon-star'}"></i>
								<i class="icon ${ e.rating < 4 ? 'icon-star-not-active' : 'icon-star'}"></i>
								<i class="icon ${ e.rating < 5 ? 'icon-star-not-active' : 'icon-star'}"></i>
							</div>
						</div>
							<div class="reviews__row reviews__row_3">
								<p class="reviews__text">${ e.comment }</p>
							</div>
						</div>
					</div>`;
				})
				if( document.querySelector(".reviews") ){
					document.querySelector(".reviews").insertAdjacentHTML("afterBegin", template.replace('undefined', ''))
				}
		}
	}


	// Добавить комментарий
	let form__btn_addComment= document.getElementById('form__btn_add-comment');
	if(form__btn_addComment){

		form__btn_addComment.addEventListener('click', function(e){
			let form= document.getElementById('form_add-comment');
			let comment= form.querySelector('.form__textarea');
			let name= form.querySelector('.form__field_name');
			let lastName= form.querySelector('.form__field_last-name');
			let fileUpload= form.querySelector('.form__file_upload').files[0];
			let rating= form.querySelector('.form__rating-item-checkbox:checked');
	
			if( comment.value != '' && fileUpload){
				e.preventDefault();
	
				let reader = new FileReader();
				let imgAvatar;
				let reviews= localStorage.getItem('reviews');
	
				reader.onloadend = function () {
					imgAvatar= reader.result;
					if( reviews ){
						// последующие комментарии добаввляем localStorage
	
						reviews += `,{"id" : "${ Date.now() }", "imgAvatar" : "${ imgAvatar }", "name" : "${ name.value }", "lastName" : "${ lastName.value }", "comment" : "${ comment.value }", "date" : "${ moment().format('MMMM DD') }", "rating" : "${ rating.value }"}`;
						localStorage.setItem('reviews', reviews);
					} else {
						// Первый комментарий добаввляем localStorage
						localStorage.setItem('reviews', `{ "id" : "${ Date.now() }", "imgAvatar" : "${ imgAvatar }", "name" : "${ name.value }", "lastName" : "${ lastName.value }", "comment" : "${ comment.value }", "date" : "${ moment().format('MMMM DD') }", "rating" : "${ rating.value }" }`);
					}
					
					// Добавление шаблона в HTML при новом комментарии
					let template= 
					`<div class="reviews__item">
						<div class="reviews__box-avatar">
						<img class="reviews__img reviews__img_avatar" src="${ imgAvatar }" alt="" role="presentation">
						</div>
						<div class="reviews__box-comment">
							<div class="reviews__row reviews__row_1">
								<span class="reviews__name">${ name.value } ${ lastName.value }</span><span class="reviews__date">${ moment().format('MMMM DD') }</span>
							</div>
							<div class="reviews__row reviews__row_2">
								<div class="reviews__rating">
									<i class="icon icon-star"></i>
									<i class="icon ${ rating.value < 2 ? 'icon-star-not-active' : 'icon-star'}"></i>
									<i class="icon ${ rating.value < 3 ? 'icon-star-not-active' : 'icon-star'}"></i>
									<i class="icon ${ rating.value < 4 ? 'icon-star-not-active' : 'icon-star'}"></i>
									<i class="icon ${ rating.value < 5 ? 'icon-star-not-active' : 'icon-star'}"></i>
								</div>
							</div>
							<div class="reviews__row reviews__row_3">
								<p class="reviews__text">${ comment.value }</p>
							</div>
						</div>
					</div>`;
					document.querySelector(".reviews").insertAdjacentHTML("afterBegin", template);
	
					comment.value= '';
					name.value= '';
					lastName.value= '';
				}
				if (fileUpload) {
					reader.readAsDataURL(fileUpload);
				} else{
				}
			}
		});

	}
	templateReview();
})();


// стилизация select | поля загрузки файла
(function(){
	setTimeout(function() {
		$('.form__select').styler();
	}, 100)
})();