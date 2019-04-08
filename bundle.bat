@echo off
rmdir /S/Q .\bundled
node ./node_modules/typescript/bin/tsc --project ./tsconfig.json --outFile ./bundled/all.js --rootDir ./printies || goto :error
xcopy /Q .\node_modules\requirejs\require.js .\bundled\ || goto :error
xcopy /Q .\node_modules\react\umd\react.production.min.js .\bundled\react.js* || goto :error
xcopy /Q .\node_modules\react-dom\umd\react-dom.production.min.js .\bundled\react-dom.js* || goto :error
xcopy /Q .\index.bundle.html .\bundled\index.html* || goto :error
node ./node_modules/less/bin/lessc ./styles/all.less ./bundled/styles/all.css || goto :error
echo all bundled
goto :EOF
:error
echo Unable to make a bundle: %errorlevel%
