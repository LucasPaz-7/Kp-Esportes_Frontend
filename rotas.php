<?php

use KpEsportes\App\Domain\Router;

require_once __DIR__. "/Router.php";
Router::add("/home", "index.html");
Router::add("/chuteiras", "chuteiras.html");