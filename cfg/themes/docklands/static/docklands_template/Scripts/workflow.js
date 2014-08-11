/**************************
 Script to add make the 
 eprints workflow more 
 bootstrappy 
***************************/
var j = jQuery.noConflict();

j(document).ready(function () {

	//Make panels in workflow stages
        j('.ep_form_field_input .ep_sr_component').addClass('panel panel-default').removeClass('ep_sr_compenent');
        j('.ep_form_field_input .ep_sr_title_bar').addClass('panel-heading').removeClass('ep_sr_title_bar');
        j('.ep_form_field_input .ep_sr_content').addClass('panel-body').removeClass('ep_sr_content');
        //j('.panel .panel-body table.ep_form_input_grid').addClass('table');
        j('.panel table.table th').css('border','none');
        j('.panel table.table td.ep_form_input_grid_arrows').css('border-bottom','1px solid #ddd');
});
