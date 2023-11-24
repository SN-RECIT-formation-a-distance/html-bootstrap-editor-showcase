Write-Output "Deleting all files in docs" 
Remove-Item -Path C:\vmware-devserver2\shared\new-showcase\docs\* –Recurse -Force
	
read-host 'Press ENTER to continue...'