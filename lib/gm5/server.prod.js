import server from "./utils/server.js";
import socketio from "socket.io";


if (!socketio || !server)
  throw new SyntaxError("both socket and server are needed");
const io = socketio(server);
server.listen(process.env.PORT || 3000);
console.log("start");
