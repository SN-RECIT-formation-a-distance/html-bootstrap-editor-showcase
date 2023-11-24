<?php

define('TEMPLATES_DATA', "./templates/");
$file = "templates/data.json";


if(file_exists($file)){
    echo "File '$file' alraedy exist. Deleting it.\n";
    unlink($file);
}

$data = getTemplates();

echo "Writing on file '$file'.\n";
file_put_contents($file, json_encode($data));

echo "The execution has finished.\n";

function getTemplates(){
    $result = new stdClass();
    $result->generic = array();
    $result->specific = array();
  
    $templatesFolder = TEMPLATES_DATA;

    $folders = scandir($templatesFolder);
  
    foreach($folders as $folderName){
        if(in_array($folderName, array(".", ".."))){ continue;}
        if(!is_dir($templatesFolder.$folderName)){ continue;}
  
        // read metadata file collection.json
        $metadataFile = $templatesFolder.$folderName."/collection.json";
  
        // file collection.json must exist
        if (!is_file($metadataFile)) continue;
  
        $content = file_get_contents($metadataFile);
        $collection = json_decode($content);
  
        // force type specific if it is not set
        if (!isset($collection->type)){
          $collection->type = "specific"; 
        } 
  
        $collection->tags = array();
        $collection->items = array();
  
        if($collection->type == 'generic'){
          $result->generic[] = $collection;
        }
        else{
          $result->specific[] = $collection;
        }
  
        $files = scandir($templatesFolder.$folderName);
      
        foreach ($files as $filename){
            $filePath = $templatesFolder.$folderName."/".$filename;
  
            // ignore collection.json
            if ($filename == "collection.json") continue;
            if (!is_file($filePath)) continue;
  
            $content = file_get_contents($filePath);
            $template = json_decode($content);
  
            if (!$template){ continue;}
  
            // retrocompatible
            if (!isset($template->desc)){
              $template->desc = ""; 
            } 
  
            // retrocompatible
            if (!isset($template->img) && isset($template->image)){
              $template->img = $template->image; 
            } 
  
            // retrocompatible
            if (!isset($template->tags)){
              $template->tags = array();
            }
  
            foreach ($template->tags as $tag){
              if(!in_array($tag, $collection->tags)){
                $collection->tags[] = $tag;
              }
            }
  
            $template->filePath = $folderName."/".urlencode($filename);
  
            $collection->items[] = $template;
        }
    }
  
    return $result;
}