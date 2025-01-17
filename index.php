<?php

use KpEsportes\App\Domain\Router;
require_once __DIR__. "/Router.php";
require_once __DIR__. "/rotas.php";


try {
    $filename = Router::checkRoute();
    include __DIR__. "/". $filename;

} catch (Exception $erro) {

    echo($erro->getMessage());
}