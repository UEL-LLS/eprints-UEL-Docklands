$c->{docklands}{adminscript} = <<END;
var j = jQuery.noConflict();

j(document).ready(function () {
        //j('#ep_phraseedit_docklands_btn_radius').click(previewCSS);
        j('.docklands_admin_widget input[type="button"][value="Preview"]').click(previewCSS);
});

function previewCSS() {
        //var value = j(this).parent().parent().children('form').children('textarea').val();
        var css = j(this).data("css");
        css = css.slice(10);
        var value = j('#ep_phraseedit_docklands_'+css).children('textarea').val();
        alert("data: " + css + " value: " + value);
        switch (css)
        {
                        case "border_radius":
                        //alert(value);
                        j(".border").css('border-radius', value+'px');
                        break;

                        case "border_thick":
                        j(".border").css('border-width', value+'px');
                        break;

                        case "shadows":
                        //alert(css);
                        j(".shadow").css('box-shadow', '0 0 '+value+'px rgba(0, 0, 0, 0.2)');
                        break;

                        case "colour_1":
                        //alert(css);
                        j(".btn-docklands, h1").css('background-color', '#'+value);
			j(".ep_tm_pagetitle").css('background-color', '#'+value);
			colour1 = value;
                        break;

                        case "colour_2":
                        //alert(css+" "+value);
                        j(".btn-docklands").mouseover(function() {
                                j(this).css('background-color', '#'+value);
                        });
                        j(".btn-docklands").mouseout(function() {
				if (colour1){
					j(this).css('background-color', '#'+colour1);
				}else{
					j(this).css('background-color', '');
				}
		
                        });
                        break;

                        case "btn_radius":
                        j(".nav-pills li a, #search_box input, .btn-docklands").css('border-radius', value+'px');
                        break;
        }
}
END

$c->{docklands_default_css} = <<END;

.btn-docklands {
                background-color: #<epc:phrase ref="docklands_colour_1"/>;
                color: #fff;
                border-radius: '<epc:phrase ref="docklands_btn_radius"/>'px;//!important;
        }

END
