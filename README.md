# real-time-writer
Multiple clients can edit text in real time.
The server broadcasts changes to all clients.
This project utilize websocket to send and receive messages from client and server.

To run server:
  node handshake.js

To run client(s):
  npm start
  
Future implementations:

  Show users id currently editing the textbox.
  
  Show which user made which changes
