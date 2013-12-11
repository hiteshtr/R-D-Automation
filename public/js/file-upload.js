window.addEventListener("load", Ready);
 
function Ready(){
   if(window.File && window.FileReader){ //These are the relevant HTML5 objects that we are going to use
      document.getElementById('uploadButton').addEventListener('click', StartUpload); 
      document.getElementById('fileInput').addEventListener('change', FileChosen);
   }
   else
   {
      document.getElementById('attachment_upload').innerHTML = "Your Browser Doesn't Support The File API Please Update Your Browser";
   }
}

var SelectedFile;
function FileChosen(evnt) {
     SelectedFile = evnt.target.files[0];
   document.getElementById('fileName').value = SelectedFile.name;
 }

var FReader;
var Name;
function StartUpload(){
   if(document.getElementById('fileInput').value != "")
   {
      FReader = new FileReader();
      Name = document.getElementById('fileName').value;
      document.getElementById('UploadArea').innerHTML = Content;
      FReader.onload = function(evnt){
         socket.emit('Upload', { 'Name' : Name, Data : evnt.target.result });
      }
      socket.emit('Start', { 'Name' : Name, 'Size' : SelectedFile.size });
   }
   else
   {
      alert("Please Select A File");
   }
}