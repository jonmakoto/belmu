require('shelljs/global');

if (test('-e', '../../src/css/_base')) { /* do something with dir */ }else{mkdir('../../src/css/_base');};
if (test('-e', '../../src/css/_engine')) { /* do something with dir */ }else{mkdir('../../src/css/_engine');};
if (test('-e', '../../src/css/_layout')) { /* do something with dir */ }else{mkdir('../../src/css/_layout');};
if (test('-e', '../../src/css/_modules')) { /* do something with dir */ }else{mkdir('../../src/css/_modules');};
if (test('-e', '../../src/css/_base')) { /* do something with dir */ }else{mkdir('../../src/css/_utility');};

cp('-Rf', './css/_base', '../../src/css');
cp('-Rf', './css/_engine', '../../src/css');
cp('-Rf', './css/_layout', '../../src/css');
cp('-Rf', './css/_module', '../../src/css');
cp('-Rf', './css/_utility', '../../src/css');
cp('./css/belmu.css', '../../src/css/');
