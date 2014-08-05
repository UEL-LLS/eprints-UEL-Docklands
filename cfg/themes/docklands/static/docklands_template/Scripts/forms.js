/**************************
 Script to style forms in 
 docklands themes
***************************/
var j = jQuery.noConflict();

j(document).ready(function () {

	var formbar = j('.ep_form_button_bar');
	formbar.addClass('form-group').removeClass('ep_form_button_bar');
	j('#theme_select_form input.btn').addClass('col-md-12');

});
