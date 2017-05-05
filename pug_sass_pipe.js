var spawn = require('child_process').spawn;
var chalk = require('chalk')

var pug = spawn('pug', ['./source/pug' , '--out', './app', '--watch', '--pretty']);
var sass = spawn('sass', ['--watch', './source/sass/main.sass:./app/css/main.css']);

//sass and pug data output goes here
sass.stdout.on('data', data=> {
  console.log(`sass stdout: ${data}`);
} )

pug.stdout.on('data', data=> {
	console.log(`pug stdout: ${data}`);
} )


//sass and pug error codes go here
sass.stderr.on('data', data=> {
  console.log(`sass stderr: ${data}`);
});

pug.stderr.on('data', data=> {
	console.log(`pug stderr: ${data}`);
});


//sass nad pug close codes go here
sass.on('close', code=> {
  console.log(`sass child process exited with code ${code}`);
});

pug.on('close', code=> {
	console.log(`pug child process exited with code ${code}`);
});
