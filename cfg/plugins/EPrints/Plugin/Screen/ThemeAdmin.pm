package EPrints::Plugin::Screen::ThemeAdmin;

use EPrints::Plugin::Screen;

@ISA = ( 'EPrints::Plugin::Screen' );


use Data::Dumper;
use File::Slurp;
use EPrints::Plugin::Screen::Admin::Phrases;
#use feature qw(switch say);
use Switch;
use strict;
use warnings;
sub new 
{
	my( $class, %params ) = @_;
	my $self = $class->SUPER::new(%params);


	$self->{actions}= [qw/ update_theme reload_repo reload_page /];

	$self->{priv} = undef;
	$self->{appears} = [
		{ 
			place => "admin_actions_config",
			position => 2800, 
		},
	];
	return $self;
}

sub can_be_viewed
{
	my( $self ) = @_;
	return $self->allow( "config/edit/perl" );
}


sub get_themes
{
	my( $self ) = @_;
	my $session = $self->{session};
	my @themes;
	my %theme_desc;
        my $dir = $session->config( "config_path" )."/themes/";
	my $description = "description";
    	opendir(DIR, $dir) or die $!;

    	while (my $file = readdir(DIR)) {

        	# Use a regular expression to ignore files beginning with a period
        	next if ($file =~ m/^\./);
		push (@themes, $file);
		#push (%themes, $file);
        	#print "$file\n";

    	}
    	closedir(DIR);
       
        foreach my $theme ( @themes ){
		my $dir = $session->config( "config_path" )."/themes/$theme/";
    		opendir(DIR, $dir) or die $!;
		while (my $file =readdir(DIR)){
			# We only want files
        		next unless (-f "$dir/$file");

        		# Use a regular expression to find files ending in .txt
        		next unless ($file =~ m/\.txt$/);
			$file = $session->config( "config_path" )."/themes/$theme/$file";
			#print $file;
			$description = read_file($file);
			$theme_desc{$theme} = $description;
		#	push ( @{$theme_desc { $theme } }, $description );
		}
    		closedir(DIR);
	}
	#print Dumper(\%theme_desc); 
    	#return @themes; 
    	return %theme_desc; 
	#exit 0;

}

sub get_active_theme
{
	my ( $self ) = @_;
	my $repo = $self->{repository};
	my $active_theme = $repo->get_conf( "theme");
	#print "actiove theme: ".$active_theme;
	return $active_theme;
}
sub allow_update
{
    my( $self ) = @_;
    return 1; 
}
sub action_update
{
    my( $self ) = @_;
    # Do stuff

}
sub allow_update_theme 
{
   my( $self ) = @_;
   return 1; 
}
sub allow_reload_repo 
{
   my( $self ) = @_;
   return 1;
}
sub allow_reload_page
{
   my( $self ) = @_;
   return 1;
}


sub action_update_theme
{
	my ( $self ) = @_;
	my $session = $self->{session};
	my $theme = $session->param( 'theme_select' );
	my $dest = $session->config( "config_path" )."/cfg.d/xxxx_theme_admin.pl";
	my $names = "theme";
	#my $write = $session->config->write_config( $dest, [$names], [$theme] );
        #my $conf1 = "";
        my $conf1 = <<'END';
#
# Theme Admin Theme Loader
#
# this file is automatically generated when you change theme using the Theme Admin Screen
#

END
	my $conf2 = '$c->{theme} ="'.$theme.'"'.';';

	my $conf = join "", $conf1, $conf2;
	#print $conf;
        my $write = EPrints->system->write_config_file( $dest, $conf );
	
	my @files = <$dest.2*>;
	if (@files) {
	 unlink @files or warn "Problem unlinking @files: $!";
	} 	

	$session->reload_config;
	#$session->{screenid} = "Admin";
	#$self->{processor}->{refresh};
}

sub action_reload_repo 
{
    	my( $self ) = @_;
	my $session = $self->{session};

	$session->reload_config;
}

sub action_reload_page
{
        my( $self ) = @_;
        my $session = $self->{session};

}

