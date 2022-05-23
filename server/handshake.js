// Establishing handshake for server side
// local port 3000
const webSocketServerPort = 8000;
const webSocketServer = require('websocket').server;
const { json } = require('body-parser');
const http = require('http');
const { Obj } = require('prelude-ls');
const server = http.createServer();
server.listen(webSocketServerPort);
const wsServer = new webSocketServer(
    { httpServer: server}
);


const clients = {};
// create unique ID's for each client
const createUniqueID = () => {
    const s4 = () => Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};
// function to broadcast client changes to ALL clients connected to server
const broadcastMsg = (json) => {
    Object.keys(clients).map((client) => {
        clients[client].sendUTF(json);
    });
}

wsServer.on('request', function(request)    
    {
        var userID = createUniqueID();
        console.log((new Date()) + 'Received a new connection from origin '+ request.origin + '-');
        const connection = request.accept(null, request.origin);
        clients[userID] = connection;
        console.log('user: '+userID + ' connected in' + Object.getOwnPropertyNames(clients));
        // if server receive messages from user
        connection.on('message', function(msg)
            {
                //parse the message received
                const clientMsg = JSON.parse(msg.utf8Data);
                console.log(clientMsg.value);
                const json = {value:clientMsg.value }
                broadcastMsg(JSON.stringify(json))
            }
        );
        // client closes connections
        connection.on('close', function(connection)
        {
            console.log('user '+userID+ ' disconnected.');
            delete clients[userID];
        });
    }
);