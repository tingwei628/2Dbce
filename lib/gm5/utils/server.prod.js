// import socketio from "socket.io";
// import http from "http";
// import path from "path";
// import fs from "fs";

// var mimetypes = {
//   ".ico": "image/x-icon",
//   ".html": "text/html",
//   ".js": "text/javascript",
//   ".css": "text/css",
//   "json": "application/json"
// };

// function parseurl(url) {
//   return url === "/" ? "index.html" : url.replace(/^\/|\/$/g, "");
// }
// // get file extension
// function getext(url) {
//   var filepath = parseurl(url);
//   return path.extname(filepath);
// }
// function getfilepath(rootdir, url) {
//   return `${rootdir}/${url}`;
// }

// var server = http.createServer(function (req, res) {
//   var url = req.url;
//   var rootDir = path.join(__dirname, "../build");
//   var filepath = getfilepath(rootDir, parseurl(url));

//   if (!fs.existsSync(filepath)) {
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.write("This file is NOT FOUND!");
//     res.end();
//     return;
//   }

//   var ext = getext(url);
//   // remove cache 301
//   // check if file dir find
//   // check if not found and redirect to index.html

//   fs.readFile(filepath, function (err, data) {
//     if (err) {
//       res.writeHead(500, { "Content-Type": "text-plain" });
//       res.write(err.message);
//       res.end();
//     }

//     // Cache-Control: no-store, no-cache, must-revalidate
//     // Expires: Thu, 01 Jan 1970 00:00:00 GMT
//     res.writeHead(200, { "Content-Type": mimetypes[ext] });
//     res.write(data);
//     res.end();
//   });
// });

// if (!socketio || !server)
//   throw new SyntaxError("both socket and server are needed");
// const io = socketio(server);
// server.listen(process.env.PORT || 3000);

/*
   NOTE: relative path executed with build/ 
*/
"use strict";
var _socket = require("socket.io"),
  _socket2 = _interopRequireDefault(_socket),
  _http = require("http"),
  _http2 = _interopRequireDefault(_http),
  _path = require("path"),
  _path2 = _interopRequireDefault(_path),
  _fs = require("fs"),
  _fs2 = _interopRequireDefault(_fs);
function _interopRequireDefault(a) {
  return a && a.__esModule ? a : { default: a };
}
var mimetypes = {
  ".ico": "image/x-icon",
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  json: "application/json"
};
function parseurl(a) {
  return "/" === a ? "index.html" : a.replace(/^\/|\/$/g, "");
}
function getext(a) {
  var b = parseurl(a);
  return _path2.default.extname(b);
}
function getfilepath(a, b) {
  return a + "/" + b;
}
var server = _http2.default.createServer(function (a, b) {
  var c = a.url,
    d = _path2.default.join(__dirname, "../build"),
    e = getfilepath(d, parseurl(c));
  if (!_fs2.default.existsSync(e))
    return (
      b.writeHead(404, { "Content-Type": "text/plain" }),
      b.write("This file is NOT FOUND!"),
      void b.end()
    );
  var f = getext(c);
  _fs2.default.readFile(e, function (g, h) {
    g &&
      (b.writeHead(500, { "Content-Type": "text-plain" }),
        b.write(g.message),
        b.end()),
      b.writeHead(200, { "Content-Type": mimetypes[f] }),
      b.write(h),
      b.end();
  });
});
if (!_socket2.default || !server)
  throw new SyntaxError("both socket and server are needed");
var io = (0, _socket2.default)(server);
server.listen(process.env.PORT || 3000);

