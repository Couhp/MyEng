$("document").ready(function() {


    function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

    // ==============   GLOBAL VAR ==================

    let _topicId = [];
    let _queue = [];
    let _position = 0
    let _point = 0


    // ================= ROUTING ============================

    $("#feedback").on('click', function() {
        window.location = "http://localhost:8080/MyEng/FeedBack";
    })

    $("#main").on('click', function() {
        window.location = "http://localhost:8080/MyEng/Main";
    })

    //=========================================================

    function random() {
        return Math.floor((Math.random() * 3) + 1);
    }

    function genQuestionHTML(data) {
        //console.log(data)
        let name = data.name
        let id = data._id
        _topicId.push(clone(id))

        result = '   <div id= ' + id + ' class="theme-div" data-toggle="modal" >  ' +
            // '                            <a href="">  ' +
            '                                <div class="theme-circle' + random() + '">  ' +
            '                                    <img src="../images/' + random() + '.jpg" class="img-circle theme-img" alt="user img">   ' +
            '                                    <span class="theme-text">' + name + '</span>  ' +
            '                                    <div class="progress">  ' +
            '                                        <div class="progress-bar progress-bar-striped progress-bar-info active" role="progressbar"  ' +
            '                                             aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:50%">  ' +
            '                                            50%  ' +
            '                                        </div>  ' +
            '                                    </div>  ' +
            '                                </div>  ' +
            // '                            </a>  ' +
            '                       </div>  ';

        return result;

    }


    function genTopic(data) {
        // Data : List Topic
        // console.log(data)
        data.forEach(element => {
            let question = genQuestionHTML(element)
            $("#question-box").append(question)
        });

    }


    // The following code return a callback(data) with 10 question
    function getQuestion(id, callback) {
        let mylist = []
        $.ajax({
            type: "POST",
            method: "POST",
            url: "http://localhost:8080/api/choose/question",
            data: { topicid: id },
            success: function(data) {

                mylist = mylist.concat(data.data)
                for (var i = 0; i < mylist.length; i++) {
                    mylist[i].type = 1
                }
                $.ajax({
                    type: "POST",
                    method: "POST",
                    url: "http://localhost:8080/api/fill/question",
                    data: { topicid: id },
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

    //function show question when choose theme
    function showQuestion(index) {
        question = _queue[index]
        _position = index
        console.log("question", question)
        $("#question").text(question["quesion"]);
        if (question["type"] == 1) {
            var list = question["option"];
            answers = '   <form id="form-answer">  ' +
                '   <div class="radio">  ' +
                '                                   <label><input type="radio" name="answer" value=0>' + list[0] + '</label>  ' +
                '                               </div>  ' +
                '                               <div class="radio">  ' +
                '                                   <label><input type="radio" name="answer" value=1>' + list[1] + '</label>  ' +
                '                               </div>  ' +
                '                               <div class="radio">  ' +
                '                                   <label><input type="radio" name="answer" value=2>' + list[2] + '</label>  ' +
                '                               </div>  ' +
                '                               <div class="radio">  ' +
                '                                   <label><input type="radio" name="answer" value=3>' + list[3] + '</label>  ' +
                '                              </div>  ' +
                '  </form>  ';
            $("#list-answer").empty();
            $("#list-answer").append(answers);
            if (!$('input[type="radio"]').is(':checked')) {
                $("#check-btn").prop('disabled', true);
            }

        } else {
            area = '   <div class="form-group">  ' +
                '     <h3><label for="comment"></label></h3>  ' +
                '     <textarea class="form-control" rows="6" id="area-answer"></textarea>  ' +
                '  </div>  ';
            $("#list-answer").empty();
            $("#list-answer").append(area);
            // $("#check-btn").prop('disabled', true);
        }
    }

    // Click to direct to Learn-Interface
    $("div.theme-box").on('click', 'div.theme-div', function() {
        $("#main-interface").hide();
        $("#view-question").show();
        var id = $(this).attr('id');
        $('#myModal').modal('show');
        $('#timeTrue').on('click', function() {
            timer();
            learn(id);
        });
        $('#timeFalse').on('click', function() {
            learn(id);
        });
    });

    var learn = function(id) {
        turnOnQuestion()
        getQuestion(id, function(data) {
            console.log(data)
            _queue = data
            showQuestion(0)
        })
    }

    var submitPoint = function(topicid, exp) {
        $.ajax({
            type: "POST",
            method: "POST",
            url: "http://localhost:8080/api/user/exp",
            data: { "topicid": topicid, "exp": exp },
            success: function(data) {}
        });
    }

    var timer = function(id) {
        setTimeout(function(id) {
            endLearn(id, _point)
        }, 15000)
    };

    //check anwser with button check-btn
    var turnOnQuestion = function() {
        $("#check-btn").on('click', () => {
            if (_position < 10) {
                if (_queue[_position].type == 1) {
                    answer = $('input[type="radio"]:checked').val();
                    true_ans = _queue[_position].answer
                    if (answer == true_ans) {
                        // Answer right
                        _point += 1
                        _position += 1
                        $("div.group-button").css("background-color", "#bff199");

                    } else {
                        // Answer wrong
                        _position += 1
                        $("div.group-button").css("background-color", "#ffd3d1");
                    }
                    $("input").prop('disabled', true);
                } else {
                    // Fill quesrion 
                    answer = $('#area-answer').val();
                    true_ans = _queue[_position].answer
                    console.log(answer)
                    var ok = false
                    for (x in true_ans) {
                        if (x.trim() == answer.trim()) {
                            $("div.group-button").css("background-color", "#bff199");
                            ok = true;
                            _point += 1;
                            break;
                        }
                    }
                    // Answer wrong
                    if (!ok) {
                        $("div.group-button").css("background-color", "#ffd3d1");
                    }
                    _position += 1
                    $("textarea").prop('disabled', true);
                }
                $("#check-btn").hide();
                $("#next-btn").show();
                $("#ignore-btn").prop('disabled', true);
            }
        })
    }


    //disable check-btn when show view-question
    $('#list-answer').on('click', 'input[name ="answer"]', function() {
        $("#check-btn").prop('disabled', false);
    });

    $('#done-btn').on('click', function() {
        $("#show-result").hide();
        $("#main-interface").show();
    });

    $('#next-btn').on('click', function() {
        $("div.group-button").css("background-color", "#f0f0f0");
        $("#next-btn").hide();
        $('#check-btn').show();
        $("input").prop('disabled', false);
        $("textarea").prop('disabled', false);
        $("#ignore-btn").prop('disabled', false);
        if (_position < 10) {
            showQuestion(_position);
        } else {
            endLearn();
        }
    });

    var endLearn = function(id, point) {
        $("#view-question").hide();
        $("#show-result").show();
        $("#point").text(_point + " / 10");
        submitPoint(id, point)
        _point = 0;
        _queue = null;
    }
    $("#ignore-btn").on('click', function() {
        _position += 1;
        if (_position < 10) {
            showQuestion(_position);
        } else {
            $("#view-question").hide();
            $("#show-result").show();
            $("#point").text(_point + " / 10");
            _point = 0;
        }
    });

    $("#list-answer").on('change', 'textarea', function() {
        if ($.trim($('textarea').val()).length < 1) {
            $("#check-btn").prop('disabled', true);
        } else {
            $("#check-btn").prop('disabled', false);
        }
    });


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


    var callData = function() {
        $.ajax({
            type: "GET",
            method: "GET",
            url: "http://localhost:8080/api/course/all",
            data: "",
            success: function(data) {

                let courseId = data.data[0]["_id"]
                $.ajax({
                    type: "POST",
                    method: "POST",
                    url: "http://localhost:8080/api/topic/all",
                    data: { "courseid": courseId },
                    success: function(data) {

                        let topic_data = []
                        for (var i = 0; i < data.data.length; ++i) {
                            topic_data.push(clone(data.data[i]))
                        }

                        genTopic(topic_data)

                    }
                });
            }
        });
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
        callData()
    }

    //==================== RUN EXCUTION ========================

    main()



})