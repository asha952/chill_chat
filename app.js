//app.js
const express = require('express');
const app = express();
const server = require('http').Server(app);

//Socket.io
const io = require('socket.io')(server);
let onlineUsers = {};
io.on("connection", (socket) => {
  require('./sockets/chat.js')(io, socket, onlineUsers);
  console.log("🔌 New user connected! 🔌");
})

const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.render('index.handlebars');
})

  /*server.listen('3000', () => {
    console.log('Server listening on Port 3000');
  */
    server.listen(process.env.PORT || 3000, function () {
      console.log("SERVER STARTED PORT: 3000");
    });
