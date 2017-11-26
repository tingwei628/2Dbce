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

var server = http.createServer(function (req, res) {
  var url = req.url;
  var rootDir = path.join(__dirname, "./build");
  var filepath = getfilepath(rootDir, parseurl(url));

  if (!fs.existsSync(filepath)) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("This file is NOT FOUND!");
    res.end();
    return;
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
    res.writeHead(200, { "Content-Type": mimetypes[ext] });
    res.write(data);
    res.end();
  });
});

export default server;