
// Put JQuery into no confilct mode. j now = jQuery. This avoids *most* confilcs with prototype. 
var j = jQuery.noConflict();

j(document).ready(function () {

	/*************************
	  General Bootstrap stuff
	**************************/

        //left hand side menu. Addes the classes needed for bootstrap to style the menu 
	j('#ep_tm_menu_tools, .ep_tm_key_tools').addClass('nav nav-pills nav-stacked');


	//all the tabs that we want to change to bootstrap style
	var tabs = j('#ep_tabs_tabs, #ep_admin_tabs_tabs, #ep_workflow_views_tabs, #ep_eprint_view_tabs,#ep_eprint_views_tabs #_tabs, .ep_eprint_views_tabs');
	var selected_tabs = j('.ep_tab_selected');
	var li_tabs = j('#ep_tabs_tabs li, #ep_admin_tabs_tabs li, #ep_workflow_views_tabs li, #ep_eprint_view_tabs li, #_tabs li');

        
	//remove the eprint classes and add the bootstrap classes
	tabs.removeClass('ep_tab_bar').addClass('nav nav-tabs');
	selected_tabs.addClass('active');
	li_tabs.click(function() {
		li_tabs.removeClass('active');
		j(this).removeClass('ep_tab_selected').addClass('active');
	});


	//pretty buttons
	var buttons_1 = j('.ep_action_list .ep_form_action_button, .ep_form_action_button, .ep_blister_node_selected, .ep_form_internal_button');
	var buttons_2 = j('.ep_blister_node');
	buttons_1.addClass('btn btn-docklands-prime').removeClass('ep_form_action_button');
	buttons_2.addClass('btn btn-docklands').removeClass('ep_form_action_button');


	//Nice search swish. On active, the classes change. The transitions are done from the CSS. 
	j('#search_box input').focus( function(){
		j( this ).parent().removeClass('col-md-2').addClass('col-md-10');
		j('#search_button').removeClass('hidden-lg hidden-md hidden-sm');
	});
	j('#search_box input').focusout( function(){
		j( this ).parent().removeClass('col-md-10').addClass('col-md-2');
		j('#search_button').addClass('hidden-lg hidden-md hidden-sm');
	});


	//pretty forms. Just adds smore classes to make forms look nicer in bootstrap
	var formbar = j('.ep_form_button_bar');
	formbar.addClass('form-group').removeClass('ep_form_button_bar');
	j('#theme_select_form input.btn').addClass('col-md-12');


	//think this is just for the workflow stages, but might be for others. 
        var blister_bar = j('.ep_blister_bar');
        blister_bar.addClass('form-group');


	//better tables. Cant really apply to all tables as this breaks stuff (eprints LOVES tables), so add tables to be styled by bootstart to the tables selector. 
	var tables = j('table.ep_columns, #ep_phraseedit_table');
	tables.addClass('table');

	
	//replacing EPrints alerts with standard bootstart alerts
	j('.ep_msg_warning_content').addClass('bg-warning').removeClass('ep_msg_warning_content');
	j('.ep_msg_error_content').addClass('bg-danger').removeClass('ep_msg_error_content');

	
	//Theme Descriptions. This is for the Docklands themes themselves. 
	var desc = j('#theme_select option:selected').data('description');
	j('#theme_description').html("<p>"+desc+"</p>");
	//when the selected theme changes, update the description
	j( "#theme_select" ).change(function() {
		var desc = j('#theme_select option:selected').data('description');
		j('#theme_description').html("<p>"+desc+"</p>");
	});


	//menu manipluation
	j('.ep_tm_key_tools').removeClass('ep_tm_key_tools').addClass('navbar-collapse collapse').attr('id','ep_menu');

	/***************************
         Stuff for the summary page
	****************************/

	//replace the img icons with nice font awesome ones
/*	j('.ep_doc_icon[src$="fileicons/application_msword.png"]').replaceWith('<i class="ep_doc_icon fa fa-file-word-o fa-5x"></i>');
	j('.ep_doc_icon[src$="fileicons/application_pdf.png"]').replaceWith('<i class="ep_doc_icon fa fa-file-pdf-o fa-5x"></i>');
	j('.ep_doc_icon[src$="fileicons/text.png"]').replaceWith('<i class="ep_doc_icon fa fa-file-text-o fa-5x"></i>');
	j('.ep_doc_icon[src$="fileicons/other.png"]').replaceWith('<i class="ep_doc_icon fa fa-file-o fa-5x"></i>');
	j('.ep_doc_icon[src$="fileicons/unknown.png"]').replaceWith('<i class="ep_doc_icon fa fa-file-o fa-5x"></i>');
	j('.ep_doc_icon[src$="fileicons/archive.png"]').replaceWith('<i class="ep_doc_icon fa fa-file-zip-o fa-5x"></i>');
	j('.ep_doc_icon[src$="fileicons/image.png"]').replaceWith('<i class="ep_doc_icon fa fa-file-image-o fa-5x"></i>');
*/	

	//replace external link span content with repo logo	
	j('.figshare').replaceWith('<span class="external-link-img figshare-img"></span>');
	j('.ukda').replaceWith('<span class="external-link-img ukda-img"></span>');
	j('.reshare').replaceWith('<span class="external-link-img reshare-img"></span>Reshare');
	j('.archaeology_ds').replaceWith('<span class="external-link-img archds-img"></span>');
	j('.nerc').replaceWith('<span class="external-link-img nerc-img"></span>');
	j('.dryad').replaceWith('<span class="external-link-img dryad-img"></span>');
	j('.other').replaceWith('<span class="external-other">Other</span>');

	// Using  clipboard thing
	ZeroClipboard.config( { swfPath: "http://cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.1.3/ZeroClipboard.swf"});
	var client = new ZeroClipboard(j(".btn-clipboard"));

 	//j('#ep_phraseedit_docklands_btn_radius').click(previewCSS);
	j('.docklands_admin_widget input[type="button"][value="Preview"]').click(previewCSS);

	//Turn the request a copy link into a button  & sort out View Details button from IRstats2
	j('a:contains("Request a copy")').addClass('btn btn-docklands-prime');
	j('#summary_statistics a').addClass('btn btn-docklands-prime pull-right');


	//Add form classes in Request a copy page
	j('#requester_email, #reason').removeClass().addClass('form-control');
	j('#requester_email, #reason').closest('table').removeClass().addClass('table')
	j('#requester_email, #reason').closest('td').css('border-top','none');


	//Turn the latest_tool into a nice list of divs
/*	j('table.ep_latest_tool_list').replaceWith( j('table').html()
   		.replace(/<tbody/gi, "<ul class='list-unstyled' id='latest_tool'")
   		.replace(/<tr/gi, "<li")
   		.replace(/<\/tr>/gi, "</li>")
   		.replace(/<td/gi, "<span")
   		.replace(/<\/td>/gi, "</span>")
   		.replace(/<\/tbody/gi, "<\/ul")
	);
	j('.ep_search_result').addClass('panel panel-card row');
	j('.ep_search_result span').css('padding-left','0');
*/	
	//j('.panel-card').children('span').css('padding-left','0');
	j('.panel-card span').css('padding-left','0');
        j('.panel-card > span:nth-child(1)').addClass('col-md-1');
        j('.panel-card > span:nth-child(2)').addClass('col-md-8');
        j('.panel-card > span:nth-child(3)').addClass('col-md-3').attr('align','right');


	//Make panels in workflow stages
	j('.ep_form_field_input .ep_sr_component').addClass('panel panel-default').removeClass('ep_sr_compenent');
	j('.ep_form_field_input .ep_sr_title_bar').addClass('panel-heading').removeClass('ep_sr_title_bar');
	j('.ep_form_field_input .ep_sr_content').addClass('panel-body').removeClass('ep_sr_content');
	//j('.panel .panel-body table.ep_form_input_grid').addClass('table');
	j('.panel table.table th').css('border','none');
	j('.panel table.table td.ep_form_input_grid_arrows').css('border-bottom','1px solid #ddd');

});


if (window.top!=window.self)
        {
                j('header, #repo_search, nav, #add_item,h1, footer, .modal-button').remove();
                j('#page').children('.shadow').removeClass('shadow');
                j('#page').removeClass('col-md-10 col-sm-10').addClass('col-md-12 col-sm-12');

        }
