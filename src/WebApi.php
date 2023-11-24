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
