var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
require('heroku-self-ping').default("http://tele-bot-121-1.herokuapp.com");

const PORT = 8080;


http.listen(process.env.PORT || 8080, function () {
  console.log(`Listening on ${ PORT }`);
});
