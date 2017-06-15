#! /usr/bin/env node
var childProcess = require('child_process');
var fs = require('fs');
var http = require('http');
var os = require('os');

function glixer() {
  var args = process.argv.slice(2);
  var command = glixer[args[0]];
  if (typeof command === 'function') command();
  else process.stdout.write('Command not found.\n');
};

////////////////////////////////////////////////////////////////////////////////
// Glixer Initialization                                                      //
////////////////////////////////////////////////////////////////////////////////
glixer.init = function() {
  doNative();
  doGems();
  doNPM();
  finish();


  function doNative() {
    var nativeFunction = glixer.init[process.platform];
    if (typeof nativeFunction === 'function') {
      nativeFunction();
    } else {
      process.stdout.write('Platform "' + process.platform +
        '" is not supported.\n')
      process.exit(1);
    }
  }

  function doGems() {
    process.stdout.write('Getting list of installed gems...');
    try {
      var result = childProcess.execSync('gem list', {encoding: 'utf-8'});
      process.stdout.write('DONE\n');
    } catch(err) {
      process.stdout.write('FAILED\n');
      process.stdout.write(err);
      process.stdout.write('Cannot continue initialization...EXITING\n');
      process.exit(1);
    }

    var tbinstalled = [];
    var nativegems = [
      'bundler',
      'jekyll'
    ];

    process.stdout.write('Checking gem dependencies:\n');
    for (var i = 0; i < nativegems.length; i++) {
      process.stdout.write('\t' + nativegems[i] + '...');
      if (result.indexOf(nativegems[i] + ' (') >= 0) {
        process.stdout.write('INSTALLED\n');
      } else {
        tbinstalled.push(nativegems[i]);
        process.stdout.write('NOT INSTALLED\n');
      }
    }

    if (tbinstalled.length > 0) {
      process.stdout.write('Installing gems...');
      try {
        childProcess.execSync('gem install ' + tbinstalled.join(' '), 'utf-8');
        process.stdout.write('DONE\n');
      } catch(err) {
        process.stdout.write('FAILED\n');
        process.stdout.write(err);
        process.stdout.write('Cannot continue initialization...EXITING\n');
        process.exit(1);
      }
    }

    process.stdout.write('Running bundler install...');
    try {
      childProcess.execSync('bundler install', 'utf-8');
      process.stdout.write('DONE\n');
    } catch(err) {
      process.stdout.write('FAILED\n');
      process.stdout.write(err);
      process.stdout.write('Cannot continue initialization...EXITING\n');
      process.exit(1);
    }
  }

  function doNPM() {
    process.stdout.write('Getting list of installed global NPM packages...');
    try {
      var npmglobal = childProcess.execSync('npm list -g', 'utf-8');
      process.stdout.write('DONE\n');
    } catch(err) {
      process.stdout.write('FAILED\n');
      process.stdout.write(err);
      process.stdout.write('Cannot continue initialization...EXITING\n');
      process.exit(1);
    }
    var tbinstalled = [];
    var npmdep = [
      'gulp'
    ];

    process.stdout.write('Checking global NPM dependencies:\n');
    for (var i = 0; i < npmdep.length; i++) {
      process.stdout.write('\t' + npmdep[i] + '...');
      if (npmglobal.indexOf(npmdep[i]) >= 0) {
        process.stdout.write('INSTALLED\n');
      } else {
        tbinstalled.push(npmdep[i]);
        process.stdout.write('NOT INSTALLED\n');
      }
    }

    if (tbinstalled.length > 0) {
      process.stdout.write('Installing global NPM dependencies...\n');
      try {
        childProcess.execSync('npm install -g ' + tbinstalled.join(' '),
          {
            stdio: 'ignore'
          });
        process.stdout.write('SUCCESS\n');
      } catch(err) {
        process.stdout.write('FAILED\n');
        process.stdout.write(err);
        process.stdout.write('Cannot continue initialization...EXITING\n');
        process.exit(1);
      }
    }

    process.stdout.write('Running npm install...');
    try {
      childProcess.execSync('npm install', {stdio: 'ignore'});
      process.stdout.write('SUCCESS\n');
    } catch(err) {
      process.stdout.write('FAILED\n');
      process.stdout.write(err);
      process.stdout.write('Cannot continue initialization...EXITING\n');
      process.exit(1);
    }
  }

  function finish() {
    process.stdout.write(
      '★░░░░░░░░░░░████░░░░░░░░░░░░░░░░░░░░★\n' +
      '★░░░░░░░░░███░██░░░░░░░░░░░░░░░░░░░░★\n' +
      '★░░░░░░░░░██░░░█░░░░░░░░░░░░░░░░░░░░★\n' +
      '★░░░░░░░░░██░░░██░░░░░░░░░░░░░░░░░░░★\n' +
      '★░░░░░░░░░░██░░░███░░░░░░░░░░░░░░░░░★\n' +
      '★░░░░░░░░░░░██░░░░██░░░░░░░░░░░░░░░░★\n' +
      '★░░░░░░░░░░░██░░░░░███░░░░░░░░░░░░░░★\n' +
      '★░░░░░░░░░░░░██░░░░░░██░░░░░░░░░░░░░★\n' +
      '★░░░░░░░███████░░░░░░░██░░░░░░░░░░░░★\n' +
      '★░░░░█████░░░░░░░░░░░░░░███░██░░░░░░★\n' +
      '★░░░██░░░░░████░░░░░░░░░░██████░░░░░★\n' +
      '★░░░██░░████░░███░░░░░░░░░░░░░██░░░░★\n' +
      '★░░░██░░░░░░░░███░░░░░░░░░░░░░██░░░░★\n' +
      '★░░░░██████████░███░░░░░░░░░░░██░░░░★\n' +
      '★░░░░██░░░░░░░░████░░░░░░░░░░░██░░░░★\n' +
      '★░░░░███████████░░██░░░░░░░░░░██░░░░★\n' +
      '★░░░░░░██░░░░░░░████░░░░░██████░░░░░★\n' +
      '★░░░░░░██████████░██░░░░███░██░░░░░░★\n' +
      '★░░░░░░░░░██░░░░░████░███░░░░░░░░░░░★\n' +
      '★░░░░░░░░░█████████████░░░░░░░░░░░░░★\n' +
      '★░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░★\n'
    );
    process.stdout.write('All set! run "gulp serve" and start editing!\n');
  }
}
//////////////////////////
// Platform init: linux //
//////////////////////////
glixer.init.linux = function() {
  checkRoot();
  checkDistro();

  function checkDistro() {
    process.stdout.write('Checking Distro Support...');

    var data = fs.readFileSync('/etc/os-release', 'utf-8');
    var id = searchRelease(data, 'ID=');
    var prop = glixer.init.linux[id];
    if (typeof prop === 'function') {
      process.stdout.write('SUPPORTED\n');
      return prop();
    }

    idlike = searchRelease(data, 'ID_LIKE=');
    prop = glixer.init.linux[idlike];
    if (typeof prop === 'function') {
      process.stdout.write('SUPPORTED\n');
      return prop();
    }

    process.stdout.write('NOT SUPPORTED\n');
    process.stdout.write('Linux Distribution "' + id + '" and "' + idlike +
      '" is not supported.');
    process.exit(1);

    function searchRelease(data, string) {
      let startIndex = data.indexOf(string) + string.length;
      let endIndex = data.indexOf('\n', startIndex);
      return data.slice(startIndex, endIndex);
    }
  }
};

