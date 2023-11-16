$from = "new-showcase/src/*"
$to = "shared/new-showcase"

try {
    . ("..\sync\watcher.ps1")
}
catch {
    Write-Host "Error while loading sync.ps1 script." 
}