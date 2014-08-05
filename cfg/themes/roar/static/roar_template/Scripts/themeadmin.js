/**************************

***************************/
var j = jQuery.noConflict();

j(document).ready(function () {

	//Theme Descriptions
	var desc = j('#theme_select option:selected').data('description');
	j('#theme_description').html("<p>"+desc+"</p>");	
	j( "#theme_select" ).change(function() {
		var desc = j('#theme_select option:selected').data('description');
		j('#theme_description').html("<p>"+desc+"</p>");
	});

	j('.ep_phraseedit_widget').click(function() {
		j('.docklands_admin_widget form').addClass('row');
		j('.docklands_admin_widget form textarea').addClass('col-md-12');
		j(':not(#docklands_theme).docklands_admin_widget form input').addClass('col-md-3');
	});
});
