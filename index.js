const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

app.use(express.static('static'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
var startTime = +new Date();
wss.on('connection', function connection(ws) {
    ws.on('message',()=>{
        startTime = +new Date();
    });
    ws.on('close',()=>{
        clearInterval(notifier);
    })
    function notifyHandler(){
        if(ws.readyState == 3)return clearInterval(notifier);
        ws.send((+new Date () - startTime).toString());
    }
    var notifier = setInterval(notifyHandler,20);
});

server.listen(80);