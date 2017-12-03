$(document).ready(() => {
    
    
        $('#submit').on('click', function() {
    
            let url = "http://localhost:8080/api/admin/login"
            
            $.ajax({
                type: "POST",
                method: "POST",
                url: url,
                data: $("#submitForm").serializeArray(),
                success: function(data){
                    if(data.errCode!=404){
                        window.location = "http://localhost:8080/Admin/Main";                        
                    }
                }
            });
    
        })
    })