import server from "../utils/server";
import socketio from "socket.io";

export default function () {
  function sockethandler(io) {
    io.on("byebye", function () {
      this.socket = null;
    });

    if (this.socket === null) {
      io.on("connection", (_socket) => {
        this.socket = _socket;
      });
    }
    if (this.socket !== null) {
      this.socket.emit("reload");
    }
  }

  function inject(socketio, server) {
    if (!socketio || !server)
      throw new SyntaxError("both socket and server are needed");
    const io = socketio(server);
    server.listen(process.env.PORT || 3000);
    return io;
  }

  var io = inject(socketio, server);
  var obj = { socket: null };
  return {
    name: "rollup-plugin-hotreload",
    ongenerate: sockethandler.bind(obj, io)
  };
}