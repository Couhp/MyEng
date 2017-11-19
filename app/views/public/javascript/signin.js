$(document).ready(()=> {


    function getFormData($form){
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};
    
        $.map(unindexed_array, function(n, i){
            indexed_array[n['name']] = n['value'];
        });
    
        return indexed_array;
    }
//getFormData($("#submitForm"))
    $('#submit').on('click', function() {

       let url =  "http://localhost:8080/api/user/login"
        let data = getFormData($("#submitForm"))
        $.ajax({
            type: "POST",
            method : "POST",
            url: url,
            data: data,
            success: function(data){
                console.log(data.data.user)
                window.location = "http://localhost:8080/MyEng/Main";
            }
          });
        
    })
})