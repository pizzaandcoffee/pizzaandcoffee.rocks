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

//$( document ).ready(function() {
//    console.log("ahrg");
//    githubRepos.run(function(data) {
//        console.log(data[0].id);
//        for (var i = 0; i < data.length; i++) {
//            if (!data[i].fork) {
//                var old = $("#projectlist").html();
//                $("#projectlist").html(old + "<li>" + data[i].name + "</li>");
//            }
//        }
//    })
//});

$( document ).ready(function() {
	githubRepos.run(function(data) {
		var modalhtml = "";
		var j = 0;
		for (var i = 0; i < data.length; i++) {
			if (!data[i].fork) {
				modalhtml = modalhtml + '<li><a id="demo' + i + '" href="#repo' + i + 'Modal">' + data[i].name + '</a><div id="repo' + i + 'Modal"><div class="close-repo' + i + 'Modal">CLOSE MODAL</div><div class="modal-content">' + data[i].git_url + '</div></div></li>';
			}
			j = i;
		}
		$("#projectlist").html(modalhtml);
		for (var i = 0; i <= j; i++) {                    
			$("#demo" + i).animatedModal({modalTarget: "repo" + i + "Modal"});
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
