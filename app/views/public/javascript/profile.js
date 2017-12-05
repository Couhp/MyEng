$("document").ready(function() {

    $("#feedback").on('click', function() {
        window.location = "http://localhost:8080/MyEng/FeedBack";
    })

    $("#main").on('click', function() {
        window.location = "http://localhost:8080/MyEng/Main";
    })

    function setInfo(data) {
        _level = data.current_level

        function normalize(str) {
            if (str.indexOf("/") === 1) {
                let arr = str.split('/');
                arr.splice(0, 1);
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