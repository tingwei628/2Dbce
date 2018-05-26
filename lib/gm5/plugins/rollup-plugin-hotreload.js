import server from "../utils/server";
import crypto from "crypto";
var _hashkey = crypto.randomBytes(6).toString('hex');
var obj = { isReload: false, reqNow: null, hashKey: _hashkey };
export default function () {
  function sockethandlerTEST() {
    this.hashKey = crypto.randomBytes(6).toString('hex');
    server.on("request", function (req, res) {
      if (req.url === "/rollup-plugin-hotreload") {
        this.reqNow = req;
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        });
        res.write("data: " + this.hashKey + "\n\n");
      }
    }.bind(this));

    if (this.reqNow !== null) {
      this.reqNow.on('close', function () {
        console.log("close isReload");
      });
    }
  }
  return {
    name: "rollup-plugin-hotreload",
    ongenerate: sockethandlerTEST.bind(obj)
  };
}
