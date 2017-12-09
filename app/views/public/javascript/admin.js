$(document).ready(function() {
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

    //============= menu quan ly nguoi dung =================//
    //set data in datatable
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

    //========= end menu quan ly nguoi dung ===============//


    //========= menu quan ly feedback ====================//
    //show inside tab
    // $("#replied").on('click', function() {
    //     $("#none_replied").hide();
    // });

    // $("#r").click(function() {
    //     $(this).addClass('active');
    //     $("#none_replied").hide();
    // });
    // $("#nr").click(function() {
    //     $(this).addClass('active');
    //     $("#none_replied").show();
    // });

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
    };
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

    //get feed back 
    var getFbHTML = function(data) {
        if (data === null || data === undefined || data.length === 0) {
            var html = "<br/><div class='nothing bg-info'><h class='nothing-text'>Không có dữ liệu.</h></div><br/>"
            return html
        }
        var subject = data.subject
        var content = data.content
        var id = data._id
        var html = "<br/><div class='alert alert-warning'>" +
            "<span id=" + "del" + id + " class='pull-right glyphicon glyphicon-remove' data-toggle='tooltip' title='Delete feedback!'></span>" +
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


    $("#news-content").on('click', 'span.btn-primary', function() {
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
                    "<span id=" + "del" + feedbackId + " class='pull-right glyphicon glyphicon-remove' data-toggle='tooltip' title='Delete feedback!'></span>" +
                    "<i class='fa fa-user' aria-hidden='true'>&nbsp;</i><a href='#' style='text-decoration: none;'><strong class='text-primary'> " + getUser(data.data.user) + "</strong></a>" +
                    "<h5 >Tiêu đề: " + data.data.subject + "</h5>" +
                    "<h6>Nội dung: " + data.data.content + "</h6>" +
                    "<h6 class='alert alert-success'>Đã trả lời: " + data.data.reply + "</h6>" +
                    "<button class='btn btn-info'>Chỉnh sửa câu trả lời</button>" +
                    "<div class='input-group'>" +
                    "<textarea id=" + feedbackId + " class='form-control custom-control' rows='1' style='resize:none'></textarea>" +
                    "<span class='input-group-addon btn btn-warning'>Cancel</span>" +
                    "<span class='input-group-addon btn btn-info'>Reply</span>" +
                    "</div>" +
                    "</div>";
                $("#replied_content").prepend(html);
                $("#replied_content").find(".input-group").hide()

            }
        })
    });


    // modify answer
    $("#replied_content").on('click', 'span.btn-info', function() {
        var textarea = $(this).siblings("textarea")
        var reply = textarea.val()
        var feedbackId = textarea.attr('id')
        var span = $(this)
        $.ajax({
            type: "POST",
            method: "POST",
            url: "http://localhost:8080/api/admin/reply-feedback",
            data: { "feedbackId": feedbackId, "reply": reply },
            success: function(data) {
                alert(data.msg);
                span.parent().hide()
                span.parent().siblings('button').show()
                span.parent().siblings('h6.alert').text("Đã trả lời: " + reply)
            }
        })

    });

    // cancel modify anwser
    $("#replied_content").on('click', 'span.btn-warning', function() {
        $(this).parent().hide()
        $(this).parent().siblings('button').show()
    });


    //show fb replied
    var showRepFb = function(data) {
        data.forEach(element => {
            var html = getRepFbHTML(element)
            $("#replied_content").append(html)
        });
        $("#replied_content").find(".input-group").hide()

    }

    //get fb replied
    var getRepFbHTML = function(data) {
        var subject = data.subject
        var content = data.content
        var id = data._id
        var reply = data.reply
        var html = "<div class='alert alert-warning'>" +
            "<span id=" + "del" + id + " class='pull-right glyphicon glyphicon-remove' data-toggle='tooltip' title='Delete feedback!'></span>" +
            "<i class='fa fa-user' aria-hidden='true'>&nbsp;</i><a href='#' style='text-decoration: none;'><strong class='text-primary'> " + getUser(data.user) + "</strong></a>" +
            "<h5 >Tiêu đề: " + subject + "</h5>" +
            "<h6>Nội dung: " + content + "</h6>" +
            "<h6 class='alert alert-success'>Đã trả lời: " + reply + "</h6>" +
            "<button class='btn btn-info'>Chỉnh sửa câu trả lời</button>" +
            "<div class='input-group'>" +
            "<textarea id=" + id + " class='form-control custom-control' rows='1' style='resize:none'></textarea>" +
            "<span class='input-group-addon btn btn-warning'>Cancel</span>" +
            "<span class='input-group-addon btn btn-info'>Reply</span>"
        "</div>" +
        "</div>"
        return html
    }

    //show textarea and hide button modify
    $("#replied_content").on("click", "button.btn-info", function() {
        var inputGroup = $(this).siblings("div.input-group")
        $(this).hide()
        inputGroup.show()

    });

    //delete feedback
    $("#replied_content").on("click", "span.glyphicon-remove", function() {
        var delspan = $(this)
        var id = delspan.attr('id').slice(3)
        $.ajax({
            type: "POST",
            method: "POST",
            url: "http://localhost:8080/api/admin/del-feedback",
            data: { "feedbackId": id },
            success: function(data) {
                if (data.errCode === 200) {
                    delspan.parent().remove()
                }
                alert("delete feedback: " + data.msg)
            }
        })
    });

    $("#news-content").on("click", "span.glyphicon-remove", function() {
        var delspan = $(this)
        var id = delspan.attr('id').slice(3)
        $.ajax({
            type: "POST",
            method: "POST",
            url: "http://localhost:8080/api/admin/del-feedback",
            data: { "feedbackId": id },
            success: function(data) {
                if (data.errCode === 200) {
                    delspan.parent().remove()
                }
                alert("delete feedback: " + data.msg)
            }
        })
    });

    getFb();
    getFbReplied();

    //================ end quan ly feedback =================//

    //============== menu quan ly topic ==================//
    // create topic table

    var table = $('#topicsTable').DataTable({
        "ajax": {
            "url": "http://localhost:8080/api/topic/all",
            "type": "post",
            "data": { "courseid": "5a1224a17605d32d985a8156" }
        },
        "columns": [
            { "data": "name" },
            { "data": "description" },
            { "data": "exp_topic" },
            { "data": null }
        ],
        "columnDefs": [{
            "targets": -1,
            "data": "",
            "render": function(data, type, row, meta) {
                return '<button id= hihi' + data["_id"] + ' class="btn btn-info choose-question" data-toggle="modal" data-target="#modalChoose">Choose question </button>' +
                    '<button id= hehe' + data["_id"] + ' class="btn btn-success fill-question" data-toggle="modal" data-target="#modalFill">Fill question</button>';

            }
        }]
    });

    //create topic 
    $("#createTopic").on("click", function() {
        var topicname = $("#topicname").val()
        var description = $("#description").val()
        var exp = $("#exp").val()
        $.ajax({
            type: "POST",
            method: "POST",
            url: "http://localhost:8080/api/admin/add-topic",
            data: { "name": topicname, "description": description, "exp": exp },
            success: function(data) {
                alert(data.msg)
            }
        })
        location.reload(true)
    })

    $('ul.nav-tabs a').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });

    // store the currently selected tab in the hash value
    $("ul.nav-tabs > li > a").on("shown.bs.tab", function(e) {
        var id = $(e.target).attr("href").substr(1);
        window.location.hash = id;
    });

    // on load of the page: switch to the currently selected tab
    var hash = window.location.hash;
    $('ul.nav-tabs a[href="' + hash + '"]').tab('show');


    // add question
    let _topicid

    $("#topicsTable").on("click", "button.choose-question", function() {
        _topicid = $(this).attr('id').slice(4)
    })

    $("#topicsTable").on("click", "button.fill-question", function() {
        _topicid = $(this).attr('id').slice(4)
    })


    //create choose question
    $("#createChoose").on("click", function() {
        var question = $("#question").val()
        var option = $("#choose1").val() + ',' + $("#choose2").val() + ',' + $("#choose3").val() + ',' + $("#choose4").val()
        var answer = $("#answer").val()
        console.log(_topicid + ' ' + question + ' ' + option + ' ' + answer)
        $.ajax({
            type: "POST",
            method: "POST",
            url: "http://localhost:8080/api/admin/add-choose",
            data: { "question": question, "option": option, "answer": answer, "topicid": _topicid },
            success: function(data) {
                console.log(data.msg)
            }
        })
    })

    //create fill question
    $("#createFill").on("click", function() {
        var question = $("#questionFill").val()
        var answer = $("#answerFill").val()
        $.ajax({
            type: "POST",
            method: "POST",
            url: "http://localhost:8080/api/admin/add-fill",
            data: { "question": question, "answer": answer, "topicid": _topicid },
            success: function(data) {
                console.log(data.msg)
            }
        })

    })

    //=============end quan ly topic ===================//


    //============= show question ===================//
    function getQuestion(id, callback) {
        let mylist = []
        $.ajax({
            type: "POST",
            method: "POST",
            url: "http://localhost:8080/api/choose/question",
            data: { "topicid": id },
            success: function(data) {

                mylist = mylist.concat(data.data)
                for (var i = 0; i < mylist.length; i++) {
                    mylist[i].type = 1
                }
                $.ajax({
                    type: "POST",
                    method: "POST",
                    url: "http://localhost:8080/api/fill/question",
                    data: { "topicid": id },
                    success: function(data) {
                        sublist = data.data
                        for (var i = 0; i < sublist.length; i++) {
                            sublist[i].type = 2
                        }
                        mylist = mylist.concat(sublist)
                        callback(mylist)
                    }
                })
            }
        });
    }

    function showQuestion(topicId) {
        var table = $('#questionsTable').DataTable({
            "ajax": {
                "url": "http://localhost:8080/api/fill/question",
                "type": "post",
                "data": { "topicid": topicId }
            },
            "columns": [
                { "data": "quesion" },
                { "data": "answer" },
                // { "data": "exp_topic" },
                // { "data": null }
            ],
            // "columnDefs": [{
            //     "targets": -1,
            //     "data": "",
            //     "render": function(data, type, row, meta) {
            //         return '<button id= hihi' + data["_id"] + ' class="btn btn-info choose-question" data-toggle="modal" data-target="#modalChoose">Choose question </button>' +
            //             '<button id= hehe' + data["_id"] + ' class="btn btn-success fill-question" data-toggle="modal" data-target="#modalFill">Fill question</button>';

            //     }
            // }]
        });

    }
    showQuestion("5a12248c7605d32d985a8155")


});