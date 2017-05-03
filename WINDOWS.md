## System requirements
OS: Windows 7/8/8.1/10 64-bit or 32-bit
RAM: 2GB
Free HD Space: 1GB

## Dependencies Installation
1. Find out if your system is running 64-bit or 32-bit<br>
   ***Windows 8/8.1/10:*** hit the windows key and type in `This PC`, right click on `This PC` and click `Properties`<br>
   ***Windows 7:*** hit the windows key and type in `computer`, right click on `computer` and click `Properties`<br><br>
   You may need to scroll down to find it. there should be a line saying `System Type: ` with something that says 
   `64-bit Operating System` or `32-bit Operating System`

2. Download and install Node.js
    - [64-bit](https://nodejs.org/dist/v7.7.3/node-v7.7.3-x64.msi)
    - [32-bit](https://nodejs.org/dist/v7.7.3/node-v7.7.3-x86.msi)
3. Download and install [Git](https://www.git-scm.com/download/win)
4. Download and install Ruby (***IMPORTANT:*** Be sure to check all checkboxes when asked)
    - [64-bit](https://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.3.3-x64.exe)
    - [32-bit](https://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.3.3.exe)
5. Install Ruby Developer Kit
   1. Download the self-extracting zip file
      - [64-bit](https://dl.bintray.com/oneclick/rubyinstaller/DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe)
      - [32-bit](https://dl.bintray.com/oneclick/rubyinstaller/DevKit-mingw64-32-4.7.2-20130224-1151-sfx.exe)
   2. Open File Explorer and navigate to your `C:/` drive. Make a new folder in there called `Ruby-DevKit`. 
      Keep this window open, it will be important later.
   3. Open the self-extracting zip file. a Window will pop up prompting you to put the files somewhere. 
      In the text field replace the text with `C:/Ruby-DevKit`. Hit ok to start extracting the files.
      At this time, if you want to make yourself some Coffee or a Sandwich, Go do that because this will 
      take quite a few minutes. (Especially if you are working with a not very responsive computer)
   4. Once the window disappears by itself, go back to the File Explorer you kept open. open the Ruby-DevKit folder 
      then click on the top navigation bar, it should enable you to type text in. type in `cmd` then hit enter.
   5. Command Prompt should open. in that application, type in the following commands:
      ```
         ruby dk.rb init
         ruby dk.rb install
      ```
   6. Close File Explorer and the Command Prompt
 
 ## Downloading Glixer on Windows
  If you just want to try out Glixer without affecting anyones profile, you can replace 
  `https://github.com/your-username/yourusername.github.io` with `https://github.com/northscript/glixer` 
  and `your-username.github.io` with `glixer`. Do note however, you won't be able to push your changes 
  anywhere without knowledge and training in Git if you clone straight from Glixer.
  
  1. Fork and setup glixer on your user/organization profile (See README.md on how to do this)
  2. Clone your repository
     1. Open File Explorer and navigate to desired destination (You don't need to make a new folder)
     2. Click on the top navigation bar and type in `cmd` then hit Enter
     3. Type in the following commands:
        ```
           git clone https://github.com/your-username/your-username.github.io
           cd your-username.github.io
           npm install
        ```
     4. Once you get a Thumbs up in ASCII-Art, then you can start running and working with Glixer!
     
 ## Running and Working with Glixer on Windows
 Glixer has this functionality to automatically refresh the browser when you make changes. But, you should know how to get that to 
 work. It works slightly different on Windows than on Macintosh and Linux.
 
 ### Running a local instance of Glixer (And viewing live changes)
  1. Open File Explorer and Navigate to your repository folder/project folder
  2. Click on the top navigation bar and type in `cmd` then hit enter
  3. In the command prompt, type in `gulp serve` then hit enter. At some point the console should hang and open a new tab/window 
     in your default web browser.
  5. Make some changes to Glixer via your favorite code editor (Literally, you can use any text editor you wish)
     (See not-yet-existant.md on what changes what) 
  4. When you are done playing around with Glixer, you can hit either hit `Ctrl-C` and hit `Y` if prompted so you can go back 
     and publish those changes. Otherwise, you can just close Command Prompt
  
 ### Publish, Commit and, Push to your repository
 After you have completed your changes and wish to publish them, follow these steps:
  1. If you don't have a command prompt open to your project folder, do that by navigating via File Explorer and 
     clicking the top bar then typing `cmd`
  2. Type the following commands: 
     ```
        gulp publish
        git commit -a -m "I Did Something!"
        git push origin master
     ```
  3. You can view your changes at by typing your username followed by `.github.io` in your browser
 
