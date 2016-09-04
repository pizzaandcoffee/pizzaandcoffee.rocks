//------------------------------------------------------------------------------
// Modules
//------------------------------------------------------------------------------
var githubRepos = (function($, w, undefined) {

    var url = "https://api.github.com/users/pizzaandcoffee/repos";

    return {
        run: function(handler) {
            $.getJSON(url, function(data){
                handler(data);
            });
        }
    };
}(jQuery, window));


//------------------------------------------------------------------------------
// Script
//------------------------------------------------------------------------------
$( document ).ready(function() {
    console.log("ahrg");
    githubRepos.run(function(data) {
        console.log(data[0].id);
        for (var i = 0; i < data.length; i++) {
            if (!data[i].fork) {
                var old = $("#projectlist").html();
                $("#projectlist").html(old + "<li>" + data[i].name + "</li>");
            }
        }
    })
});

//------------------------------------------------------------------------------
// Scroll thingy
//------------------------------------------------------------------------------
$(document).on('click', 'a[href^="#"]', function(e) {
	var id = $(this).attr('href');
	var $id = $(id);
	if ($id.length === 0) {
		return;
	}
	e.preventDefault();
	var pos = $(id).offset().top;
	$('body, html').animate({scrollTop: pos});
});
