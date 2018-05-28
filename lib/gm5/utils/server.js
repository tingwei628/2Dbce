import http from "http";
import path from "path";
import fs from "fs";
import { mimetypes } from "./constant";
import { exludePath } from "../plugins/rollup-plugin-hotreload";

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

/*
    BEFORE RENDER the HTML, first build it up with different tag
    (Support inject script into html plz...)
*/
var serverWrapper = {
  server
};
var server = http.createServer(function (req, res) {
  var url = req.url;

  if (req.url === exludePath)
    return;

  if (req.url === "/favicon.ico") {
    req.writeHead(200, { 'Content-Type': 'image/x-icon' });
    req.end();
    return;
  }

  var rootDir = path.join(__dirname, "./build");
  var filepath = getfilepath(rootDir, parseurl(url));

  if (!fs.existsSync(filepath)) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("This file is NOT FOUND!");
    res.end();
  }

  var ext = getext(url);
  // remove cache 301
  // check if file dir find
  // check if not found and redirect to index.html

  fs.readFile(filepath, function (err, data) {
    if (err) {
      res.writeHead(500, { "Content-Type": "text-plain" });
      res.write(err.message);
      res.end();
    }
    // Cache-Control: no-store, no-cache, must-revalidate
    // Expires: Thu, 01 Jan 1970 00:00:00 GMT
    res.writeHead(200, { "Content-Type": mimetypes[ext], 'Cache-Control': 'no-cache' });
    res.write(data);
    res.end();
  });
});
server.listen(process.env.PORT || 3000, function () {
  console.log("3000 start");
});
export default server;