/**
 * load js in html on the client side
 */
function insertjs() {
  //* READ EACH JS FILE*//
  var script = document.createElement("script");
  script.id = "rph---id";
  script.src = "/js/index.min.js";
  script.type = "text/javascript";
  document.body.appendChild(script);
}
function reloadjs() {
  var script2 = document.getElementById("rph---id");
  if (script2) {
    document.body.removeChild(script2);
    insertjs();
  }
}


/************USE EVENTSOURCE*****************/
insertjs();
window.___hashkey___ = "";
if (!!window.EventSource) {

  var timeout = 500; // 3s
  var source = null;
  window.___lastupdate___ = new Date();
  function createEventSource() {
    source = new EventSource("/rollup-plugin-hotreload");
    source.onmessage = function (e) {
      if (e.data && (window.___hashkey___ === "" || window.___hashkey___ !== e.data)) {
        reloadjs();
        window.___hashkey___ = e.data;
        window.___lastupdate___ = new Date();
      }
    };
    source.onerror = function (e) {
      source.close();
    };
  }
  // timeout to disconnect
  function checkConnection() {
    if (source.readyState === 2 && new Date() - window.___lastupdate___ > timeout / 2) {
      createEventSource();
    }
  }
  try {
    createEventSource();
    setInterval(checkConnection, timeout);
  } catch (err) {
    throw err;
  }
} else {
  throw new Error("Browser does not support EventSource \
  Use EventSource Polyfill instead!");
}

