@echo off

if "%1" == "" goto EOF

if exist "%CORNERSTONE_ROOT_2_1_1%\bin\ScriptRunner.exe" (
  "%CORNERSTONE_ROOT_2_1_1%\bin\ScriptRunner.exe" %*
  goto EOF
)

if exist "%CORNERSTONE_SDK_ROOT%\Applications\ScriptRunner\debug\ScriptRunner.exe" (
  "%CORNERSTONE_SDK_ROOT%\Applications\ScriptRunner\debug\ScriptRunner.exe" %*
  goto EOF
)

if exist "%CORNERSTONE_SDK_ROOT%\Applications\ScriptRunner\release\ScriptRunner.exe" (
  "%CORNERSTONE_SDK_ROOT%\Applications\ScriptRunner\release\ScriptRunner.exe" %*
  goto EOF
)

echo ScriptRunner %*

:EOF
