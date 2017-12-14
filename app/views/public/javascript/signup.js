$(document).ready(() => {

    var password = document.getElementById("password"),
        confirm_password = document.getElementById("confirm_password");

    function validatePassword() {
        if (password.value != confirm_password.value || password.value == "") {
            confirm_password.setCustomValidity("Xác nhận lại mật khẩu");
            return false
        } else {
            confirm_password.setCustomValidity('');
            return true
        }
    }
    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;


    $('#submit').on('click', function() {
        let url = "http://localhost:8080/api/user/signup";

        if (validatePassword()) {

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
                    } else if (data.errCode === -1) {
                        alert(data.msg)
                    } else {
                        // document.cookie = "userId=" + data.data.user._id + ";"
                        window.location = "http://localhost:8080/MyEng/SignIn";
                    }
                }
            });
        }
    })
})