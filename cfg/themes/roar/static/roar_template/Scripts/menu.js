/**************************
 Script to change eprint  
 login menu to bootstap 
 nav-stacked
***************************/
var j = jQuery.noConflict();

j(document).ready(function () {

	//left hand side menu. Addes the classes needed for bootstrap to style the menu 
	j('#ep_tm_menu_tools, .ep_tm_key_tools').addClass('nav nav-pills nav-stacked');
	//menu manipluation and collapse stuff
	j('.ep_tm_key_tools').removeClass('ep_tm_key_tools').addClass('navbar-collapse collapse').attr('id','ep_menu');
	
	j('nav #ep_menu li').wrapInner('<a style="cursor:default;color:#555 " href="#"></a>');

});
