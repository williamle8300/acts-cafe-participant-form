var jQuery = require('jquery');

var backendHost = require('../config').backendHost;


module.exports = {
  upload: function (creds, FilePathOrHTMLFileObject, endPoint, cb) {
  
    if (window.cordova) {

      var fileTransfer = new FileTransfer();//cordova thangs
      var options = new FileUploadOptions();//cordova thangs

      options.fileKey = 'file';
      options.fileName = FilePathOrHTMLFileObject.substr(FilePathOrHTMLFileObject.lastIndexOf('/')+1);
      options.mimeType = 'image/jpeg';
      options.headers = {'Authorization': creds};
      options.chunkedMode = true;

      fileTransfer.upload(

        FilePathOrHTMLFileObject,
        endPoint,//backendHost+ '/api/media'!!!!
        function (server) {
        
          var media = JSON.parse(server.response);
          var statusCode = server.responseCode;

          cb(null, media);
        }.bind(this),
        function (err) {
          cb(err);
        }.bind(this),
        options
      );
    }
  
    else if (!window.cordova) {

      //Beware: HTML `FormData` breaks before I.E.9 and lower
      var formData = new FormData();
      var photoblob = new Blob([FilePathOrHTMLFileObject]);
  
      formData.append('medium', photoblob);
  
      jQuery.ajax({
       url: endPoint,
       type: 'POST',
       data: formData,
       cache: false,
       contentType: false,
       processData: false,
       beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', creds);
       }.bind(this),
       success: function(response) {
         cb(null, response);
       }.bind(this),
       error: function(xhr, status, err) {
         cb(err);
       }.bind(this)
     });
    };
  }
}