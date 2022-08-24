<?php
require_once("lang.php");
$lang = "en";
if (isset($argv[1]) && isset($langs[$argv[1]])){
  $lang = $argv[1];
}
$strings = $langs[$lang]['strings'];
require_once("functions.php");
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
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <img src="./image229.png" width="30" height="30" class="d-inline-block align-top" alt="">
        </a>
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
      </nav>
      <h1 class="display-4" style="box-sizing: border-box; margin-top: 0px; margin-bottom: 0.5rem; font-family: Viga, sans-serif; font-weight: 300; line-height: 1.2; color: rgb(55, 58, 60); font-size: 3.5rem; text-transform: uppercase; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: center; text-indent: 0px; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial;">
      <?php echo $strings['templateshowcase']; ?>
      </h1>
      <p class="lead text-center">
      <?php echo $strings['foreditor']; ?>
      </p>
      <hr class="my-4">
  </div>
	<div class="main-section">
  
<div class="form-outline search-group">
  <input type="search" id="search" class="form-control" placeholder="<?php echo $strings['search']; ?>" aria-label="<?php echo $strings['search']; ?>" />
</div>
        <?php
        $count = 0;
        foreach(getTemplates("templates/".$lang) as $tpl):
                if (!$count%4){
                    echo '<div class="row mt-3 mt-center">'; 
                } ?>
                        <div class="col-tpl">
                            <div class="document-list">
                                <div class="tile" href="#" file="<?php echo $tpl['file']; ?>" import="<?php echo $strings['import']; ?>" title="<?php echo $tpl['name']; ?>" desc="<?php echo $tpl['desc']; ?>">
                                  <div class="imgcontainer">
                                    <img src="<?php echo $tpl['img']; ?>">
                                  </div>
                                    <div class="bg-item-title"><p class="title"><?php echo $tpl['name']; ?></p>
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