(function (global) {
    var ajaxUtils = {};
  
    function getRequestObject() {
      if (window.XMLHttpRequest) return new XMLHttpRequest();
      else if (window.ActiveXObject) return new ActiveXObject("Microsoft.XMLHTTP");
      else {
        global.alert("Ajax not supported!");
        return null;
      }
    }
  
    ajaxUtils.sendGetRequest = function (requestUrl, responseHandler, isJsonResponse) {
      var request = getRequestObject();
      request.onreadystatechange = function () {
        if ((request.readyState == 4) && (request.status == 200)) {
          if (isJsonResponse == undefined) isJsonResponse = true;
          if (isJsonResponse) responseHandler(JSON.parse(request.responseText));
          else responseHandler(request.responseText);
        }
      };
      request.open("GET", requestUrl, true);
      request.send(null);
    };
  
    global.$ajaxUtils = ajaxUtils;
  })(window);
  