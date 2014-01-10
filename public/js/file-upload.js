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
      document.getElementById('attachment_upload').style.display = 'none';
      document.getElementById('progress').style.display = 'inline';
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

socket.on('MoreData', function (data){
   UpdateBar(data['Percent']);
   var Place = data['Place'] * 524288; //The Next Blocks Starting Position
   var NewFile; //The Variable that will hold the new Block of Data
   if(SelectedFile.slice)
      NewFile = SelectedFile.slice(Place, Place + Math.min(524288, (SelectedFile.size-Place)));
   else
      NewFile = SelectedFile.mozSlice(Place, Place + Math.min(524288, (SelectedFile.size-Place)));
   FReader.readAsBinaryString(NewFile);
});
 
function UpdateBar(percent){
   document.getElementById('progressbar').style.width = percent + '%';
}

var Path = "http://localhost/";
 
socket.on('Done', function (data){
   var Content = "Successfully Uploaded !!"
   document.getElementById('progress').style.display = 'none';
   document.getElementById('attachment_upload').style.display = 'inline';
});
function Refresh(){
   location.reload(true);
}