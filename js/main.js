//------------------------------------------------------------------------------
// Gradient background
//------------------------------------------------------------------------------

var granimInstance = new Granim({
    element: '#canvas-interactive',
    name: 'interactive-gradient',
    elToSetClassOn: '.canvas-interactive-wrapper',
    direction: 'diagonal',
    opacity: [1, 1],
    isPausedWhenNotInView: true,
    stateTransitionSpeed: 500,
    states : {
        "default-state": {
            gradients: [
                ['#B3FFAB', '#12FFF7'],
                ['#ADD100', '#7B920A'],
                ['#1A2980', '#26D0CE']
            ],
            transitionSpeed: 10000
        }
    }
});

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
				modalhtml = modalhtml + '<li class="links"><a id="demo' + i + '" href="#repo' + i + 'Modal">' + data[i].name +'</a><span class="language ' + data[i].language + '">' + data[i].language + '</span><div id="repo' + i + 'Modal"><div class="close-repo' + i + 'Modal modalclose"><img style="float: right;" src="img/close.png"/></div><div id="modal-' + data[i].name + '-content" class="modal-content">' + data[i].git_url + '</div></div></li>';
			}
			projectCount += 1;
		}
		$("#projectlist").html(modalhtml);
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
