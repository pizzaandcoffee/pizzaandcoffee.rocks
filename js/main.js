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

var modalFactory = (function($, w, undefined) {

    var _getfile = function(modal) {
        $.ajax("ajax/modals/" + modal.name, {
           success: function (data) {
               modal.content = "<p id='modal-" + modal.name  + "-close'>close</p>" + data;
               modal.create();
               modal.open();
           }
        });
    };

    var _addTextToModal = function(name, data) {
	    var close = "<p id='modal-" + name  + "-close'>close</p>";
        $("#modal-" + name + "> .modal-content").html(close + data);
    };

    return {
        createModal: function(projectName) {
            _getfile(new betterAnimatedModals.modal({
                name: projectName,
                animatedIn: "fadeInLeft",
                animatedOut: "fadeOutRight",
                beforeOpen: function(modal){
                    w.console.log("bla");
                    $("#modal-" + modal.name + "-close").click(function(){
                        modal.close();
                    });
                }
            }));
        }
   };
}(jQuery, window));


//------------------------------------------------------------------------------
// Functions
//------------------------------------------------------------------------------
//adds a ScrollyThingy to the links of the navbar
function setScrollyThingy() {
    $(".link").on('click', function(event) {
        if (this.hash !== "") {
          event.preventDefault();

          var hash = this.hash;

          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function(){
            window.location.hash = hash;
          });
        }
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
				modalhtml = modalhtml + '<li class="links"><a class="projectlink">' + data[i].name +'</a><span class="language ' + data[i].language + '">' + data[i].language + '</span></li>';
			}
			projectCount += 1;
		}
		$("#loading").remove();
        $("#projectlist").html(modalhtml);
		$(".projectlink").click(function() {
            modalFactory.createModal($(this).html());

		});
	})
});
