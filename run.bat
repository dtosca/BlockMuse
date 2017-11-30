echo off
set runtime_dir=C:\Cornerstone-2.1.2
set sdk_dir=C:\Cornerstone-2.1.2-SDK 

IF exist %runtime_dir%\bin (
 set bin_path=%runtime_dir%\bin
 goto run
) 
IF exist %sdk_dir%\bin (
 set bin_path=%sdk_dir%\bin
 goto run
)

goto exit

:run
%bin_path%\ScriptRunner.exe --dummy BlockMuse.js  

:exit