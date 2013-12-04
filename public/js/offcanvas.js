$(document).ready(function() {
  $('[data-toggle=offcanvas]').click(function() {
    $('.row-offcanvas').toggleClass('active');
  });
});
//click on edit in list of faculty
function enablefaculty(id1,id2,id3) {
    document.getElementById(id1).disabled = false;
    document.getElementById(id2).disabled = false;
    document.getElementById(id3).disabled = false;
}

//click on edit in list of post
function enablepost(id1,id2,id3,id4,id5){
	document.getElementById(id1).disabled = false;
	document.getElementById(id2).disabled = false;
	document.getElementById(id3).disabled = false;
	document.getElementById(id4).disabled = false;
	document.getElementById(id5).disabled = false;
}
