<?php
class HandleMethod {
    public $config;
    public $functions;

    public function __construct() {
        $this->config = array(
            "method" => strtolower($_SERVER["REQUEST_METHOD"]),
            "path" => isset($_SERVER["PATH_INFO"]) ? $_SERVER["PATH_INFO"] : '/',
            "parameters" => $_GET,
            "body" => file_get_contents("php://input"),
            "headers" => getallheaders(),
            "REQUEST_TIME_FLOAT" => $_SERVER["REQUEST_TIME_FLOAT"],
            "ip" => $this->getIp()
        );
        $this->functions = array();
        $this->config['device']= $this->parseUserAgent($this->config['headers']['User-Agent']);
    }
    public function request(String $url) {
        return shell_exec("curl $url");
    }
    public function ipinfo(String $ip) {
        return json_decode($this->request("https://ipinfo.io/$ip"));
    }
    public function parseUserAgent($userAgentString) {
        $pattern = '/\((.*?)\)/';
        preg_match($pattern, $userAgentString, $matches);
        if(isset($matches[1])) {
            $data = explode(" ", str_replace(";", "", $matches[1]));
            return array(
                "os" => $data[0],
                "version" => $data[1],
                "version_number" => $data[2],
                "system_type" => $data[3],
                "architecture" => $data[4]
            );
        } else {
            return array(
                "os" => null,
                "version" => null,
                "version_number" => null,
                "system_type" => null,
                "architecture" => null
            );
        }
    }
    public function getIp() {
        return array(
            "ipv4" => array(
                "ip" => (isset($_SERVER['REMOTE_ADDR']) && filter_var($_SERVER['REMOTE_ADDR'], FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) ? $_SERVER['REMOTE_ADDR'] : null,
                "ipinfo" => (isset($_SERVER['REMOTE_ADDR']) && filter_var($_SERVER['REMOTE_ADDR'], FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) ? $this->ipinfo($_SERVER['REMOTE_ADDR']) : null
            ),
            "ipv6" => array(
                "ip" => (isset($_SERVER['REMOTE_ADDR']) && filter_var($_SERVER['REMOTE_ADDR'], FILTER_VALIDATE_IP, FILTER_FLAG_IPV6)) ? $_SERVER['REMOTE_ADDR'] : null,
                "ipinfo" => (isset($_SERVER['REMOTE_ADDR']) && filter_var($_SERVER['REMOTE_ADDR'], FILTER_VALIDATE_IP, FILTER_FLAG_IPV6)) ? $this->ipinfo($_SERVER['REMOTE_ADDR']) : null
            )
        );
    }
    public function getDevice() {
        return $this->config['device'];
    }
    public function register($name, $function) {
        $this->functions[$name] = $function;
    }
    public function run() {
        $fun = "on_" . $this->config['method'];
        if (isset($this->functions[$fun]) && is_callable($this->functions[$fun])) {
            return call_user_func($this->functions[$fun], $this->config);
        } else {
            $errorFun = "on_method_error";
            if (isset($this->functions[$errorFun]) && is_callable($this->functions[$errorFun])) {
                return call_user_func($this->functions[$errorFun], $this->config['method']);
            } else {
                return "Method not found: " . $this->config['method'];
            }
        }
    }
}
