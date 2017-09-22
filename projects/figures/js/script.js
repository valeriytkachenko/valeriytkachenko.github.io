		var videoIndex = 1; //первое(0) видео проигрывается автоматически, начинаем со второго(1)
		var styleIndex = 1; //стиль меняем для видео, которое проигрывается, поэтому начинаем с 1
		//меняем расположение элементов в зависимости от ширины первого
		function changeSize(){
			var firstelement_width = $("#firstelement").width();
				console.log(firstelement_width);

			if(firstelement_width < 300){
				//$(".element").css({"width": "60%", "padding-bottom": "60%", "margin": "75px 0px"});
				$( "#next").unbind( "click" );
				$( "#next" ).click(function(){
					changeStyle();
				});
			}
			else{
				//$(".element").css({"width": "25%", "padding-bottom": "25%","margin": "75px 0px"});
				$( "#next").unbind( "click" );
				$( "#next" ).click(function(){
					videoIndex = styleIndex;
					playNext();
					changeStyle();
				});
			}

		}
	/*	$(document).ready(function(){
			changeSize();
		});
		$(window).resize(function(){
			changeSize();
		});
		*/
		//воспроизводим следующее и ставим на паузу предыдущее видео
		//при нажатии на кнопку next
		function playNext(){
			jQuery.each($("video"),function(i,elem){
				if(i == videoIndex){
					this.play();
				}
				else{
					this.pause();
				}
			});
				videoIndex++;
				if(videoIndex == $("video").length){
					videoIndex = 0;
				}
		}
		
		//смена стиля элемента при нажатии на кнопку next
		function changeStyle(){
			$(".element").each(function(i,elem){
				if(i == styleIndex){	
					if($(this).hasClass('rhombus')){
						$(this).removeClass('rhombus').addClass('circle');
						$(this).children().css('transform', ' rotate(0) scale(1)' );
					} 
					else if($(this).hasClass('circle')) {
						$(this).removeClass('circle').addClass('square');
					} 
					else if($(this).hasClass('square')) {
						$(this).removeClass('square').addClass('rhombus');
						$(this).children().css('transform', 'rotate(-45deg) scale(1.4)' );
					}
				}
			});
			styleIndex++;
			if(styleIndex == $(".element").length){
				styleIndex = 0;
				}
		}
		
		//проверка на то, виден ли элемент на экране
		function isIntoView(elem) { 
			if(!$(elem).length) return false; // element not found
			var docViewTop = $(window).scrollTop();
			var docViewBottom = docViewTop + $(window).height();
			var elemTop = $(elem).offset().top;
			var elemBottom = elemTop + $(elem).height();
			return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
		}
		
		//автоматическое воспроизведение видео, если оно полностью находится во вьюпорте
		$(window).scroll(function(){
			jQuery.each($("video"),function(){
				if(isIntoView(this))
					this.play();
				else
					this.pause();
			});
		});