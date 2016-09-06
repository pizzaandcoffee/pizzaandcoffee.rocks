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

var modalFiller = (function($, w, undefined) {


    var _fileExists = function(name) {
        $.ajax("ajax/modals/" + name, {
           success: function (data) {
               w.console.log("200");
               _addTextToModal(name, data);
           }
        });
    };

    var _addTextToModal = function(name, data) {
         w.console.log(name);
         var html = data;
         $("#modal-" + name + "-content").html(html);
    };

    return {
        getContent: function(name) {
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
        var projectlist = [];
		for (var i = 0; i < data.length; i++) {
			if (!data[i].fork) {
                projectlist.push(data[i].name);
                //god awful string of doom
				modalhtml = modalhtml + '<li><a id="demo' + i + '" href="#repo' + i + 'Modal">' + data[i].name + '</a><div id="repo' + i + 'Modal"><div class="close-repo' + i + 'Modal modalclose"><img src="img/close.png"/></div><div id="modal-' + data[i].name + '-content">' + data[i].git_url + '</div></div></li>';
			}
			projectCount += 1;
		}
		$("#projectlist").html(modalhtml);
        //add modalsa
		for (var i = 0; i < projectCount; i++) {
			$("#demo" + i).animatedModal({
                modalTarget:'repo' + i + "Modal",
                animatedIn:'fadeInLeft',
                animatedOut:'fadeOutRight',
                color:'#eeeeee',
                LeProjectName: projectlist[i],
                beforeOpen: function() {
                    //fuck
                    console.log(this.LeProjectName);
                    modalFiller.getContent(this.LeProjectName);
                },
                afterClose: function() {
                    setScrollyThingy();
                }
            });
		}
	})
});
