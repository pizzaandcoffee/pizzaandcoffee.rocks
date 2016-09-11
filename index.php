<?php
include __DIR__ . '/vendor/autoload.php';

Flight::route('/', function(){
  echo  file_get_contents("template/index.html");
});

Flight::route('/fuck', function(){
  echo  "<h1>And you thought nothing would be here? well guess again motherfucker</h1>";
});


Flight::route('/ajax/modals/@name', function($name){
    $pd = new Parsedown();
    if(file_exists("md/" . $name . ".md")){
        $output = $pd->text(file_get_contents("md/" . $name . ".md"));
        $output = str_replace('[x]', '☑️', $output);
        $output = str_replace('[ ]', '☐️', $output);
        echo $output;
    } else {
        echo $pd->text(file_get_contents("md/404.md"));
    }
});

Flight::map('notFound', function(){
    // Display custom 404 page
    include 'template/404.html';
});


Flight::start();
