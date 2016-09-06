<?php
include __DIR__ . '/vendor/autoload.php';

Flight::route('/', function(){
  echo  file_get_contents("template/index.html");
});

Flight::route('/fuck', function(){
  echo  "fuck";
});


Flight::route('/ajax/modals/@name', function($name){
    $pd = new Parsedown();
    if(file_exists("md/" . $name . ".md")){
        echo $pd->text(file_get_contents("md/" . $name . ".md"));
    } else {
        echo $pd->text(file_get_contents("md/404.md"));
    }
});

Flight::map('notFound', function(){
    // Display custom 404 page
    include 'template/404.html';
});


Flight::start();
