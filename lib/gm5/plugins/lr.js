import socketio from "socket.io";
import server from "../utils/server";
export default function (options) {
  var socket = null;
  const io = socketio(server);
  server.listen(process.env.PORT || 3000);
  return {
    name: "lr",
    ongenerate: () => {
      io.on("byebye", function () {
        socket = null;
      });

      if (socket === null) {
        io.on("connection", (_socket) => {
          socket = _socket;
        });
      }
      if (socket !== null) {
        console.log("emit reload");
        socket.emit("reload");
      }
    }
  }
}