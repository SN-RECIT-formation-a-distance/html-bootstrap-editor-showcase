<?php
$webApi = new WebApi();
$webApi->readRequest();
$webApi->processRequest();

class WebApi{
  public const TEMPLATES_DATA = "./templates/";

  /** @var stdClass */
  protected $request = null;

  /**
   * Read the input data
   */
  public function readRequest(){
      $this->request = (object) json_decode(file_get_contents('php://input'), true);
      if($this->request == null){
        $this->request = (object) $_REQUEST;
      }
  }

  /**
   * Process the request
   */
  public function processRequest(){
    $serviceWanted = $this->request->service;

    if(method_exists($this, $serviceWanted)){
      $this->$serviceWanted();
    }
    else{
      $this->reply(false, null, "The service '$serviceWanted' was not found.");
    }
  }


  /**
   * Reply the client
   */
  protected function reply($success, $data = null, $msg = ""){
      $result = new stdClass();
      $result->success = $success;
      $result->data = $data;
      $result->msg = $msg;

      $headers = array();
      $headers[] = "Access-Control-Allow-Origin: http://localhost:3000";
      $headers[] = 'Access-Control-Allow-Credentials: true'; 
      $headers[] = "Access-Control-Allow-Methods: GET, POST, OPTIONS";
      $headers[] = "Access-Control-Allow-Headers: Origin, Accept, Content-Type";
      $headers[] = "Content-type: application/json; charset=utf-8";
      
      foreach($headers as $header){
        header($header);
      }
      
      if(ob_get_length() > 0){
        ob_clean();
      }
    
      flush();

      echo json_encode($result);
  }

  protected function getTemplates() {
      try {

          $data = getTemplates();
          $this->reply(true, $data);

      } catch (Exception $ex) {
          $this->reply(false, null, $ex->GetMessage());
      }
  }

  protected function getFileToImport() {
    try {
        $templatesFolder = self::TEMPLATES_DATA;
        $content = file_get_contents($templatesFolder.$this->request->filePath);
        $this->reply(true, $content);

    } catch (Exception $ex) {
        $this->reply(false, null, $ex->GetMessage());
    }
  }
}

function getTemplates(){
    $result = new stdClass();
    $result->generic = array();
    $result->specific = array();
  
    $templatesFolder = WebApi::TEMPLATES_DATA;

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