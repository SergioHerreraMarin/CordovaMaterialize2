
// GUI

(function($){
  $(function(){
    $('.sidenav').sidenav();
    
  }); // end of document ready

  $('#loadArticleButton').click(articulos)
  $('#openCameraButton').click(openCamera)

})(jQuery); // end of jQuery name space



// Cordova
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  // Cordova is now initialized. Have fun!

  console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
  $('.tabs').tabs({"swipeable":true});
  $('.collection-item').tabs({"swipeable":true});
}


function articulos(){

  $.ajax({
    method: "GET",
    url: "https://api.spaceflightnewsapi.net/v3/articles?_limit=3",
    dataType: "json",   // necessitem això pq ens retorni un objecte JSON
  }).done(function (msg) {
    for(let item in msg) {
      
      var title = msg[item].title;

      $('.collection').append("<a href='#test-swipe-2' class='collection-item'>" + title + "</a>");
      
    };

  }).fail(function () {
    alert("ERROR");
  });

  
}


var cameraOptions = {
  destinationType: Camera.DestinationType.FILE_URI,
  encodingType : Camera.EncodingType.JPEG,
  correctOrientation: true,
  sourceType: Camera.PictureSourceType.CAMERA
}


function openCamera(){

  //navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);

  navigator.camera.getPicture(
    function(imageURI){
    resolveLocalFileSystemURL(imageURI, function(fileEntry) {
      // fileEntry is usable for uploading without holding image in memory...
      fileEntry.file(function(file) { 
        var reader = new FileReader();
    
        reader.onloadend = function() {
          // this.result contains the Data URI usable as a preview thumbnail
          $('#imageHtml').attr('src', this.result);
        }
    
        reader.readAsDataURL(file);
      }, errHandler);
    }, errHandler);
  }, errHandler, cameraOptions);

}

function errHandler(imageData){
  console.log("camra no ok")
}

