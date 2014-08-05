/**************************
 Script to fix nav to 
 the top of the window
***************************/
var j = jQuery.noConflict();

j(document).ready(function () {

                j(window).scroll(function() {
                        if (j(this).scrollTop() > 51) {
                        	j('#ep_internal_nav').addClass('navbar-fixed-top').css("opacity","0.95");
			}else {
                        	j('#ep_internal_nav').removeClass('navbar-fixed-top').css("opacity","1");
			}
                });

});
