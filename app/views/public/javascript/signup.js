$(document).ready(()=> {
    

    //getFormData($("#submitForm"))
    $('#submit').on('click', function() {
    
        let url =  "http://localhost:8080/api/user/signup";
    
        $.ajax({
            type: "POST",
            method : "POST",
            url: url,
            data: $("#submitForm").serializeArray(),
            success: function(data){
                if (data.errCode == 200) {
                    document.cookie = "userId=" + data.data.user._id + ";"
                    window.location = "http://localhost:8080/MyEng/Main";
                }
                else {
                    $("#warning").text(data.msg)
                    $("#myModal").modal('show');
                }
            }
        });
    
    })
    })