sub render
{
	
	my( $self ) = @_;

	my $session = $self->{session};
	my $repo = $self->{repository};

	#my @themes = &get_themes;
	my %themes = &get_themes;
	#print @themes;

	my $active_theme = &get_active_theme;
	
        #load the theme phrases
	my $file = $session->config( "config_path" )."/lang/".$session->get_lang->{id}."/phrases/docklands.xml";

	my @sections = ("colours","buttons","shadows","borders");

	# colours	
	my $dc1_id = "docklands_colour_1";	
	my $dc2_id = "docklands_colour_2";	
	my @phrasesColours = ($dc1_id,$dc2_id);

	# button border radius
	my $btnr_id = "docklands_btn_radius";
	my @phrasesButtons = ($btnr_id); 

	# shadow class
	my $shadow_bool_id = "docklands_shadows";
	my @phrasesShadows = ($shadow_bool_id);

	#border class
	my $border_thick_id = "docklands_border_thick";
	my $border_radius_id = "docklands_border_radius";
	my @phrasesBorders = ($border_thick_id, $border_radius_id);
 

	# Create empty document
	my $page = $session->make_doc_fragment();
	my $container = $session->make_element( 'div', id=>"themeAdmin",class=>"container-fluid");
	
	my $intro = $session->make_element( 'div', id=>"themeAdminDescription", class=>"col-md-12 col-sm-12 col-xs-12");
	$intro->appendChild($self->html_phrase( "intro" ));
	$container->appendChild($intro);		

	#helper elements
	my $hr = $session->make_element( 'hr' );
	
	#theme selection
	my $xhtml = $repo->xhtml;
	my $theme_div = $session->make_element( 'div', id=>"docklands_theme", class=>"docklands_admin_widget col-md-12 container-fluid");
	$theme_div->appendChild($hr);
	my $h3 = $session->make_element( 'h3');
	$h3->appendChild($session->make_text('Select Theme'));
	$theme_div->appendChild($h3);
	my $theme_phrase = $session->make_element( 'div', id=>"theme_select_description", class=>"col-md-12 col-sm-12 col-xs-12");
	$theme_phrase->appendChild($self->html_phrase( "theme_selection" ));
	$theme_div->appendChild($theme_phrase);
	my $theme_selection_div = $session->make_element( 'div', id=>"theme_select", class=>"col-md-4 col-md-offset-2");
	#my $theme_form = $xhtml->form( "post"  );# [, $action] )
	my $theme_form = $session->make_element( 'form', id=>"theme_select_form", class=>"form-horizontal", method=>"post");
	my $select_div = $session->make_element( 'div', class=>"form-group");
	my $select = $session->make_element( 'select', name=>"theme_select", class=>"form-control", id=>"theme_select" );
        #foreach my $theme ( @themes )
        while ((my $theme, my $description) = each(%themes))
        {
		my $selected = "";
		my $option;
		if ($active_theme eq $theme) {
        		$option = $session->make_element( 'option', id=>"op_$theme", value=>$theme, "data-description"=>$description, selected=>"selected"  );
		} else {
        		$option = $session->make_element( 'option', id=>"op_$theme", value=>$theme, "data-description"=>$description );
		}
		$option->appendChild( $session->make_text(ucfirst($theme)));
        	$select->appendChild($option);
        }
	my %buttons = (
                    update_theme   => $self->phrase("update_theme"),#update theme",
                    _order   => [ "update_theme" ],
                    _class   => "ep_form_button_bar"
	          );
	$select_div->appendChild($select);
	$theme_form->appendChild($select_div);
	$theme_form->appendChild($session->render_action_buttons( %buttons ));
	$theme_form->appendChild($session->render_hidden_field( "screen", "ThemeAdmin"));
	$theme_selection_div->appendChild($theme_form);
	$theme_div->appendChild($theme_selection_div);
	my $theme_description = $session->make_element( 'div', id=>"theme_description", class=>"col-md-5 col-md-offset-1");
	$theme_div->appendChild($theme_description);
	$container->appendChild($theme_div);




	# Sections of the theme
	foreach my $section ( @sections )
	{
		my $divSection = $session->make_element( 'div', id=>"docklands_$section",class=>"container-fluid docklands_admin_widget col-md-12");
		my $h3 = $session->make_element( "h3" );
		$h3->appendChild( $session->make_text(ucfirst($section)));
		
		#my $table = $session->make_element( "table", id=>"ep_phraseedit_table_$section",class=>"table table-condensed" );
		my $table = $session->make_element( "div", id=>"ep_phraseedit_table_$section",class=>"col-md-12" );
		my $headerRow = $session->make_element( "div", class=>"row");
		
		my $heading = $session->make_element( "div", class=>"col-md-3" );
		my $strong_heading = $session->make_element("strong");
		$strong_heading->appendChild( $session->make_text("Field") );
		$heading->appendChild( $strong_heading );
		$headerRow->appendChild($heading);
		
		$heading = $session->make_element( "div", class=>"col-md-4" );
		$strong_heading = $session->make_element("strong");
		$strong_heading->appendChild( $session->make_text("Value"));
		$heading->appendChild($strong_heading);
		$headerRow->appendChild($heading);
		
		$heading = $session->make_element( "div", class=>"col-md-3" );
		$headerRow->appendChild($heading);	
                
		$table->appendChild($headerRow);
	
				
	
		my $tr = $session->make_element( "div", class=>"col-md-3iX" );
		my $rows = $session->make_doc_fragment;
		my @phrases;		
		switch ($section){
			case "colours" {@phrases = @phrasesColours;}
			case "buttons" {@phrases = @phrasesButtons;}
			case "shadows" {@phrases = @phrasesShadows;}
			case "borders" {@phrases = @phrasesBorders;}
		}
		
		foreach my $phraseid ( @phrases )
        	{
	                my $info = $session->get_lang->get_phrase_info( $phraseid, $session );
			$rows->appendChild( $self->render_row(
                                {
                                        phraseid => $phraseid,
                                        xml => $info->{xml},
                                        langid  => $info->{langid},
                                },
                               $section 
                        ) );
        
		}
		$table->appendChild($rows);
			
		$divSection->appendChild($h3);
		$divSection->appendChild($table);
		$container->appendChild($divSection);
	};

	my $update_div = $session->make_element('div', id=>'update_div', class=>"col-md-12 container-fluid");
	my $update_div_button = $session->make_element('div', id=>'update_div_button', class=>"col-md-4 col-md-offset-4");
        my $update_form = $session->make_element( 'form', id=>"update_form", class=>"form-horizontal", method=>"post");
	%buttons = (
                    reload_repo   => $self->phrase("reload_config"),
                    reload_page   => "Reset Changes",#$self->html_phrase("reload_config"),
                    _order   => [ "reload_repo","reload_page" ],
                    _class   => "ep_form_button_bar"
                  );
        $update_form->appendChild($session->render_action_buttons( %buttons ));
        $update_form->appendChild($session->render_hidden_field( "screen", "ThemeAdmin"));
	$update_div_button->appendChild($update_form);
	$update_div->appendChild($update_div_button);
	$container->appendChild($update_div);
	

	my $scripts = $session->make_doc_fragment;

	my $ep_save_phrase = EPrints::Utils::js_string( $self->phrase( "save" ) );
        my $ep_reset_phrase = EPrints::Utils::js_string( $self->phrase( "reset" ) );
        my $ep_cancel_phrase = EPrints::Utils::js_string( $self->phrase( "cancel" ) );
	
	$scripts->appendChild( $session->make_javascript( <<EOJ ) );
var ep_phraseedit_phrases = {
	save: $ep_save_phrase,
	reset: $ep_reset_phrase,
	cancel: $ep_cancel_phrase
};
EOJ
        $container->appendChild( $scripts );

	$page->appendChild($container);

	my $script;
	$script = $session->config( "docklands","adminscript" );
	
	my $adminScript = $session->make_element("script");
	$adminScript->appendChild($session->make_text($script));
	
	$page->appendChild($adminScript);
	
	return $page;
}

