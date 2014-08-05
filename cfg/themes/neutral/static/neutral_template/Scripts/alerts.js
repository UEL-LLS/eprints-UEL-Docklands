/**************************
 Script to switch eprints 
 style for bootstrap style 
 of alerts  
***************************/
var j = jQuery.noConflict();

j(document).ready(function () {

	//replacing EPrints alerts with standard bootstart alerts	
	j('.ep_msg_warning_content').addClass('bg-warning').removeClass('ep_msg_warning_content');
	j('.ep_msg_error_content').addClass('bg-danger').removeClass('ep_msg_error_content');

});
