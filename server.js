var Hapi = require('hapi');
var Vision = require('vision');
var Path = require('path');
var Inert = require('inert');

const public_files = {
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'app')
      }
    }
  }
};

const server_internals = {
    port: process.env.PORT || 8080
    ,host: process.env.IP || "0.0.0.0"
    ,labels: ['http']
};

const server = new Hapi.Server(public_files);

server.connection(server_internals);
var vendor_page = {
  method: 'GET'
  ,path: '/bower_components/{bower_files*}'
  ,config: {
    handler: {
      directory: {
        path: __dirname + '/app/bower_components'
        ,index: false
      }

    }
  }
}

var default_page = {
    method: 'GET'
    ,path: '/{html*}'
    ,config:{
      handler:{
        directory: {
          path: __dirname+ '/app'
          ,index: false

        }
      }
    }
};


var default_redirect = {
  method: 'GET'
  ,path: '/'
  ,config: {
    handler:(req, reply)=> {
      reply.redirect('/index.html');
    }
  }
};

server.register([
  Vision
  ,Inert
  ], (err)=> {
    if(err)
      console.error(err);
    server.route([default_page, default_redirect]);
});

server.start((req, res)=> {
    console.log('server has started');
    console.log('\n\t=> ' + process.env.IP + ':' + process.env.PORT); 
});
