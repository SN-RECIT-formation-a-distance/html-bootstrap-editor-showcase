$from = "html-bootstrap-editor-showcase/src/*"
$to = "shared/html-bootstrap-editor-showcase"

try {
    . ("..\sync\watcher.ps1")
}
catch {
    Write-Host "Error while loading sync.ps1 script." 
}