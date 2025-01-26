<?php

include("HttpHandler.php");

header_remove("X-Powered-By");
header("Access-Control-Allow-Origin: *");

$handler = new HandleMethod();

$handler->register("on_get", function (array $config) {
    global $handler;
    switch($config["path"]) {
        case '/api/getIp':
            header("Content-Type: application/json");
            http_response_code(200);
            echo json_encode($handler->getIp(), JSON_PRETTY_PRINT);
            break;
        case '/test':
            header("Content-Type: application/json");
            http_response_code(200);
            echo json_encode($handler->config, JSON_PRETTY_PRINT);
            break;
        default:
            header("Content-Type: application/json");
            http_response_code(405);
            echo json_encode(array(
                "error" => "Path {$config["path"]} doesnt exist"    
            ), JSON_PRETTY_PRINT);
    }
});

$handler->register("on_post", function (array $config) {
    global $handler;
    switch($config["path"]) {
        case '/':
            if ($handler->config['body'] && $handler->config['body']['Content-Type'] == 'application/json') $handler->config['body'] = json_decode($handler->config['body'], true);
            error_log(json_encode($handler->config, JSON_PRETTY_PRINT));
            header("Content-Type: application/json");
            http_response_code(200);
            echo json_encode($handler->config, JSON_PRETTY_PRINT);
            break;
        default:
            header("Content-Type: application/json");
            http_response_code(405);
            echo json_encode(array(
                "error" => "Path {$config["path"]} doesnt exist"    
            ), JSON_PRETTY_PRINT);
    }
});

$handler->register("on_method_error", function (String $method) {
    header("Content-Type: application/json");
    http_response_code(405);
    echo json_encode(array(
        "error" => "Method $method not allowed"
    ), JSON_PRETTY_PRINT);
});

$handler->run();