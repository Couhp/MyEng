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
        $("#displayname").append("<strong><a href='/MyEng/" + data._id + "'>" + data.displayName + "</a></strong>");
        $("#level").text("Level: " + data.current_level);
        $("#exp").text(data.exp + " exp");
        $("#streak").text("Streak: " + data.streak);
        $("#profile_name").text(data.displayName)
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