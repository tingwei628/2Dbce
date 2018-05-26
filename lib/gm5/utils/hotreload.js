/**
 * load js in html on the client side
 */
function insertjs() {
  var script = document.createElement("script");
  script.id = "load";
  script.src = "/js/index.min.js";
  script.type = "text/javascript";
  document.body.appendChild(script);
}
function reloadjs() {
  var script2 = document.getElementById("load");
  if (script2) {
    document.body.removeChild(script2);
    insertjs();
  }
}


/************USE EVENTSOURCE*****************/
insertjs();
window.___hashkey___ = "";
if (!!window.EventSource) {

  var timeout = 500; // 0.5s
  var source = null;
  function createEventSource() {
    source = new EventSource("/rollup-plugin-hotreload");
    source.onmessage = function (e) {
      if (e.data && (window.___hashkey___ === "" || window.___hashkey___ !== e.data)) {
        reloadjs();
        window.___hashkey___ = e.data;
      }
    };
    source.onerror = function (e) {
      source.close();
    };
  }
  // timeout to disconnect
  try {
    createEventSource();
  } catch (err) {
    throw err;
  }
} else {
  throw new Error("Browser does not support EventSource \
  Use EventSource Polyfill instead!");
}

