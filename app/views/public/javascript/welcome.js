﻿$("document").ready(function () {

	$("#Login").on('click', function () {
		window.location.replace("http://localhost:8080/MyEng/SignIn");
	})

	$("#Trial").on('click', function() {
		$.post("http://localhost:8080/MyEng/Trial", function(data) {
			window.alert(data)
		})
	})
})