sub render_row
{
	my( $self, $phrase, $type ) = @_;

	my $session = $self->{session};
	my $phraseid = $phrase->{phraseid};
	my $src = $phrase->{src};
	my $xml = $phrase->{xml};
=pod
	
	my %seen = ($phrase->{phraseid} => 1);
	while($xml->can( "hasAttribute" ) && $xml->hasAttribute( "ref" ))
	{
		my $info = $session->get_lang->get_phrase_info( $xml->getAttribute( "ref" ), $session );
		last if !defined $info;
		last if $seen{$info->{phraseid}};
		$seen{$info->{phraseid}} = 1;
		$xml = $info->{xml};
	}
=cut
	my $string = "";
	foreach my $node ($xml->childNodes)
	{
		$string .= EPrints::XML::to_string( $node );
	}

	my( $tr, $td, $div );

	$tr = $session->make_element( "div", class => "ep_type_$type row" );

	$td = $session->make_element( "div", class=>"col-md-3" );
	$tr->appendChild( $td );
	$td->appendChild( $session->make_text( $phraseid ) );

	#$td = $session->make_element( "td" );
	#$tr->appendChild( $td );

	$td = $session->make_element( "div", class=>"col-md-4" );	
	$div = $session->make_element( "div", id => "ep_phraseedit_$phraseid", class => "ep_phraseedit_widget", onclick => "ep_phraseedit_edit(this, ep_phraseedit_phrases);" );
	if( $xml ne $phrase->{xml} )
        {
                $div->setAttribute( class => "ep_phraseedit_widget ep_phraseedit_ref" );
        }
	$div->appendChild( $session->make_text( $string ) );
        $td->appendChild( $div );
	$tr->appendChild( $td );
	
	$td = $session->make_element( "div" );	
	if ($type eq "colours"){
		# Colour picker html5 thing
		my $colour = $session->make_text( $string );
		my $colourBlock = $session->make_element( "div", style=>"display: inline-block; width: 1em;height:1em;margin-right:1em;background-color:#$colour" );
		$td->appendChild( $colourBlock );
	}
	
	my $previewButton = $session->make_element('input', type=>"button", value=>"Preview", "data-css"=>$phraseid);
	$td->appendChild( $previewButton );
		
		

	#$div->appendChild( $session->make_text( $string ) );

	#$td = $session->make_element( "td" );
	$tr->appendChild( $td );

	return $tr;
}
