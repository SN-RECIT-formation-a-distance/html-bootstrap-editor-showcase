# remove all files in /docs/
Write-Output "Removing all files in /docs"
Remove-Item -Path ..\docs\* -Recurse

# build template data
Write-Output "Building template data"
C:\wamp64\bin\php\php8.0.30\php.exe .\build-template-data.php

# copy data.json to /src/react/build
Write-Output "Copying data.json to /react/build"
Copy-Item ".\data.json" -Destination "..\src\react\build"

# copy  /src/react/build/* to /docs
Write-Output "Copying /react/build to /docs"
Copy-Item -Path "..\src\react\build\*" -Destination "..\docs" -Recurse