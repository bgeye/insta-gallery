var Tools = (function () {

    var get = function (reqUrl,callback) {

          var request = new XMLHttpRequest();
          request.open('GET',reqUrl,true);

          request.onload = function(){
              if(request.status >= 200 && request.status < 400){
                  var resData = JSON.parse(request.responseText);
//                  console.log(resData);
//                  getImages(resData);
                  callback(resData);
              }else{
                  console.log('Server Error');
              }
          };

          request.onerror = function(){
              console.log('server not reachable');
          };

          request.send();

    };

    return{
        get: get
    };

})();