/**
 * @name		jQuery touchTouch plugin
 * @author		Martin Angelov
 * @version 	1.0
 * @url			http://tutorialzine.com/2012/04/mobile-touch-gallery/
 * @license		MIT License
 */

(function(){

	/* Private variables */

	var overlay = $('<div id="galleryOverlay">'),
		slider = $('<div id="gallerySlider">'),
		prevArrow = $('<a id="prevArrow"></a>'),
		nextArrow = $('<a id="nextArrow"></a>'),
		deleteArrow = $('<a id="deleteArrow"></a>'),
		overlayVisible = false;


	/* Creating the plugin */

	$.fn.touchTouch = function(array){

		var placeholders = $([]), //додавання, формувати список вручну з папки img
			index = 0;
			//items = this;

		// Appending the markup to the page
		overlay.hide().appendTo('body');
		slider.appendTo(overlay);

		// Creating a placeholder for each image
		//array.each(function(){//items
			for(var i=0; i<array.length; i++)
			placeholders = placeholders.add($('<div class="placeholder">')); // переробити на array
		//});

		// Hide the gallery if the background is touched / clicked
		slider.append(placeholders).on('click',function(e){

			if(!$(e.target).is('a'))
				hideOverlay();
		});

		// Listen for touch events on the body and check if they
		// originated in #gallerySlider img - the images in the slider.
		$('body').on('touchstart', '#gallerySlider img', function(e){

			var touch = e.originalEvent,
				startX = touch.changedTouches[0].pageX;

			slider.on('touchmove',function(e){

				e.preventDefault();

				touch = e.originalEvent.touches[0] ||
						e.originalEvent.changedTouches[0];

				if(touch.pageX - startX > 10){

					slider.off('touchmove');
					showPrevious();
				}

				else if (touch.pageX - startX < -10){

					slider.off('touchmove');
					showNext();
				}
			});

			// Return false to prevent image
			// highlighting on Android
			return false;

		}).on('touchend',function(){

			slider.off('touchmove');

		});

		// Listening for clicks on the thumbnails
		//items.on('click', function(e){
		$('#galery0').on('click', function(e){ //items
			if(!empty_galery){

			e.preventDefault();

			/*var $this = $(this),
				galleryName,
				selectorType,
				$closestGallery = $this.parent().closest('[data-gallery]');*/

			// Find gallery name and change items object to only have
			// that gallery

			//If gallery name given to each item
			/*if ($this.attr('data-gallery')) {

				galleryName = $this.attr('data-gallery');
				selectorType = 'item';

			//If gallery name given to some ancestor
			} else if ($closestGallery.length) {

				galleryName = $closestGallery.attr('data-gallery');
				selectorType = 'ancestor';

			}*/

			//These statements kept seperate in case elements have data-gallery on both
			//items and ancestor. Ancestor will always win because of above statments.
			/*if (galleryName && selectorType == 'item') {

				items = $('[data-gallery='+galleryName+']');

			} else if (galleryName && selectorType == 'ancestor') {

				//Filter to check if item has an ancestory with data-gallery attribute
				items = items.filter(function(){

           			return $(this).parent().closest('[data-gallery]').length;

           		});

			}*/

			// Find the position of this image
			// in the collection
			//index = 0;//items.index(this);
			showOverlay(index);
			showImage(index);

			// Preload the next image
			preload(index+1);

			// Preload the previous
			//preload(index-1);
		}
		});

		// If the browser does not have support
		// for touch, display the arrows
		if ( !("ontouchstart" in window) ){
			overlay.append(prevArrow).append(nextArrow);

			prevArrow.click(function(e){
				e.preventDefault();
				showPrevious();
			});

			nextArrow.click(function(e){
				e.preventDefault();
				showNext();
			});
			if(admin) overlay.append(deleteArrow);
			//a function to delete the image from site
			deleteArrow.click(function(e){
				$.ajax({
						url:'/aviamap/PHP/delete_image.php?name=' + array[index],
						success: function(){								
								array.splice(index-1,1);
								alert("Photo deleted");
								$("touchtouch" + index).remove();
								if(index+1 < array.length)showNext();							
								else showPrevious();								
						}
				});
			});
		}

		// Listen for arrow keys
		$(window).bind('keydown', function(e){
			if (e.keyCode == 37)
				showPrevious();

			else if (e.keyCode==39)
				showNext();

			else if (e.keyCode==27) //esc
				hideOverlay();
		});

		/* Private functions */


		function showOverlay(index){
			// If the overlay is already shown, exit
			if (overlayVisible)
				return false;

			// Show the overlay
			overlay.show();

			setTimeout(function(){
				// Trigger the opacity CSS transition
				overlay.addClass('visible');
			}, 100);

			// Move the slider to the correct image
			offsetSlider(index);

			// Raise the visible flag
			overlayVisible = true;
		}

		function hideOverlay(){

			// If the overlay is not shown, exit
			if(!overlayVisible)
				return false;

			// Hide the overlay
			overlay.hide().removeClass('visible');
			overlayVisible = false;

			//Clear preloaded items
			//$('.placeholder').empty();
		}

		function offsetSlider(index){
			// This will trigger a smooth css transition
			slider.css('left',(-index*100)+'%');
		}

		// Preload an image by its index in the items array
		function preload(index){
			setTimeout(function(){
				showImage(index);
			}, 1000);
		}

		// Show image in the slider
		function showImage(index){
			// If the index is outside the bonds of the array
			if(index < 0 || index >= array.length)
				return false;

			// Call the load function with the href attribute of the item
			loadImage(array[index], function(){ //hitems.eq(index).attr('src')
				placeholders.eq(index).html(this);
			});
		}

		// Load the image and execute a callback function.
		// Returns a jQuery object

		function loadImage(src, callback){

			var img = $('<img>').on('load', function(){
				callback.call(img);
			});

			img.attr('src',src);
			img.attr('id',"touchtouch" + index);
		}

		function showNext(){

			// If this is not the last image
			if(index+1 < array.length){
				index++;
				offsetSlider(index);
				preload(index+1);
			}

			else{
				// Trigger the spring animation
				slider.addClass('rightSpring');
				setTimeout(function(){
					slider.removeClass('rightSpring');
				},500);
			}
		}

		function showPrevious(){

			// If this is not the first image
			if(index>0){
				index--;
				offsetSlider(index);
				preload(index-1);
			}

			else{
				// Trigger the spring animation
				slider.addClass('leftSpring');
				setTimeout(function(){
					slider.removeClass('leftSpring');
				},500);
			}
		}
	};
})(jQuery);