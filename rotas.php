<?php

use KpEsportes\App\Domain\Router;

require_once __DIR__. "/Router.php";
Router::add("/home", "index.html");
Router::add("/admin/login", "TelaLoginKp/index.html");
Router::add("/auth/verifyemail", "TelaLoginKp/email.html");
Router::add("/admin/panel", "TelaLoginKp/admin.html");
Router::add("/show/product", "product.html");