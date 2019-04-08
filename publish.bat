call aws s3 rm s3://%1 --recursive || goto :error
call aws s3 cp ./bundled s3://%1/ --recursive || goto :error
call aws s3 website s3://%1/ --index-document index.html || goto :error
start chrome https://s3.amazonaws.com/%1/index.html
goto :EOF
