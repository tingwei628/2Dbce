var socket = null;
var connectUrl = location.hostname + ":" + location.port;
window.addEventListener("load", () => {
  loadjs();
  if (socket === null) {
    socket = io.connect(connectUrl, { "forceNew": true });
    socket.emit("connection");
  }
  socket.on("reload", () => {
    removejs();
    loadjs();
  });
});
function removejs() {
  var node = document.getElementById("load");
  if (node) {
    document.body.removeChild(node);
  }
}
function loadjs() {
  var script = document.createElement('script');
  script.id = "load";
  script.src = "/js/index.min.js";
  document.body.appendChild(script);
}

window.addEventListener("beforeunload", () => {
  if (socket) {
    socket.emit("byebye");
    socket.disconnect(true);
  }
});
