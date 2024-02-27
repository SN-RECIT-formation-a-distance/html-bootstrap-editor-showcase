@echo off
setlocal enabledelayedexpansion


pushd %~dp0

(
echo ^<!DOCTYPE html^>
echo ^<html^>
echo ^<head^>
echo ^<style^>
echo ^div.gallery { margin: 5px; border: 1px solid #ccc; float: left; width: 180px;}
echo ^div.gallery img {width: 180px;}
echo ^</style^>
echo ^</head^>
echo ^<body^>


    for /r %%b in (*)  do (
       set "filename=%%~nb"
       set "filename=!filename: =%%20!"
          echo ^<div class="gallery"^>
		  echo ^<a target="_blank" href="https://sn-recit-formation-a-distance.github.io/html-bootstrap-editor-showcase/img/mpareill/!filename!%%~xb"^>
		  echo ^<img src="https://sn-recit-formation-a-distance.github.io/html-bootstrap-editor-showcase/img/mpareill/!filename!%%~xb" alt=""^>^</a^>
		  echo ^</div^>		  
    )
   popd


)>"index.html"
echo done
pause