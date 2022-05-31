<?php
function getTemplates($dir){

    $templates = array();
    $files = scandir($dir);
    foreach ($files as $f){
        $content = file_get_contents($dir."/".$f);
        $json = json_decode($content, true);

        if ($json){
            if (!isset($json['desc'])) $json['desc'] = ""; 

            if (!isset($json['img']) && isset($json['image'])){
                $json['img'] = $json['image']; 
            } 

            $json['file'] = "./".$dir."/".urlencode($f);
            $templates[] = $json;
        }
    }
    return $templates;
}