$(document).ready(() => {


    $('#submit').on('click', function() {

        let url = "http://localhost:8080/api/user/login"
        
        $.ajax({
            type: "POST",
            method: "POST",
            url: url,
            data: $("#submitForm").serializeArray(),
            success: function(data){
                console.log(data)
                document.cookie = "userId=" + data.data.user._id + ";"
                window.location = "http://localhost:8080/MyEng/Main";
            }
        });

    })
})