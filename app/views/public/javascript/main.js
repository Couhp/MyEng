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

    let topicId = []
    let questions = []

    //


    function genQuestionHTML(data) {
        //console.log(data)
        let name = data.name
        let id = data._id
        topicId.push(clone(id))

        result = '   <div id= ' + id + ' class="theme-div">  ' +
            '                            <a href="">  ' +
            '                                <div class="theme-circle1">  ' +
            '                                    <img src="../images/beauty.jpg" class="img-circle theme-img" alt="user img">   ' +
            '                                    <span class="theme-text">' + name + '</span>  ' +
            '                                    <div class="progress">  ' +
            '                                        <div class="progress-bar progress-bar-striped progress-bar-info active" role="progressbar"  ' +
            '                                             aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:50%">  ' +
            '                                            50%  ' +
            '                                        </div>  ' +
            '                                    </div>  ' +
            '                                </div>  ' +
            '                            </a>  ' +
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
                $.ajax({
                    type: "POST",
                    method: "POST",
                    url: "http://localhost:8080/api/fill/question",
                    data: { topicid: id },
                    success: function(data) {
                        mylist = mylist.concat(data.data)
                        callback(mylist)
                    }
                })
            }
        });
    }


    // Click to direct to Learn-Interface
    $("div.theme-box").on('click', 'div.theme-div', function() {
        $("#main-interface").hide();
        $("#view-question").show();
        var id = $(this).attr('id')
        getQuestion(id, function(data) {
            console.log(data);
            questions = data;
        })
    });





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
                    for (var i = 0; i < 1; ++i) {
                        topic_data.push(clone(data.data[0]))
                    }

                    genTopic(topic_data)

                }
            });
        }
    });

})