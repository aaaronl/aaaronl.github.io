$(document).ready(function() {
	
	// fade out loader image
	$("#loaderInner").fadeOut(); 
	$("#loader").delay(800).fadeOut("slow");
	
	// Highlight the top nav as scrolling occurs
	$("body").scrollspy({target: ".navbar-fixed-top"});
	
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
	    $('a.page-scroll').bind('click', function(event) {
	        var $anchor = $(this);
	        $('html, body').stop().animate({
	            scrollTop: $($anchor.attr('href')).offset().top
	        }, 1500, 'easeInOutExpo');
	        event.preventDefault();
	    });
	});
	
	// Closes the Responsive Menu on Menu Item Click
	$(".navbar-collapse ul li a").click(function() {
	    $(".navbar-toggle:visible").click();
	});
	
	// Skills animation
	var skillIndex = 0;
	$(document).scroll(function(){
		var top = $('.skills').height()-$(window).scrollTop();
		if(top<-450){
			if(skillIndex==0){	
				$('.chart').easyPieChart({
					easing: 'easeOutBounce',
					onStep: function(from, to, percent) {
						$(this.el).find('.percent').text(Math.round(percent));
					}
				});
				
			}
			skillIndex++;
		}
	});

});