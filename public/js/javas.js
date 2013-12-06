function showBlock(str){
	alert(str);
	var ele = document.getElementById(str);
	if(ele.style.display == "block"){
	  ele.style.display = "none";
	}else{
	  ele.style.display = "block";
	}
}

function init(){
	alert("welcome");
}