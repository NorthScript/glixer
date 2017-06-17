var childProcess = require('child_process');
var fs = require('fs');
var http = require('http');
var os = require('os');
var userInfo = os.userInfo();

function glixer() {
  var args = process.argv.slice(2);
  var command = glixer[args[0]];
  if (typeof command === 'function') command();
  else console.log('Command not found.');
}

glixer.init = function() {
   glixer.init.native();
};

glixer.init.afterNative = function() {
   glixer.init.gems();
   glixer.init.npm();
   glixer.init.finish();
};

glixer.init.gems = function() {
   glixer.init.gems.check();
   glixer.init.bundler();
};

glixer.init.gems.check = function() {
   process.stdout.write('Getting list of installed gems...');
   try {
      var result = childProcess.execSync('gem list', {encoding: 'utf-8'});
      console.log('DONE');
   } catch(err) {
      console.log('FAILED');
      console.log(err);
      console.log('Cannot continue initialization...EXITING');
      process.exit(1);
   }

   var tbinstalled = [];
   var nativegems = [
      'bundler',
      'jekyll'
   ];

   console.log('Checking gem dependencies:');
   for (var i = 0; i < nativegems.length; i++) {
      process.stdout.write('\t' + nativegems[i] + '...');
      if (result.indexOf(nativegems[i] + ' (') >= 0) {
         console.log('INSTALLED');
      } else {
         tbinstalled.push(nativegems[i]);
         console.log('NOT INSTALLED');
      }
   }

   if (tbinstalled.length > 0) {
      glixer.init.gems.install(tbinstalled);
   }
};

glixer.init.gems.install = function(list) {
   process.stdout.write('Installing gems...');
   try {
     childProcess.execSync('gem install ' + list.join(' '), 'utf-8');
     console.log('DONE');
   } catch(err) {
     console.log('FAILED');
     console.log(err);
     console.log('Cannot continue initialization...EXITING');
     process.exit(1);
   }
};

glixer.init.bundler = function() {
   process.stdout.write('Running bundler install...');
   try {
     childProcess.execSync('bundler install', 'utf-8');
     console.log('DONE');
   } catch(err) {
     console.log('FAILED');
     console.log(err);
     console.log('Cannot continue initialization...EXITING');
     process.exit(1);
   }
};

glixer.init.npm = function() {
   glixer.init.npm.global();
   glixer.init.npm.local();
};

glixer.init.npm.global = function() {
   process.stdout.write('Getting list of installed global NPM packages...');
   try {
      var npmglobal = childProcess.execSync('npm list -g', 'utf-8');
      console.log('DONE');
   } catch(err) {
      console.log('FAILED');
      console.log(err);
      console.log('Cannot continue initialization...EXITING');
      process.exit(1);
   }
   var tbinstalled = [];
   var npmdep = [
      'gulp'
   ];

   console.log('Checking global NPM dependencies:');
   for (var i = 0; i < npmdep.length; i++) {
      process.stdout.write('\t' + npmdep[i] + '...');
      if (npmglobal.indexOf(npmdep[i]) >= 0) {
         console.log('INSTALLED');
      } else {
         tbinstalled.push(npmdep[i]);
         console.log('NOT INSTALLED');
      }
   }

   if (tbinstalled.length > 0) {
      glixer.init.npm.global.install(tbinstalled);
   }
};

glixer.init.npm.global.install = function(list) {
   process.stdout.write('Installing global NPM dependencies...\n');
   try {
      childProcess.execSync('npm install -g ' + tbinstalled.join(' '),
         { stdio: 'ignore' });
      console.log('SUCCESS');
   } catch(err) {
      console.log('FAILED');
      console.log(err);
      console.log('Cannot continue initialization...EXITING');
      process.exit(1);
   }
};

glixer.init.npm.local = function() {
   process.stdout.write('Running npm install...');
   try {
      childProcess.execSync('npm install', {stdio: 'ignore'});
      console.log('SUCCESS');
   } catch(err) {
      console.log('FAILED');
      console.log(err);
      console.log('Cannot continue initialization...EXITING');
      process.exit(1);
   }
};

glixer.init.finish = function() {
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
   console.log('All set! run "gulp serve" and start editing!');
};

glixer.init.native = function() {
   var nativeFunction = glixer.init.native[process.platform];
   if (typeof nativeFunction === 'function') {
      nativeFunction();
   } else {
      console.log('Platform "' + process.platform  + '" is not supported.' +
        '...EXITING');
      process.exit(1);
   }
};

glixer.init.native.linux = function() {
   linux.checkRoot();
   linux.checkDistro();
};

var linux = glixer.init.native.linux;

