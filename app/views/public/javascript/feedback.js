$(document).ready(function() {
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
    $("#newFeed").hide();
    $("#create").on('click', function() {
        $("#create").hide();
        $("#newFeed").show();
    });
    $("#temp").hide();
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
                        $("#my-content").children("#nothing").hide();
                        var html = "<div class='alert' id='temp'>" +
                            "<h4 class='bg-warning'><b><i class='fa fa-user' aria-hidden='true'>&nbsp;</i><a href='#' style='text-decoration: none;'><strong class='text-primary'> " + getUser("") + "</strong></a>  : &nbsp;&nbsp;&nbsp;" + subject + "</b></h4>" +
                            "<blockquote><p class='text-info'>" + content + "</p>" +
                            "<strong class='text-primary'> Trả lời : &nbsp;&nbsp;&nbsp;   </strong>  Không có trả lời</blockquote><br>" +
                            "</div>"
                        $("#my-content").append(html)
                    } else {
                        alert(data.msg)
                    }
                }
            })
        }
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
        if (type === 1) {
            divId = "#news-content"
        } else {
            divId = "#my-content"
        }
        if (data == null || data.length == 0) {
            $(divId).append(getFbHTML("null"))
        } else {
            data.forEach(element => {
                var html = getFbHTML(element)
                $(divId).append(html)
            });
        }
    }
    var getUser = function(userid) {
        let res = "";
        if (userid === "") {
            $.ajax({
                type: "GET",
                method: "GET",
                async: false,
                url: "http://localhost:8080/api/user/myinfo",
                data: {},
                success: function(data) {
                    res = data.data.username
                }
            })
        } else {
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
        }
        return res
    }
    var getFbHTML = function(data) {
        if (data == "null") {
            var html = "<div class='nothing bg-info' id ='nothing'><h class='nothing-text'>Không có dữ liệu.</h></div><br/>"
            return html
        }
        var subject = (data.subject) != null ? (data.subject) : "No title "
        var content = data.content
        var reply = data.reply
        if (reply === "") {
            reply = "Không có trả lời"
        }
        var html = "<div class='alert'>" +
            "<h4 class='bg-warning'><b><i class='fa fa-user' aria-hidden='true'>&nbsp;</i><a href='#' style='text-decoration: none;'><strong class='text-primary'> " + getUser(data.user) + "</strong></a>  : &nbsp;&nbsp;&nbsp;" + subject + "</b></h4>" +
            "<blockquote><p class='text-info'>" + content + "</p>" +
            // "<footer class='text-muted'>By " + getUser(data.user) + "</footer><br>" +
            "<strong class='text-primary'> Trả lời : &nbsp;&nbsp;&nbsp;   </strong>   " + reply + "</blockquote><br>" +
            "</div>"
        return html
    }


    // ==========   INFO ========================
    function setInfo(data) {

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
        $("#displayname").append("<strong><a class='display' href='/MyEng/" + data._id + "'>" + data.displayName + "</a></strong>");
        $("#level").text("Level: " + data.current_level);
        $("#exp").text(data.exp + " exp");
        $("#streak").text("Streak: " + data.streak);
    }



    var main = function() {
        callInfo()
        getAllFb()
        getMyFb()
    }

    main()
});