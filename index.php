<?php
require_once("lang.php");
$lang = "en";
if (isset($argv[1]) && isset($langs[$argv[1]])){
  $lang = $argv[1];
}
$strings = $langs[$lang]['strings'];
require_once("functions.php");
$data = getTemplates([ "templates/common","templates/".$lang]);
?>
<!DOCTYPE html>
<html>
<head>
	<title><?php echo $strings['showcase']; ?></title>
	<meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1">
	
	<link href="https://fonts.googleapis.com/css?family=Abel" rel="stylesheet">
  <link rel="stylesheet" href="../css/bootstrap.min.css">
  <link rel="stylesheet" href="../fontawesome/css/all.min.css">
  <link rel="icon" type="image/png" href="../image229.png">
  <script src="../js/jquery-3.1.1.slim.min.js" ></script>
  <script src="../js/popper.min.js"></script>
  <script src="../js/bootstrap.min.js" ></script>
	<link rel="stylesheet" type="text/css" href="../css/custom.css">
  <script src="../js/vitrine.js"></script>
</head>
<body>
      <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
          <img src="../image229.png" width="30" height="30" class="d-inline-block align-top" alt="">
          <?php echo $strings['templateshowcase']; ?>
        </a>
        <div class="d-flex">
          <div class="form-outline search-group mr-3">
            <input type="search" id="search" class="form-control" placeholder="<?php echo $strings['search']; ?>" aria-label="<?php echo $strings['search']; ?>" />
          </div>
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <?php echo $langs[$lang]['name']; ?>
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <?php foreach($langs as $k => $v){ ?>
                  <a class="dropdown-item" href="<?php echo '../'.$k.'/'; ?>"><?php echo $v['name']; ?></a>
              <?php } ?>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div class="d-flex justify-content-center mt-3">
        <?php
        foreach($data['tags'] as $tag => $v){
          echo '<span class="badge badge-secondary badgefilter m-1">'.$tag.'</span> ';
        } ?>

      </div>
      <hr class="my-4">
  </div>
	<div class="main-section">
  
        <?php
        $count = 0;
        foreach($data['templates'] as $tpl):
                if (!$count%4){
                    echo '<div class="row mt-3 mt-center">'; 
                } ?>
                        <div class="col-tpl">
                            <div class="document-list">
                                <div class="tile card h-100" href="#" file="<?php echo $tpl['file']; ?>" import="<?php echo $strings['import']; ?>" title="<?php echo $tpl['name']; ?>" desc="<?php echo $tpl['desc']; ?>">
                                  <img src="<?php echo $tpl['img']; ?>" class="card-img-top">
                                  <div class="card-body p-0"></div>
                                  <div class="bg-item-title card-footer">
                                      <div class="title"><?php echo $tpl['name']; ?></div>
                                      <div class="tags">
                                        <?php
                                        if (isset($tpl['tags'])){
                                          foreach ($tpl['tags'] as $tag){
                                            echo '<span class="badge badge-primary m-1">'.$tag.'</span> ';
                                          } 
                                        }
                                        ?>
                                      </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                        
<?php
    // close row if there is 3 thumbnails in it
    if ($count%3 == 3)
        echo '</div></div>';

    $count++;
endforeach; 

// close the row at the end if the last one wasn't full
if ($count%3>0)
    echo '</div></div>';
if ($count == 0)
  echo 'No result';
?>
    </div>
    
    
<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
          <h3 id="modal-title"></h3>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="modal-body">
      </div>
    </div>
  </div>
</div>
</body>
</html>