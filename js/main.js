//------------------------------------------------------------------------------
// Modules
//------------------------------------------------------------------------------
var githubRepos = (function($, w, undefined) {

    var url = "https://api.github.com/users/pizzaandcoffee/repos";

    return {
        //hand a function over that does something with our githubRepos
        run: function(handler) {
            $.getJSON(url, function(data){
                handler(data);
            });
        }
    };
}(jQuery, window));

var markdownHandler = (function($, w, undefined) {

    var folder = "md/";

    var md = new w.markdownit();

    var _fileExists = function(name) {
        w.console.log(folder + name + ".md");
        $.ajax(folder + name + ".md", {

           error: function (response) {
               w.console.log("404");
               w.console.log(name);
               _get404(name);
           },
           success: function (data) {
               w.console.log("200");
               _addTextToModal(name, data);
           }
        });
    };

    var _addTextToModal = function(name, markdown) {
         w.console.log(name);
         var html = md.render(markdown);
         $("#modal-" + name + "-content").html(html);
    };

    var _get404 = function(name) {
        _addTextToModal(name, "# Sorry \n ## FUCK!");
    };

    return {
        getModalContent: function(name) {
            w.console.log("fuck");
            _fileExists(name);
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
				modalhtml = modalhtml + '<li><a id="demo' + i + '" href="#repo' + i + 'Modal">' + data[i].name + '</a><div id="repo' + i + 'Modal"><div class="close-repo' + i + 'Modal modalclose"><img src="img/close.png"/></div><div id="modal-' + data[i].name + '-content">' + data[i].git_url + '</div></div></li>';
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
                beforeOpen: function() {
                    //fuck
                    markdownHandler.getModalContent("Geekbot");
                },
                afterClose: function() {
                    setScrollyThingy();
                }
            });
		}
	})
});
