/**************************
 Script to add class 
"table" to eprints tables, 
so bootstap can style them  
***************************/
var j = jQuery.noConflict();

j(document).ready(function () {

	//better tables. Cant really apply to all tables as this breaks stuff (eprints LOVES tables), so add tables to be styled by bootstart to the tables selector. 
	var tables = j('table.ep_columns, #ep_phraseedit_table');
	tables.addClass('table');

});
