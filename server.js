'use strict';

var cluster = require('cluster')
  , express = require('express')
  , app = express()
  , path = require('path')
  , router = express.Router()
;

if (cluster.isMaster && app.get('env') === 'production') {
  var cpuCount = require('os').cpus().length;
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  // Listen for dying workers
  cluster.on('exit', function(worker) {
    console.log('Worker ' + worker.id + ' exit');
    cluster.fork();
  });
} else {
  var workerId = cluster.worker ? cluster.worker.id : 1;
  app.use(router)
  
  app.use('/', express.static('./'));
  // index page 
  router.all('/', function (req, res, next) {  
      res.sendFile(path.join(__dirname+'/index.html'));
  });

  app.listen('8888', function(err) {
    if (err) throw err;
    console.log('Vocus UI started on port ' + '8888' + ' (' + app.get('env') + ') cluster.worker.id:', workerId);
  });
  module.exports = app;
}
