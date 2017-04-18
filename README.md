<h1 align="center">Glixer - GitHub Pages, Gulp, Jekyll, SCSS, Bootstrap.</h1>
<p align="center">Blog, Portfolio &amp Website framework.</p>

[![Join the chat at https://gitter.im/Northscript/glixer](https://badges.gitter.im/Northscript/glixer.svg)](https://gitter.im/Northscript/glixer?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Why?
1. EASY to use and Quick to get started.
2. Nothing else does this.

People new to web developement and working professionals often do not have the knowledge or time to know which tools they should be using or the know-how to configure them.

This project is meant to be a jump start for people in both groups.

## Demo
View this jekyll theme in action [here](https://north-script.github.io/glixer)

## Built with:
- [Bootstrap](http://getbootstrap.com/)
- [Bourbon](http://bourbon.io/)
- [Browser Sync](https://browsersync.io/)
- [Font Awesome](http://fontawesome.io/)
- [GitHub Pages](https://pages.github.com/)
- [Gulp](http://gulpjs.com/)
- [Jekyll](https://jekyllrb.com/)
- [jQuery](https://jquery.com/)
- [Node.js](https://nodejs.org/)
- [SASS](http://gulpjs.com/)

The tools listed above are included with this package and are ready to go once this package is installed.

## Getting Started

### C9

#### Setup

1. Logon to Github
2. Fork this [repository](https://github.com/north-script/glixer)
3. Copy your fork url e.g. `git@github.com:YOURUSERNAME/glixer`
4. On [c9.io](https://c9.io) create a new workspace
   * Template: Blank (Ubuntu Logo)
   * Clone from Git: use your fork url here
5. When you get redirected to some sort of enviroment, look at the bottom, that's your command line. Click on it and enter the following command:
`npm install`
   
#### Operation

To view the work:
 1. In the command line, run `gulp serve` - If it quits by itself then there is something wrong
 2. To view the result, click the `preview` button at the top and click `Preview Running Application`
 
To publish your work to Github run these commands in the command line:
 ```
 gulp publish
 git add .
 git commit
 git push origin master
 ```

### Local Machines

#### System Dependencies

##### Windows

See WINDOWS.md for instructions on installing these dependencies. these links are download links for installers

###### 64-bit

 - [Git](https://www.git-scm.com/download/win)
 - [Node.js](https://nodejs.org/dist/v7.7.3/node-v7.7.3-x64.msi)
 - [Ruby](https://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.3.3-x64.exe)
 - [Ruby Developer Kit](https://dl.bintray.com/oneclick/rubyinstaller/DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe) - See WINDOWS.md for details on installing this.
 
###### 32-bit

 - [Git](https://www.git-scm.com/download/win)
 - [Node.js](https://nodejs.org/dist/v7.7.3/node-v7.7.3-x86.msi)
 - [Ruby](https://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.3.3.exe)
 - [Ruby Developer Kit](https://dl.bintray.com/oneclick/rubyinstaller/DevKit-mingw64-32-4.7.2-20130224-1151-sfx.exe) - See WINDOWS.md for details on installing this.

##### Mac OSX
 - [Node.js](https://nodejs.org/dist/v7.7.3/node-v7.7.3.pkg)
 - [xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)


##### Linux
 - [Node.js](https://nodejs.org/en/download/package-manager)
 - `ruby`
 - `ruby-dev`
 - `zlib1g-dev`
 - `build-essential`
 - `git`
 
#### Cloning and setup
Open a Command Prompt or Terminal window and type these commands in:
```
git clone https://github.com/north-script/glixer
cd glixer
npm install
```

### Github Pages Setup (For organization/users)
1. Create a new repository in your user/organization
  - Make sure that initialize this repository with a README is unchecked
  - If you are making this for a user profile, name your repository: yourusername.github.io
  - If you are making this for a organization, make sure that the repository is created and owned by the organization and name it: yourorganization.github.io
2. clone this repository: `git clone https://github.com/north-script/glixer`
3. `cd glixer`
4. Remove .git directory (Windows: `rmdir /S .git` Mac/Linux: `rm -r -f .git`) 
5. `git init`
6. `git remote add origin https://github.com/user-or-organization-name/user-or-organization-name.github.io`
7. `git add .`
8. `git commit -m "Initial commit"`
9. `git push origin master`
10. Optional: `npm install`

### Github Pages Setup (For projects/repositories)

1. Clone your repository
2. `cd` into your repository
3. clone this repository `git clone https://github.com/north-script/glixer`
4. rename the glixer folder to docs.
5. remove the .git (hidden) folder in your `docs` folder
6. stage your changes and commit them.
7. push your changes to your repository.
8. Go to your repository settings and enable github pages from your `docs` folder

## Built by
[Mike Boardley](https://www.linkedin.com/in/boardley/)

Please email me your comments & feedback.

- by <a href="https://twitter.com/mikeboardley">twitter</a>
- mail <a href="mailto:boardley@gmail.com">boardley[at]gmail.com</a>
- via <a href="https://www.linkedin.com/in/boardley/">LinkedIn</a>


[Samuel Brekke](https://www.linkedin.com/in/sjbrekke/)

Please contact me for any questions, comments, concerns and, feedback

 - by mail: [brekmister@gmail.com](mailto:brekmister@gmail.com)
 - Github: [brekmister](https://github.com/users/brekmister)
 
---
