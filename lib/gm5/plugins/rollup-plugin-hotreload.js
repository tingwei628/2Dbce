import { randomBytes } from "crypto";
import {
  readFile,
  writeFile,
  createReadStream,
  createWriteStream
} from "fs";
import { join } from "path";

var _hashkey = randomBytes(6).toString('hex');
var obj = { reqNow: null, hashKey: _hashkey };
var rphPath = "/rollup-plugin-hotreload";
export function rph(options) {
  if (!options.server)
    throw new SyntaxError("Server is needed!");
  if (!options.templateHtmlPath)
    throw new SyntaxError("templatePath html is needed!");

  var is_stop_rph = !!options.isStopRPH;
  var server = options.server;
  function sockethandlerTEST() {
    if (is_stop_rph)
      return;
    this.hashKey = randomBytes(6).toString('hex');
    server.on("request", function (req, res) {
      if (req.url === rphPath) {
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
        console.warn("close isReload");
      });
    }
  }
  return {
    name: "rollup-plugin-hotreload",
    ongenerate: sockethandlerTEST.bind(obj),
    onwrite: function (opts) {
      // ONLY ONE BUNDLE
      var bundlePath = opts.file;
      readFile(join(__dirname, options.templateHtmlPath), "utf8", function (err, htmlString) {
        if (err) throw err;
        // copy ./hotreload.js to ./build/js/hotreload.js
        createReadStream(join(__dirname, "./plugins/hotreload.js")).pipe(createWriteStream(join(__dirname, "./build/js/hotreload.js")));
        /*
          Inspired by rollup-plugin-generate-html-template@bengsfort
          How to append js in html
        */
        var newHtmlString = [
          htmlString.slice(0, htmlString.indexOf("</body>")),
          `<script type="text/javascript" src="/js/hotreload.js"></script>\n`,
          htmlString.slice(htmlString.indexOf("</body>"), htmlString.length)
        ].join("");
        writeFile(join(__dirname, "./build/index.html"), newHtmlString, function (err) {
          if (err) throw err;
        });
      });
    }
  };
}