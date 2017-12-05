$("document").ready(function() {


    $("#submit").on('click', function() {
        $("#myModal").modal('show')
        title = "Guest Contact"
        data = $("#submitForm").serializeArray()
        str = ""
        for (line in data) {
            str += data[line].name + ":" + data[line].value + "\n"
        }
        $.ajax({
            type: "POST",
            method: "POST",
            url: "http://localhost:8080/api/user/feedback",
            data: { "subject": title, "content": str },
            sucess: function() {

            }
        })
    })
})