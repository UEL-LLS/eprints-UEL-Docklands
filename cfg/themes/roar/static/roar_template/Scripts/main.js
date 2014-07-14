j(document).ready(function () {
        //stuff for the summary page

	//add the + to the download panels
	//j('.panel-collapse').parent('.panel').children('.panel-heading').children('.panel-title').children('a').append('<span class="glyphicon glyphicon-plus"></span>');

	//replace the img icons with nice font awesome ones
	j('.panel-docklands-prime .ep_doc_icon[src$="fileicons/application_msword.png"]').replaceWith('<i class="fa fa-file-word-o fa-5x"></i>');
	j('.ep_doc_icon[src$="fileicons/application_pdf.png"]').replaceWith('<i class="fa fa-file-pdf-o fa-5x"></i>');
	j('.ep_doc_icon[src$="fileicons/text.png"]').replaceWith('<i class="ep_doc_icon fa fa-file-text-o fa-5x"></i>');
	j('.panel-docklands-prime .ep_doc_icon[src$="fileicons/text.png"]').removeClass('fa-5x').addClass('fa-3x');
	j('.ep_doc_icon[src$="fileicons/other.png"]').replaceWith('<i class="fa fa-file-o fa-5x"></i>');
	j('.ep_doc_icon[src$="fileicons/unknown.png"]').replaceWith('<i class="fa fa-file-o fa-5x"></i>');
	j('.ep_doc_icon[src$="fileicons/archive.png"]').replaceWith('<i class="fa fa-file-zip-o fa-5x"></i>');
	j('.ep_doc_icon[src$="fileicons/image.png"]').replaceWith('<i class="fa fa-file-image-o fa-5x"></i>');

	// Using  clipboard thing
	ZeroClipboard.config( { swfPath: "http://cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.1.3/ZeroClipboard.swf"});
	var client = new ZeroClipboard(j(".btn-clipboard"));

 	//j('#ep_phraseedit_docklands_btn_radius').click(previewCSS);
	j('.docklands_admin_widget input[type="button"][value="Preview"]').click(previewCSS);

	//Turn the request a copy link into a button
	j('a:contains("Request a copy")').addClass('btn btn-docklands-prime');


	//Add form classes in Request a copy page
	j('#requester_email, #reason').removeClass().addClass('form-control');
	j('#requester_email, #reason').closest('table').removeClass().addClass('table')
	j('#requester_email, #reason').closest('td').css('border-top','none');


	//Turn the latest_tool into a nice list of divs
	j('table.ep_latest_tool_list').replaceWith( j('table').html()
   		.replace(/<tbody/gi, "<ul class='list-unstyled' id='latest_tool'")
   		.replace(/<tr/gi, "<li")
   		.replace(/<\/tr>/gi, "</li>")
   		.replace(/<td/gi, "<span")
   		.replace(/<\/td>/gi, "</span>")
   		.replace(/<\/tbody/gi, "<\/ul")
	);
	j('.ep_search_result').addClass('panel panel-card row');
	j('.ep_search_result span').css('padding-left','0');
	
	//j('.panel-card').children('span').css('padding-left','0');
	j('.panel-card span').css('padding-left','0');
        j('.panel-card > span:nth-child(1)').addClass('col-md-1');
        j('.panel-card > span:nth-child(2)').addClass('col-md-8');
        j('.panel-card > span:nth-child(3)').addClass('col-md-3').attr('align','right');
});

if (window.top!=window.self)
        {
                j('header, #repo_search, nav, #add_item,h1, footer, .modal-button').remove();
                j('#page').children('.shadow').removeClass('shadow');

        }
