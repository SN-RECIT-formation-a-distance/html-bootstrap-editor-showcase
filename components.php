<?php
require_once("functions.php");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: token, Content-Type');
header('Access-Control-Max-Age: 1728000');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
$content = json_encode(getTemplates("components"));
echo $content;
?>