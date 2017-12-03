$(document).ready(function() {

    // ==== GLOBAL VARIABLE =========
    var userId = ""


    // ================= ROUTING ============================

    $("#feedback").on('click', function() {
        window.location = "http://localhost:8080/MyEng/FeedBack";
    })

    $("#main").on('click', function() {
        window.location = "http://localhost:8080/MyEng/Main";
    })

    //=========================================================
    $("#sendFeedback").on('click', function() {
        var subject = $("#fb-subject").val()
        var content = $("#fb-content").val()
        $.ajax({
            type: "POST",
            method: "POST",
            url: "http://localhost:8080/api/user/feedback",
            data: { "subject": subject, "content": content },
            success: function(data) {
                if (data.errCode === 200) {
                    alert(data.msg)

                }
            }
        })
    })

    var getMyFb = function() {
        $.ajax({
            type: "GET",
            method: "GET",
            url: "http://localhost:8080/api/user/my-feedback",
            data: {},
            success: function(data) {
                showFb(2, data.data)
            }
        })
    }

    var getAllFb = function() {
        $.ajax({
            type: "GET",
            method: "GET",
            url: "http://localhost:8080/api/admin/get-feedback-is-reply",
            data: {},
            success: function(data) {
                showFb(1, data.data)
            }
        })
    }

    var showFb = function(type, data) {
        var divId = ""
        if (type == 1) { divId = "#news-content" } else divId = "#my-content"
        if (data == null || data.length == 0) {
            console.log("sdvlnsdvlksdnsvln")
            $(divId).append(getFbHTML("null"))
        } else {
            data.forEach(element => {
                var html = getFbHTML(element)
                $(divId).append(html)
            });
        }
    }

    var getFbHTML = function(data) {
        if (data == "null") {
            var html = "<p><h3 class='bg-info'>Nothing New</h3></p>"
            return html
        }
        var subject = (data.subject) != null ? (data.subject) : "No title "
        var content = data.content
        var reply = data.reply
        var html = "<div class='alert'>" +
            "<h3 class='bg-warning'><b> " + subject + "</b></h3>" +
            "<blockquote><p class='text-info'>" + content + "</p>" +
            "<footer class='text-muted'>By " + "Null" + "</footer><br>" +
            // "<p class='text-muted'>Reply</p>" + 
            "<p class='text-primary'>  " + reply + "</p></blockquote><br>" +
            "</div>"
        return html
    }


    // ==========   INFO ========================
    function setInfo(data) {

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
        $("#displayname").text(data.displayName);
    }

    var callInfo = function(callback) {
        $.ajax({
            type: "GET",
            method: "GET",
            url: "http://localhost:8080/api/user/myinfo",
            data: "",
            success: function(data) {
                userId = data.data._id
                setInfo(data.data)
                callback()
            }
        });
    }

    //=========================================
    $(".nav-tabs a").click(function() {
        $(this).tab('show');
    });
    $('.nav-tabs a').on('shown.bs.tab', function(event) {
        var x = $(event.target).text(); // active tab
        var y = $(event.relatedTarget).text(); // previous tab
        $(".act span").text(x);
        $(".prev span").text(y);
    });

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

    function setInfo(data) {

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
        $("#displayname").text(data.displayName);
        $("#level").text("Level: " + data.current_level);
        $("#exp").text(data.exp + " exp");
        $("#streak").text("Streak: " + data.streak);
    }



    var main = function() {
        callInfo(function() {
            getAllFb()
            getMyFb()
        })

    }

    main()
});