linux.checkRoot = function() {
  if (process.getuid() !== 0) {
    // Scrap this process, make another one with sudo.
    childProcess.spawnSync('sudo',  process.argv, {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    process.exit()
  }
}

linux.checkDistro = function() {
   process.stdout.write('Checking Distro Support...');
   var data;
   try {
      data = fs.readFileSync('/etc/os-release', 'utf-8');
   } catch(err) {
      console.log('FAILED');
      console.log(err);
      console.log('Cannot continue initialization...EXITING');
   }

   var id = getProp('ID=');
   var prop = linux[id];
   if (typeof prop === 'function') {
      console.log('SUPPORTED');
      return prop();
   }

   var id_like = getProp('ID_LIKE=');
   prop = linux[id_like];
   if (typeof prop === 'function') {
      console.log('SUPPORTED');
      return prop();
   }

   console.log('NOT SUPPORTED');
   console.log('Distro ' + id + ' and ' + id_like + ' is not supported' +
      '...EXITING');

   function getProp(string) {
      let startIndex = data.indexOf(string) + string.length;
      let endIndex = data.indexOf('\n', startIndex);
      return data.slice(startIndex, endIndex);
   }
};

linux.debian = function() {
   var dep = [
      'git',
      'zlib1g-dev',
      'build-essential',
      'ruby',
      'ruby-dev'
   ];
   linux.debian.checkDep(dep);
};

linux.debian.checkDep = function(deps) {
   process.stdout.write('Getting List of Installed Packages...');

   try {
      var result = childProcess.execSync('dpkg -l', {encoding: 'utf-8'});
      console.log('DONE');
   } catch(err) {
      console.log('FAILED')
      console.log(err);
      console.log('Cannot continue initialization...EXITING');
      process.exit(1);
   }

   var tbinstalled = [];

   console.log('Checking native dependencies:');
   for (var i = 0; i < deps.length; i++) {
      process.stdout.write('\t' + deps[i] + '...');

      let ifNotInstalledOne = result.indexOf(deps[i] + ' ') === -1;
      let ifNotInstalledTwo = result.indexOf(deps[i] + ':') === -1;

      if (ifNotInstalledOne && ifNotInstalledTwo) {
        console.log('NOT INSTALLED');
        tbinstalled.push(deps[i]);
      } else {
        console.log('INSTALLED');
      }
    }

    if (tbinstalled.length > 0) linux.debian.installDep(tbinstalled);
    else glixer.init.afterNative();
};

linux.debian.installDep = function(tbinstalled) {
   process.stdout.write('Updating apt cache...');
    try {
      childProcess.execSync('apt-get update');
      console.log('SUCCESS');
    } catch(err) {
      console.log('FAILED')
      console.log(err);
      console.log('Cannot continue initialization...EXITING');
      process.exit(1);
    }

    process.stdout.write('Installing Native Dependencies...')
    try {
      childProcess.execSync('apt-get install -y ' + tbinstalled.join(' '));
      console.log('SUCCESS');
    } catch(err) {
      console.log('FAILED');
      console.log(err);
      console.log('Cannot continue initialization...EXITING');
      process.exit(1);
    }

    glixer.init.afterNative();
};
linux.ubuntu = linux.debian;


// Windows Initialization (Some serious complicated stuff here)
glixer.init.native.win32 = function() {
   windows.ruby();
};

var windows = glixer.init.native.win32;

windows.ruby = function() {
   windows.ruby.check();
};

windows.ruby.installer = userInfo.homedir + '\\Downloads\\rubyinstaller.exe';

windows.ruby.check = function() {
   process.stdout.write('Checking Ruby installation...');
   childProcess.exec('ruby -v', windows.ruby.check.callback);
};

windows.ruby.check.callback = function(err) {
   if (err) {
      console.log('NOT INSTALLED');
      windows.ruby.download();
      return;
   }

   console.log('INSTALLED');
   windows.rubyDev();
};

windows.ruby.download = function(sourceURL) {
   var dlurl;
   switch(process.arch) {
     case 'x64':
       dlurl = 'http://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.3.3-x64.exe';
       break;
     case 'ia32':
       dlurl = 'http://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.3.3.exe';
       break;
     // In the event an ARM Windows machine pops up.
     default:
       console.log('Your platform is not supported for glixer...EXITING');
       break;
   }

   if (typeof sourceURL === 'string') {
      dlurl = sourceURL;
   }

   process.stdout.write('Downloading Ruby Installer...');
   http.get(dlurl, windows.ruby.download.callback);
};

windows.ruby.download.callback = function(res) {
   if (res.statusCode === 302) {
      console.log('REDIRECTED');
      windows.ruby.download(res.headers.location);
      return;
   }

   if (res.statusCode !== 200) {
      console.log('FAILED');
      console.log('HTTP Error ' + statusCode + ': ' + res.statusMessage);
      console.log('Cannot continue initialization...EXITING');
      process.exit(1);
   }
   var output = fs.createWriteStream(windows.ruby.installer);
   var file = res.pipe(output);
   output.on('finish', finish);

   function finish() {
      console.log('DONE');
      windows.ruby.install();
   }
};

windows.ruby.install = function() {
   let msg = '!!!!!!Make sure you check all check boxes when prompted!!!!!!';
   console.log(msg);
   console.log('Installing Ruby...');

   try {
      childProcess.execSync(windows.ruby.installer, {stdio: 'ignore'});
      console.log('DONE');
      windows.ruby.clean();
      windows.rubyDev();
   } catch(err) {
      console.log('FAILED');
      console.log(err);
      windows.ruby.clean();
      console.log('Cannot continue initialization...EXITING');
      process.exit(1);
   }
};

windows.ruby.clean = function() {
   process.stdout.write('Deleting Temporary Installer...');
   try {
      fs.unlinkSync(windows.ruby.installer);
      console.log('DONE');
   } catch(err) {
      console.log('FAILED');
      console.log('You may want to delete the following file:');
      console.log('\t' + windows.ruby.installer);
      console.log('When this program exits');
   }
};

windows.rubyDev = function() {
   windows.rubyDev.check();
};

windows.rubyDev.location = 'C:\\RubyDevKit';
windows.rubyDev.archive =  windows.rubyDev.location + '\\RubyDevKit.sfx.exe';

windows.rubyDev.check = function() {
   process.stdout.write('Checking if Ruby DevKit is installed...');
   childProcess.exec('gem install json --platform=ruby',
      {stdio: 'ignore'}, windows.rubyDev.check.callback);
};

windows.rubyDev.check.callback = function(err) {
   if (err) {
      console.log('NOT INSTALLED');
      windows.rubyDev.makeFolder();
      return;
   }

   console.log('INSTALLED');
   glixer.init.afterNative();
};

windows.rubyDev.makeFolder = function() {
   process.stdout.write('Making RubyDevKit folder...');
   fs.mkdir(windows.rubyDev.location, windows.rubyDev.makeFolder.callback);
};

windows.rubyDev.makeFolder.callback = function(err) {
   if (err && err.code !== 'EEXIST') {
      console.log('FAILED');
      console.log(err);
      console.log('Cannot continue initialization...EXITING');
      process.exit(1);
   }

   console.log('DONE');
   windows.rubyDev.download();
};

windows.rubyDev.download = function(sourceURL) {

   var dlurl;
   switch(process.arch) {
      case 'x64':
      dlurl = 'http://dl.bintray.com/oneclick/rubyinstaller/DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe';
      break;
      case 'ia32':
      dlurl = 'http://dl.bintray.com/oneclick/rubyinstaller/DevKit-mingw64-32-4.7.2-20130224-1151-sfx.exe';
      break;
   }

   if (typeof sourceURL === 'string') {
      dlurl = sourceURL;
   }

   process.stdout.write('Downloading Ruby DevKit archive...');
   http.get(dlurl, windows.rubyDev.download.callback);
};

windows.rubyDev.download.callback = function(res) {

   if (res.statusCode === 302) {
      console.log('REDIRECTED');
      windows.rubyDev.download(res.headers.location);
      return;
   }

   if (res.statusCode !== 200) {
      console.log('FAILED');
      console.log('HTTP Error ' + res.statusCode + ': ' + res.statusMessage);
      console.log('Cannot continue initialization...EXITING');
      process.exit(1);
   }
   var output = fs.createWriteStream(windows.rubyDev.archive);
   var file = res.pipe(output);
   file.on('finish', finish);

   function finish() {
      console.log('DONE');
      windows.rubyDev.extract();
   }
};

windows.rubyDev.extract = function() {
   process.stdout.write('Extracting Ruby DevKit to "' +
      windows.rubyDev.location + '" (this may take a while)...');

   var cb = windows.rubyDev.extract.callback;
   childProcess.exec(windows.rubyDev.archive + ' -o"' +
      windows.rubyDev.location + '" -y', cb);
};

windows.rubyDev.extract.callback = function(err) {
   if (err) {
      console.log('FAILED');
      console.log(err);
      windows.rubyDev.clean();
      console.log('Cannot continue initialization...EXITING');
      process.exit(1);
   }

   console.log('DONE');
   windows.rubyDev.install();
};

windows.rubyDev.install = function() {
   process.stdout.write('Installing RubyDev...');
   try {
     childProcess.execSync('ruby "' + windows.rubyDev.location + '\\dk.rb" init',
       {
          stdio: 'ignore',
          cwd: windows.rubyDev.location
       });
     childProcess.execSync('ruby "' + windows.rubyDev.location + '\\dk.rb" install',
       {
          stdio: 'ignore',
          cwd: windows.rubyDev.location
       });
     console.log('DONE');
     windows.rubyDev.clean();
     glixer.init.afterNative();
   } catch(err) {
     console.log('FAILED');
     console.log(err);
     windows.rubyDev.clean();
     console.log('Cannot continue initialization...EXITING');
     process.exit(1);
   }
};

windows.rubyDev.clean = function() {
   process.stdout.write('Deleting Unextracted Archive...');
   try {
     fs.unlinkSync(windows.rubyDev.archive);
     console.log('DONE');
   } catch(err) {
     console.log('FAILED');
     console.log('You may want to delete the following file:');
     console.log('\t' + windows.rubyDev.archive);
     console.log('When this program exits');
  }
};

glixer();
