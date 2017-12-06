$("document").ready(function() {

    $("#logout").on('click', function() {
        $.ajax({
            type: "GET",
            method: "GET",
            url: "http://localhost:8080/api/user/logout",
            data: "",
            success: function(data) {
                if (data.errCode === 0) {
                    window.location = "http://localhost:8080/MyEng/Main";
                } else {
                    arlert("ERROR to log out!")
                }
            }
        });
    })
    $("#feedback").on('click', function() {
        window.location = "http://localhost:8080/MyEng/FeedBack";
    })

    $("#main").on('click', function() {
        window.location = "http://localhost:8080/MyEng/Main";
    })
    $("#updatePass").on('click', function() {
        var oldP = $("#cur_pass").val()
        var newP = $("#new_pass").val()
        if (newP.length === 0) {
            alert("Mật khẩu mới không hợp lệ")
        } else {
            $.ajax({
                type: "POST",
                method: "POST",
                url: "http://localhost:8080/api/user/password",
                data: { oldP: oldP, newP: newP },
                success: function(data) {
                    alert(data.msg)

                }
            });
        }
    });
    $("#updateInfo").on('click', function() {
        var name = $("#input_name").val()
        var email = $("#input_email").val()
        var job = $("#input_job").val()
        var address = $("#input_address").val()
        $.ajax({
            type: "POST",
            method: "POST",
            url: "http://localhost:8080/api/user/update",
            data: { displayName: name, email: email, job: job, livingIn: address },
            success: function(data) {
                alert(data.msg)
                $("#profile_name").text(name)
                $("#displayname").empty()
                $("#displayname").append("<strong><a href='/MyEng/" + data.id + "'>" + name + "</a></strong>");
            }
        });

    });

    function setInfo(data) {
        _level = data.current_level

        function normalize(str) {
            console.log(str.indexOf("/"))
            if (str.indexOf("/") !== -1) {
                let arr = str.split('/');
                arr.splice(0, arr.length - 2)
                console.log(arr)
                return '/' + arr.join('/');
            } else {
                let arr = str.split('\\');
                arr.splice(0, 1);
                return '/' + arr.join('/');
            }

        }
        $("#avatar").attr("src", normalize(data.avatar));
        $("#avt").attr("src", normalize(data.avatar));
        $("#displayname").append("<strong><a href='/MyEng/" + data._id + "'>" + data.displayName + "</a></strong>");
        $("#level").text("Level: " + data.current_level);
        $("#exp").text(data.exp + " exp");
        $("#streak").text("Streak: " + data.streak);
        $("#profile_name").text(data.displayName)
        $("#input_name").attr("value", data.displayName);
        $("#input_email").attr("value", data.email);
        $("#input_job").attr("value", data.job);
        $("#input_address").attr("value", data.livingIn);
        $("#input_birth").attr("value", data.birthday);
        $("#input_username").attr("value", data.username);
    }
    var callInfo = function() {
        $.ajax({
            type: "GET",
            method: "GET",
            url: "http://localhost:8080/api/user/myinfo",
            data: "",
            success: function(data) {
                setInfo(data.data)
            }
        });
    }
    var main = function() {
        callInfo()

    }

    //==================== RUN EXCUTION ========================

    main()

});