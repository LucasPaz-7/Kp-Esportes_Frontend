<?php

namespace KpEsportes\App\Domain;

use Closure;
use Exception;
use InvalidArgumentException;

class Router {
    
    protected static array $endpoints = [
        
    ];

    public static function add(string $endpoint, string $filename) {
        self::$endpoints[$endpoint] = $filename;
    }

    public static function checkRoute() {
        $uri = $_SERVER["REQUEST_URI"];

        $uri = explode("?", $uri)[0];
        
        foreach (self::$endpoints as $pattern => $filename) {
            if (preg_match("#(.*)" . $pattern . "$#", $uri)) {
                return $filename;
            }
        }

        throw new Exception("Arquivo Não encontrado ou rota não existe", 404);
    }
    
}