/**************************
 Script to change eprint  
 login menu to bootstap 
 nav-stacked
***************************/
var j = jQuery.noConflict();

j(document).ready(function () {

	//left hand side menu. Addes the classes needed for bootstrap to style the menu 
	j('#ep_tm_menu_tools, .ep_tm_key_tools').addClass('nav navbar-nav');

	j('#ep_tm_menu_tools li:first').wrapInner('<a href="#" style="cursor:default" />');
});
