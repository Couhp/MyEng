$(document).ready(function() {

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
                console.log(data)
            }
        })
    })

    var getAllFb = function() {
        $.ajax({
            type: "GET",
            method: "GET",
            url: "http://localhost:8080/api/user/my-feedback",
            data: {},
            success: function(data) {
                console.log(data)
                showFb(data.data)
            }
        })
    }

    var showFb = function(data) {
        data.forEach(element => {
            var html = getFbHTML(element)
            $("#news-content").append(html)
        });
    }

    var getFbHTML = function(data) {
        var subject = data.subject
        var content = data.content
        var reply = data.reply
        var html = "<div class='alert alert-success'>" +
            "<h5 > " + subject + "</h5>" +
            "<h6>" + content + "</h6>" +
            "<h6>Reply</h6>" + reply + "<br>"
        "</div>"
        return html
    }


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
        callInfo()
        getAllFb()
    }

    main()
});