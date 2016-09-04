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
    githubRepos.run(function(data) {
        console.log(data[0].id);
        for (var i = 0; i < data.length; i++) {
            if (!data[i].fork) {
                var old = $("#projectlist").html();
                $("#projectlist").html(old + "<li>" + data[i].name + "</li>");
            }
            data[i]
        }
    })
});
