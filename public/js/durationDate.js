// Generic Function for calculating difference between two date input

function diffrenceInDate ( input1, input2, input3 ) {
	var d1 = new Date(document.getElementById(input1).value); //Start Date
	var d2 = new Date(document.getElementById(input2).value); // End Date
	var msPerDay = 1000*60*60*24;
	document.getElementById(input3).value = ((d2 - d1) / msPerDay).toFixed(0);
}