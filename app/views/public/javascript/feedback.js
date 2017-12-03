$(document).ready(function() {
<<<<<<< HEAD
    $("#newFeed").hide()
    $("#create").on('click', function() {
        $("#create").hide();
        $("#newFeed").show();
    });
=======

>>>>>>> d10f30036f9be0e1c74f13fb7cbc5f26e7450315
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
<<<<<<< HEAD
        if (subject.length === 0 && content.length === 0) {
            $("#fb-subject").css("border", "1px solid red");
            $("#fb-content").css("border", "1px solid red");
        } else if (subject.length === 0) {
            $("#fb-subject").css("border", "1px solid red");
            $("#fb-content").css("border", "1px solid black");
        } else if (content.length === 0) {
            $("#fb-subject").css("border", "1px solid black");
            $("#fb-content").css("border", "1px solid red");
        } else {
            $.ajax({
                type: "POST",
                method: "POST",
                url: "http://localhost:8080/api/user/feedback",
                data: { "subject": subject, "content": content },
                success: function(data) {
                    if (data.errCode === 200) {
                        alert(data.msg)
                        $("#newFeed").hide()
                        $("#create").show()
                    }
                }
            })
        }
=======
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
>>>>>>> d10f30036f9be0e1c74f13fb7cbc5f26e7450315
    })
    $("#close").on('click', function() {
        $("#newFeed").hide()
        $("#create").show()
    });

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
<<<<<<< HEAD
        if (type === 1) {
            divId = "#news-content"
        } else {
            divId = "#my-content"
        }
=======
        if (type == 1) { divId = "#news-content" } else divId = "#my-content"
>>>>>>> d10f30036f9be0e1c74f13fb7cbc5f26e7450315
        if (data == null || data.length == 0) {
            $(divId).append(getFbHTML("null"))
        } else {
            data.forEach(element => {
                var html = getFbHTML(element)
                $(divId).append(html)
            });
        }
    }
<<<<<<< HEAD
    var getUser = function(userid) {
        let res = "";
        $.ajax({
            type: "POST",
            method: "POST",
            async: false,
            url: "http://localhost:8080/api/user/getinfo",
            data: { "userid": userid },
            success: function(data) {
                res = data.data.username
            }
        })
        return res
    }
=======

>>>>>>> d10f30036f9be0e1c74f13fb7cbc5f26e7450315
    var getFbHTML = function(data) {
        if (data == "null") {
            var html = "<div class='nothing bg-info'><h class='nothing-text'>Không có dữ liệu.</h></div><br/>"
            return html
        }
        var subject = (data.subject) != null ? (data.subject) : "No title "
        var content = data.content
        var reply = data.reply
        if (reply === "") {
            reply = "Không có trả lời"
        }
        var html = "<div class='alert'>" +
<<<<<<< HEAD
            "<h4 class='bg-warning'><b><i class='fa fa-user' aria-hidden='true'>&nbsp;</i><a href='#' style='text-decoration: none;'><strong class='text-primary'> " + getUser(data.user) + "</strong></a>  : &nbsp;&nbsp;&nbsp;" + subject + "</b></h4>" +
            "<blockquote><p class='text-info'>" + content + "</p>" +
            // "<footer class='text-muted'>By " + getUser(data.user) + "</footer><br>" +
            "<strong class='text-primary'> Trả lời : &nbsp;&nbsp;&nbsp;   </strong>   " + reply + "</blockquote><br>" +
=======
            "<h3 class='bg-warning'><b> " + subject + "</b></h3>" +
            "<blockquote><p class='text-info'>" + content + "</p>" +
            "<footer class='text-muted'>By " + "Null" + "</footer><br>" +
            // "<p class='text-muted'>Reply</p>" + 
            "<p class='text-primary'>  " + reply + "</p></blockquote><br>" +
>>>>>>> d10f30036f9be0e1c74f13fb7cbc5f26e7450315
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