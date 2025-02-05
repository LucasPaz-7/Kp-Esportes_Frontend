<?php

use KpEsportes\App\Domain\Router;

require_once __DIR__. "/Router.php";
Router::add("https://kp-esportes-frontend.vercel.app/home", "index.html");
Router::add("https://kp-esportes-frontend.vercel.app/admin/login", "TelaLoginKp/index.html");
Router::add("https://kp-esportes-frontend.vercel.app/auth/verifyemail", "TelaLoginKp/email.html");
Router::add("https://kp-esportes-frontend.vercel.app/admin/panel", "TelaLoginKp/admin.html");
Router::add("https://kp-esportes-frontend.vercel.app/show/product", "product.html");
Router::add("https://kp-esportes-frontend.vercel.app/cart", "cart.html");
Router::add("https://kp-esportes-frontend.vercel.app/categories", "categories.html");