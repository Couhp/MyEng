$(document).ready(()=> {

	function getFormData($form){
		var unindexed_array = $form.serializeArray();
		var indexed_array = new FormData();

		$.map(unindexed_array, function(n, i){
			indexed_array[n['name']] = n['value'];
		});

		return indexed_array;
	}
//getFormData($("#submitForm"))
$('#submit').on('click', function() {

	let url =  "http://localhost:8080/api/user/signup";
	let data = getFormData($("#submitForm"))
	console.log(data);
	$.ajax({
		type: "POST",
		method : "POST",
		url: url,
		data: JSON.stringify(data),
		success: function(data){
			console.log(data)
			alert(data)
		}
	});

})
})