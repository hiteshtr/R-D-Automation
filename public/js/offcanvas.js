$(document).ready(function() {
  $('[data-toggle=offcanvas]').click(function() {
    $('.row-offcanvas').toggleClass('active');
  });
});

//click on edit in list of projectclass
function enableprojectclass(id1,id2,id3){
  document.getElementById(id1).disabled = false;
  document.getElementById(id2).disabled = false;
  document.getElementById(id3).disabled = false;
}

$(function() {
  $(".datepicker").datepicker({
   changeMonth: true,
   changeYear: true,
   dateFormat: "yy,mm,dd"
  }); 
});

function total (current_elem, total_id) {
  var count = 0;
  var row_count = current_elem.parentNode.parentNode.parentNode.getElementsByTagName('tr').length - 2;
  var idName = current_elem.id.split(/[0-9]/);
  for (var i = 0; i < row_count; i++) {
    var idCurrent = idName[0] + (i+1);
    var current_val = Number(document.getElementById(idCurrent).value);
    count = count + ( isNaN(current_val)? 0:current_val );
  };
  document.getElementById(total_id).value = count;
}

function dynamicDate(){
  $(".dynamicDatepicker").datepicker({
   changeMonth: true,
   changeYear: true,
   dateFormat: "yy,mm,dd" 
 });
}