import http from "http";
import path from "path";
import fs from "fs";
import { mimetypes } from "./constant";

function parseurl(url) {
  return url === "/" ? "index.html" : url.replace(/^\/|\/$/g, "");
}
// get file extension
function getext(url) {
  var filepath = parseurl(url);
  return path.extname(filepath);
}
function getfilepath(rootdir, url) {
  return `${rootdir}/${url}`;
}

var serverWrapper = {
  server
};
var server = http.createServer(function (req, res) {
  var url = req.url;

  if (req.url === "/favicon.ico") {
    res.writeHead(200, { 'Content-Type': 'image/x-icon' });
    res.end();
    return;
  }

  var rootDir = path.join(__dirname, "./build");
  var filepath = getfilepath(rootDir, parseurl(url));

  if (!fs.existsSync(filepath)) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("This file is NOT FOUND!");
  } else {
    var ext = getext(url);
    // remove cache 301
    // check if file dir find
    // check if not found and redirect to index.html
    fs.readFile(filepath, function (err, data) {
      var resData = null;
      if (err) {
        res.writeHead(500, { "Content-Type": "text-plain" });
        resData = err.message;
      } else {
        // Cache-Control: no-store, no-cache, must-revalidate
        // Expires: Thu, 01 Jan 1970 00:00:00 GMT
        res.writeHead(200, { "Content-Type": mimetypes[ext], 'Cache-Control': 'no-cache' });
        resData = data;
      }
      res.end(resData);
    });
  }
});
server.listen(process.env.PORT || 3000, function () {
  console.log("3000 start");
});
export default server;