@echo off
REM Build the project
echo Building the project...
npm run build

REM Check if the build was successful
IF %ERRORLEVEL% NEQ 0 (
    echo Build failed.
    exit /b %ERRORLEVEL%
)

REM Navigate into the build output directory
echo Navigating into the dist directory...
cd dist

REM Initialize a new Git repository
echo Initializing a new Git repository...
git init
IF %ERRORLEVEL% NEQ 0 (
    echo Git init failed.
    exit /b %ERRORLEVEL%
)

echo Adding all files to Git...
git add -A
IF %ERRORLEVEL% NEQ 0 (
    echo Git add failed.
    exit /b %ERRORLEVEL%
)

echo Committing files...
git commit -m "deploy"
IF %ERRORLEVEL% NEQ 0 (
    echo Git commit failed.
    exit /b %ERRORLEVEL%
)

REM Force push to the `gh-pages` branch
echo Pushing to gh-pages branch...
git push -f https://github.com/Junbol-Frontend-Mentor/space-tourism-website.git master:gh-pages
IF %ERRORLEVEL% NEQ 0 (
    echo Git push failed.
    exit /b %ERRORLEVEL%
)

REM Go back to the previous directory
echo Going back to the root directory...
cd ..

echo Deployment complete.
pause



