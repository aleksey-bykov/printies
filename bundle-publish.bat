@echo off
call bundle.bat || goto :error
call publish.bat %1 || goto :error
goto :EOF
:error
echo Unable to make a bundle and publish: %errorlevel%
