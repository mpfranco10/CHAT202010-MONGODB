
let socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};

socketApi.io = io;


// Database Name
const dbName = 'myproject';

const MongoClient = require('mongodb').MongoClient;

var conn = MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true });


let messages = [{
    id: 1,
    text: "Welcome to chat room",
    author: "Chat admin"
}];

//Vaciar y poner el primer mensaje
conn.then(client => {
    client.db(dbName).collection("documents").remove({ });
    client.db(dbName).collection("documents").insertOne({
        id: 1,
        text: "Welcome to chat room",
        author: "Chat admin"
    });
});

socketApi.messages = messages;

io.on('connection', function (socket) {
    io.sockets.emit('messages', messages);

    socket.on("new-message", data => {
        socketApi.sendNotification(data)
    })
});

socketApi.sendNotification = data => {
    console.log(data);
    messages.push(data);
    conn.then(client => {
        client.db(dbName).collection("documents").insertOne(data);
        //client.db(dbName).collection("documents").find({}).toArray((err, info) => {
        //    console.log(info);
        //});
    });
    io.sockets.emit('messages', messages);
}

module.exports = socketApi;