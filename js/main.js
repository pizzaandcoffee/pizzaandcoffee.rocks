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
// Functions
//------------------------------------------------------------------------------
//adds a ScrollyThingy to the links of the navbar
function setScrollyThingy() {
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
}

//------------------------------------------------------------------------------
// Script
//------------------------------------------------------------------------------
$( document ).ready(function() {
    setScrollyThingy();

    //generate the Project list and add Modals
	githubRepos.run(function(data) {
		var modalhtml = "";
		var projectCount = 0;
		for (var i = 0; i < data.length; i++) {
			if (!data[i].fork) {
                //god awful string of doom
				modalhtml = modalhtml + '<li><a id="demo' + i + '" href="#repo' + i + 'Modal">' + data[i].name + '</a><div id="repo' + i + 'Modal"><div class="close-repo' + i + 'Modal modalclose"><img src="img/close.png"/></div><div class="modal-content">' + data[i].git_url + '</div></div></li>';
			}
			projectCount = i;
		}
		$("#projectlist").html(modalhtml);
        //add modalsa
		for (var i = 0; i <= projectCount; i++) {
			$("#demo" + i).animatedModal({
                modalTarget:'repo' + i + "Modal",
                animatedIn:'fadeInLeft',
                animatedOut:'fadeOutRight',
                color:'#eeeeee',
                afterClose: function() {
                    setScrollyThingy();
                }
            });
		}
	})
});
