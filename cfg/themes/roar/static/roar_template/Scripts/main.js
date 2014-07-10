j(document).ready(function () {
        //stuff for the summary page

                //add the + to the download panels
                //j('.panel-collapse').parent('.panel').children('.panel-heading').children('.panel-title').children('a').append('<span class="glyphicon glyphicon-plus"></span>');

                //replace the img icons with nice font awesome ones
                j('.ep_doc_icon[src$="fileicons/application_msword.png"]').replaceWith('<i class="fa fa-file-word-o fa-5x"></i>');
                j('.ep_doc_icon[src$="fileicons/application_pdf.png"]').replaceWith('<i class="fa fa-file-pdf-o fa-5x"></i>');
                j('.ep_doc_icon[src$="fileicons/text.png"]').replaceWith('<i class="fa fa-file-text-o fa-5x"></i>');
                j('.ep_doc_icon[src$="fileicons/other.png"]').replaceWith('<i class="fa fa-file-o fa-5x"></i>');
                j('.ep_doc_icon[src$="fileicons/unknown.png"]').replaceWith('<i class="fa fa-file-o fa-5x"></i>');
                j('.ep_doc_icon[src$="fileicons/archive.png"]').replaceWith('<i class="fa fa-file-zip-o fa-5x"></i>');

                // Using  clipbpar thing
                ZeroClipboard.config( { swfPath: "http://cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.1.3/ZeroClipboard.swf"});
                var client = new ZeroClipboard(j(".btn-clipboard"));

                //j('#ep_phraseedit_docklands_btn_radius').click(previewCSS);
                j('.docklands_admin_widget input[type="button"][value="Preview"]').click(previewCSS);


        });
