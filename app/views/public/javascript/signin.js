$(document).ready(() => {


    $('#submit').on('click', function() {

        let url = "http://localhost:8080/api/user/login"

        $.ajax({
            type: "POST",
            method: "POST",
            url: url,
            data: $("#submitForm").serializeArray(),
            success: function(data) {
                if (data.errCode === 400) {
                    alert(data.msg)
                } else if (data.errCode === 500) {
                    alert("ERROR, please try again later!")
                } else if (data.errCode === 404) {
                    alert(data.msg);
                } else {
                    window.location = "http://localhost:8080/MyEng/Main";
                }
            }
        });

    })
})