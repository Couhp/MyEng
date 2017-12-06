$(document).ready(function() {
    //set data in datatable
    $("#logout").on('click', function() {
        $.ajax({
            type: "GET",
            method: "GET",
            url: "http://localhost:8080/api/admin/logout",
            data: "",
            success: function(data) {
                if (data.errCode === 0) {
                    window.location = "http://localhost:8080/Admin/SignIn";
                } else {
                    arlert("ERROR to log out!")
                }
            }
        });
    })
    $("#replied").on('click', function() {
        $("#none_replied").hide();
    });
    var table = $('#usersTable').DataTable({
        "ajax": {
            "url": "http://localhost:8080/api/admin/all-user",
            "type": "get"
        },
        "columns": [
            { "data": "username" },
            { "data": "exp" },
            { "data": "current_level" },
            { "data": null }
        ],
        "columnDefs": [{
            "targets": -1,
            "data": "isBlock",
            "render": function(data, type, row, meta) {
                if (data['isBlock'] == '0') {
                    return '<button id=' + data["_id"] + ' class="btn btn-danger">Block</button>';
                } else {
                    return '<button id=' + data["_id"] + ' class="btn btn-success">Unblock</button>';
                }
            }
        }]
    });

    // block user
    $('#usersTable').on('click', 'button', function() {
        if ($(this).hasClass("btn-danger")) {
            $(this).removeClass("btn-danger")
            $(this).addClass("btn-success")
            $(this).text("Unblock")
        } else {
            $(this).removeClass("btn-success")
            $(this).addClass("btn-danger")
            $(this).text("Block")
        }
        var id = $(this).attr('id')
        block(id)
    });
    // function block or unblock
    var block = function(id) {
        $.ajax({
            type: "POST",
            method: "POST",
            url: "http://localhost:8080/api/admin/block",
            data: { "userid": id },
            success: function(data) {
                console.log(data)
            }
        })
    }

    //switch tag in gop y
    // $('#admin_menu').on('click', 'a[data-toggle="tab"]', function(e) {
    //     e.preventDefault();

    //     var $link = $(this);

    //     if (!$link.parent().hasClass('active')) {

    //         //remove active class from other tab-panes
    //         $('.tab-content:not(.' + $link.attr('href').replace('#', '') + ') .tab-pane').removeClass('active');

    //         // click first submenu tab for active section
    //         $('a[href="' + $link.attr('href') + '_all"][data-toggle="tab"]').click();

    //         // activate tab-pane for active section
    //         $('.tab-content.' + $link.attr('href').replace('#', '') + ' .tab-pane:first').addClass('active');
    //     }

    // });
    $("#r").click(function() {
        $(this).addClass('active');
        $("#none_replied").hide();
    });
    $("#nr").click(function() {
        $(this).addClass('active');
        $("#none_replied").show();
    });

    //get fb
    var getFb = function() {
            $.ajax({
                type: "GET",
                method: "GET",
                url: "http://localhost:8080/api/admin/get-feedback",
                data: {},
                success: function(data) {
                    showFb(data.data)
                }
            })
        }
        //get fb is replied
    var getFbReplied = function() {
        $.ajax({
            type: "GET",
            method: "GET",
            url: "http://localhost:8080/api/admin/get-feedback-is-reply",
            data: {},
            success: function(data) {
                showRepFb(data.data)
            }
        })
    }

    //Show fb none reply
    var showFb = function(data) {
        if (data.length === 0) {
            var html = getFbHTML(data)
            $("#news-content").append(html)
        }
        data.forEach(element => {
            var html = getFbHTML(element)
            $("#news-content").append(html)
        });
    }
    var getUser = function(userid) {
        if (userid === null || userid === undefined) {
            return "Anonymous"
        }
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
    var getFbHTML = function(data) {
        if (data === null || data === undefined || data.length === 0) {
            var html = "<br/><div class='nothing bg-info'><h class='nothing-text'>Không có dữ liệu.</h></div><br/>"
            return html
        }
        var subject = data.subject
        var content = data.content
        var id = data._id
        var html = "<br/><div class='alert alert-warning'>" +
            "<i class='fa fa-user' aria-hidden='true'>&nbsp;</i><a href='#' style='text-decoration: none;'><strong class='text-primary'> " + getUser(data.user) + "</strong></a>" +
            "<h5>Tiêu đề : " + subject + "</h5>" +
            "<h6>Nội dung : " + content + "</h6>" +
            "<div class='input-group'>" +
            "<textarea id=" + id + " class='form-control custom-control' rows='1' style='resize:none'></textarea>" +
            "<span class='input-group-addon btn btn-primary'>Reply</span>" +
            "</div>" +
            "</div>"
        return html
    }


    $("#news-content").on('click', 'span', function() {
        var textarea = $(this).siblings("textarea")
        var reply = textarea.val()
        var feedbackId = textarea.attr('id')
        $.ajax({
            type: "POST",
            method: "POST",
            url: "http://localhost:8080/api/admin/reply-feedback",
            data: { "feedbackId": feedbackId, "reply": reply },
            success: function(data) {
                alert(data.msg);
                textarea.parent().parent().remove()
                var html = "<div class='alert alert-warning'>" +
                    "<i class='fa fa-user' aria-hidden='true'>&nbsp;</i><a href='#' style='text-decoration: none;'><strong class='text-primary'> " + getUser(data.data.user) + "</strong></a>" +
                    "<h5 >Tiêu đề: " + data.data.subject + "</h5>" +
                    "<h6>Nội dung: " + data.data.content + "</h6>" +
                    "<h6 class='alert alert-success'>Đã trả lời: " + data.data.reply + "</h6>" +
                    "</div>";
                $("#replied_content").prepend(html);
            }
        })
    });

    // end reply

    // $("#replied_content").on('click', 'span', function() {
    //     var textarea = $(this).siblings("textarea")
    //     var reply = textarea.val()
    //     var feedbackId = textarea.attr('id')
    //     $.ajax({
    //         type: "POST",
    //         method: "POST",
    //         url: "http://localhost:8080/api/admin/reply-feedback",
    //         data: { "feedbackId": feedbackId, "reply": reply },
    //         success: function(data) {
    //             alert(data.msg);
    //             textarea.parent().parent().hide()
    //         }
    //     })
    // });


    //show fb replied
    var showRepFb = function(data) {
        data.forEach(element => {
            var html = getRepFbHTML(element)
            $("#replied_content").append(html)
        });
    }

    var getRepFbHTML = function(data) {
        var subject = data.subject
        var content = data.content
        var id = data._id
        var reply = data.reply
        var html = "<div class='alert alert-warning'>" +
            "<i class='fa fa-user' aria-hidden='true'>&nbsp;</i><a href='#' style='text-decoration: none;'><strong class='text-primary'> " + getUser(data.user) + "</strong></a>" +
            "<h5 >Tiêu đề: " + subject + "</h5>" +
            "<h6>Nội dung: " + content + "</h6>" +
            "<h6 class='alert alert-success'>Đã trả lời: " + reply + "</h6>" +
            // "<div class='input-group'>" +
            // "<textarea id=" + id + " class='form-control custom-control' rows='3' style='resize:none'></textarea>" +
            // "<span class='input-group-addon btn btn-primary'>Reply</span>" +
            // "</div>" +
            "</div>";
        return html
    }
    getFb();
    getFbReplied();
});