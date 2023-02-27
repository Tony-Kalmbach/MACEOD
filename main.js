/*****************************************************************
Author: Conrad Selig
Email: Conrad@ConradSelig.dev

Co-Author: Tony Kalmbach
Email: trkalmbach@gmail.com

Parameters: None
Returns: None

Description:
	Add newly entered values from the user to stored values to
	create a running total. All values are normalized to standard
	SQL money format.
	
Changes:
	Date		Detail
	2022-01-17	Initial write.
	2022-03-30	Added debit
	2023-02-26  Added grand total
*****************************************************************/
function main() {
	// Collect both the stored value objects and the form objects
	let vi_element = document.getElementById("Vi_");
	let vi_form = document.getElementById("Vi");
	
	let mc_element = document.getElementById("Mc_");
	let mc_form = document.getElementById("Mc");
	
	let di_element = document.getElementById("Di_");
	let di_form = document.getElementById("Di");
	
	let ae_element = document.getElementById("Ae_");
	let ae_form = document.getElementById("Ae");

	let db_element = document.getElementById("Db_");
	let db_form = document.getElementById("Db");
	
	let gt_element = document.getElementById("Gt_");
	
	// 0 out our total vars
	let vi_total = 0;
	let mc_total = 0;
	let di_total = 0;
	let ae_total = 0;
	let db_total = 0;
	let gt_total = 0;
	
	// if there is not value in the stored values, use 0
	if (vi_element.innerHTML.length < 1) {
		vi_element.innerHTML = "0";
	}
	if (mc_element.innerHTML.length < 1) {
		mc_element.innerHTML = "0";
	}
	if (di_element.innerHTML.length < 1) {
		di_element.innerHTML = "0";
	}
	if (ae_element.innerHTML.length < 1) {
		ae_element.innerHTML = "0";
	}
	if (db_element.innerHTML.length < 1) {
		db_element.innerHTML = "0";
	}
	
	// if no value was entered into a form field, use 0
	if (vi_form.value == null || vi_form.value == "") {
		vi_form.value = 0;
	}
	if (mc_form.value == null || mc_form.value == "") {
		mc_form.value = 0;
	}
	if (di_form.value == null || di_form.value == "") {
		di_form.value = 0;
	}
	if (ae_form.value == null || ae_form.value == "") {
		ae_form.value = 0;
	}
	if (db_form.value == null || db_form.value == "") {
		db_form.value = 0;
	}
		
	// add the stored value with the new form value
	vi_total = parseFloat(vi_element.innerHTML) + parseFloat(vi_form.value);
	mc_total = parseFloat(mc_element.innerHTML) + parseFloat(mc_form.value);
	di_total = parseFloat(di_element.innerHTML) + parseFloat(di_form.value);
	ae_total = parseFloat(ae_element.innerHTML) + parseFloat(ae_form.value);
	db_total = parseFloat(db_element.innerHTML) + parseFloat(db_form.value);
	
	// if it is invalid for ANY reason, 0 it out
	if(isNaN(vi_total)) {
		vi_total = 0;
	}
	if(isNaN(mc_total)) {
		mc_total = 0;
	}
	if(isNaN(di_total)) {
		di_total = 0;
	}
	if(isNaN(ae_total)) {
		ae_total = 0;
	}
	if(isNaN(db_total)) {
		db_total = 0;
	}
	
	// create grand total
	gt_total = (vi_total + mc_total + di_total + ae_total + db_total);
	
	// store the new value (rounded to two decimal places)
	vi_element.innerHTML = Math.round(vi_total * 100) / 100;
	mc_element.innerHTML = Math.round(mc_total * 100) / 100;
	di_element.innerHTML = Math.round(di_total * 100) / 100;
	ae_element.innerHTML = Math.round(ae_total * 100) / 100;
	db_element.innerHTML = Math.round(db_total * 100) / 100;
	gt_element.innerHTML = Math.round(gt_total * 100) / 100;
	
	// add the values to the history
	add_history("vi_select", vi_form);	
	add_history("mc_select", mc_form);	
	add_history("di_select", di_form);	
	add_history("ae_select", ae_form);	
	add_history("db_select", db_form);	
	
	// empty the form fields
	document.input_form.reset();
}

/*
	select_id: str -> ID of a select element on the page
	form_element: obj -> full object of a number form element
*/
function add_history(select_id, form_element) {
	
	// don't add a value if nothing was entered!
	if (parseFloat(form_element.value) == 0) {
		return;
	}
	
	// grab our select element, and make a new option for it
	var el_select = document.getElementById(select_id);
	var hist_opt = document.createElement('option');
	
	// style our option element
	hist_opt.disabled = true;
	if (parseFloat(form_element.value) >= 0) {
		hist_opt.innerHTML = '+ $' + form_element.value;
		hist_opt.classList.add("history-positive");
	} else {
		hist_opt.innerHTML = '- $' + form_element.value.substring(1);
		hist_opt.classList.add("history-negative");
	}
	
	// link the new option to the select element
	el_select.appendChild(hist_opt);
}
