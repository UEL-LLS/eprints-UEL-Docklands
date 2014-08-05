/**************************
 Script to change size of  
 search box on ROAR &
 Data.uel (plus others)
***************************/
var j = jQuery.noConflict();

j(document).ready(function () {

//Nice search swish. On active, the classes change. The transitions are done from the CSS. 
        j('#search_box input').focus( function(){
                j( this ).parent().removeClass('col-md-2').addClass('col-md-10');
                j('#search_button').removeClass('hidden-lg hidden-md hidden-sm');
        });
        j('#search_box input').focusout( function(){
                j( this ).parent().removeClass('col-md-10').addClass('col-md-2');
                j('#search_button').addClass('hidden-lg hidden-md hidden-sm');
        });

});
