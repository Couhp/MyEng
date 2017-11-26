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

    //


    function genQuestionHTML(data) {
        //console.log(data)
        let name = data.name
        let id = data._id
        topicId.push(clone(id))

        result = '   <div class="theme-div">  ' +
            '                           <button id="' + id + '"class="theme">  ' +
            '                               <em></em>  ' +
            '                           </button>  ' +
            '                           <span class="theme-name">' + name + '</span>  ' +
            '                           <div class="progress"></div>  ' +
            '                      </div>  ';

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
    $("div.theme-box").on('click', 'button', function() {
        var id = $(this).attr('id')
        getQuestion(id, function(data) {
            console.log(data)
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