// Linux Init: distro like debian or ubuntu //
glixer.init.linux.debian = function() {
  var tbinstalled = [];
  var deps = [
    'git',
    'build-essential',
    'zlib1g-dev',
    'ruby',
    'ruby-dev'
  ];
  checkDep();

  function checkDep() {
    process.stdout.write('Getting List of Installed Packages...');
    var result = childProcess.execSync('dpkg -l', {encoding: 'utf-8'});
    process.stdout.write('DONE\n');

    process.stdout.write('Checking native dependencies:\n');
    for (var i = 0; i < deps.length; i++) {
      process.stdout.write('\t' + deps[i] + '...');

      let ifNotInstalledOne = result.indexOf(deps[i] + ' ') === -1;
      let ifNotInstalledTwo = result.indexOf(deps[i] + ':') === -1;

      if (ifNotInstalledOne && ifNotInstalledTwo) {
        process.stdout.write('NOT INSTALLED\n');
        tbinstalled.push(deps[i]);
      } else {
        process.stdout.write('INSTALLED\n');
      }
    }

    if (tbinstalled.length > 0) installDep();
  }

  function installDep() {
    if (tbinstalled.length <= 0) return;

    process.stdout.write('Updating apt cache...');
    try {
      childProcess.execSync('apt-get update');
      process.stdout.write('SUCCESS\n');
    } catch(err) {
      process.stdout.write('FAILED\n')
      process.stdout.write(err);
      process.stdout.write('Cannot continue initialization...EXITING\n');
      process.exit(1);
    }

    process.stdout.write('Installing Native Dependencies...')
    try {
      childProcess.execSync('apt-get install -y ' + tbinstalled.join(' '));
      process.stdout.write('SUCCESS\n');
    } catch(err) {
      process.stdout.write('FAILED\n');
      process.stdout.write(err);
      process.stdout.write('Cannot continue initialization...EXITING\n');
      process.exit(1);
    }
  }
};
glixer.init.linux.ubuntu = glixer.init.linux.debian;

/////////////////////////////
// platform init: Mac OS/X //
/////////////////////////////
glixer.init.darwin = function() {

};

