<?php
function getTemplates($dir){
    $templates = array();
    $files = scandir($dir);
    foreach ($files as $f){
        $file = $dir."/".$f;
        if (!is_file($file)) continue;
        $content = file_get_contents($file);
        $json = json_decode($content, true);

        if ($json){
            if (!isset($json['desc'])) $json['desc'] = ""; 

            if (!isset($json['img']) && isset($json['image'])){
                $json['img'] = $json['image']; 
            } 

            $json['file'] = "../".$dir."/".urlencode($f);
            $templates[] = $json;
        }
    }
    return $templates;
}