////////////////////////////
// platform init: Windows //
////////////////////////////
glixer.init.windows = function() {
  var userInfo = os.userInfo();

  function doRuby() {
    var rubyInstallFile = userInfo.homeDir +
      '\\Downloads\\glixrubyinstaller.exe';
    checkRuby();

    function checkRuby() {
      try {
        process.stdout.write('Checking Ruby Installation...');
        childProcess.execSync('ruby -v');
        process.stdout.write('INSTALLED\n');
        return;
      } catch(err) {
        process.stdout.write('NOT INSTALLED\n');
        downloadRuby();
      }
    }

    function downloadRuby() {
      var dlurl;
      switch(process.arch) {
        case 'x64':
          dlurl = 'https://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.3.3-x64.exe';
          break;
        case 'ia32':
          dlurl = 'https://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.3.3.exe';
          break;
        // In the event an ARM Windows machine pops up.
        default:
          process.stdout.write('Your platform is not supported for glixer...EXITING\n');
          break;
      }

      process.stdout.write('Downloading Ruby Installer...');
      try {
        var installer = fs.createWriteStream(rubyInstallFile);
        http.get(dlurl, (res) => {
          res.pipe(installer);
          process.stdout.write('SUCCESS\n');
          installRuby();
        });
      } catch(err) {
        process.stdout.write('FAILED\n');
        process.stdout.write(err);
        process.stdout.write('Cannot continue initialization...EXITING\n');
        process.exit(1);
      }
    }

    function installRuby() {
      let msg = '!!!!!!Make sure you check all check boxed when prompted!!!!!!';
      process.stdout.write(msg + '\n');
      process.stdout.write('Running Ruby Installer...');
      try {
        childProcess.execSync(rubyInstallFile);
        process.stdout.write('SUCCESS');
        cleanFile();
      } catch(err) {
        process.stdout.write('FAILED\n');
        process.stdout.write(err);
        cleanFile();
        process.stdout.write('Cannot continue initialization...EXITING\n');
        process.exit(1);
      }
    }

    function cleanFile() {
      process.stdout.write('Deleting Temporary Installer...');
      try {
        fs.unlinkSync(rubyInstallFile);
        process.stdout.write('DONE\n');
      } catch(err) {
        process.stdout.write('FAILED\n');
        process.stdout.write('You may want to delete the following file:\n');
        process.stdout.write('\t' + rubyInstallFile + '\n');
        process.stdout.write('When this program exits\n');
      }
    }
  }

  function doRubyDev() {
    var devArchive = userInfo.homeDir + '\\Downloads\\RubyDevKit.sfx.exe';
    var devLoc = 'C:\\RubyDevKit'

    function checkDev() {
      process.stdout.write('Checking if DevKit is installed...');
      try {
        childProcess.execSync('gem install json --platform=ruby',
          {stdio: 'ignore'});
        process.stdout.write('INSTALLED\n');
      } catch(err) {
        process.stdout.write('NOT INSTALLED\n');
        installDev();
      }
    }

    function downloadDev() {
      var dlurl;
      switch(process.arch) {
        case 'x64':
          dlurl = 'https://dl.bintray.com/oneclick/rubyinstaller/DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe';
          break;
        case 'ia32':
          dlurl = 'https://dl.bintray.com/oneclick/rubyinstaller/DevKit-mingw64-32-4.7.2-20130224-1151-sfx.exe';
          break;
      }

      process.stdout.write('Downloading Ruby DevKit archive...');
      try {
        var archive = fs.createWriteStream(devArchive);
        http.get(dlurl, (res) => {
          res.pipe(archive);
          process.stdout.write('SUCCESS\n');
          extractDev();
        });
      } catch(err) {
        process.stdout.write('FAILED\n');
        process.stdout.write(err);
        process.stdout.write('Cannot continue initialization...EXITING\n');
        process.exit(1);
      }
    }

    function extractDev() {
      process.stdout.write('Extracting Ruby DevKit to "' + devLoc + '" (this may take a while)...');
      try {
        childProcess.execSync(devArchive + '-o "' + devLoc + '" -y');
        process.stdout.write('SUCCESS');
        installDev();
      } catch(err) {
        process.stdout.write('FAILED\n');
        process.stdout.write(err);
        cleanDev();
        process.stdout.write('Cannot continue initialization...EXITING\n');
        process.exit(1);
      }
    }

    function installDev() {
      process.stdout.write('Installing RubyDev...');
      try {
        childProcess.execSync('ruby ' + devLoc + '\\dk.rb init',
          {stdio: 'ignore'});
        childProcess.execSync('ruby ' + devLoc + '\\dk.rb install',
          {stdio: 'ignore'});
        process.stdout.write('SUCCESS\n');
        cleanDev();
      } catch(err) {
        process.stdout.write('FAILED\n');
        process.stdout.write(err);
        cleanDev();
        process.stdout.write('Cannot continue initialization...EXITING\n');
        process.exit(1);
      }
    }

    function cleanDev() {
      process.stdout.write('Deleting Unextracted Archive...');
      try {
        fs.unlinkSync(devArchive);
        process.stdout.write('DONE\n');
      } catch(err) {
        process.stdout.write('FAILED\n');
        process.stdout.write('You may want to delete the following file:\n');
        process.stdout.write('\t' + devArchive + '\n');
        process.stdout.write('When this program exits\n');
      }
    }
  }
};

function checkRoot() {
  process.stdout.write('Checking if root...');
  if (process.getuid() === 0) {
    process.stdout.write('TRUE\n');
    return;
  } else {
    process.stdout.write('FALSE\n');
    // Scrap this process, make another one with sudo.
    childProcess.spawnSync('sudo',  process.argv, {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    process.exit()
  }
}
glixer();
