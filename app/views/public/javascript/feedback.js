
$(document).ready(function(){
    
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
            data: { "subject":subject, "content":content },
            success: function(data) {
                console.log(data)
            }})
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
            }})
    }

    var showFb = function(data) {
        data.forEach(element => {
            var html = getFbHTML(element)
            $("#allFeedback").append(html)
        });
    }

    var getFbHTML = function (data) {
        var subject = data.subject
        var content = data.content
        var reply = data.reply
        var html = "<h>" +
                "<h5 > " + subject +"</h5>" +
                "<h6>" + content +"</h6>" +
                "<h6>Reply</h6>" + reply + "<br>" 
                "</h>"
        return html
    }


    $(".nav-tabs a").click(function(){
        $(this).tab('show');
    });
    $('.nav-tabs a').on('shown.bs.tab', function(event){
        var x = $(event.target).text();         // active tab
        var y = $(event.relatedTarget).text();  // previous tab
        $(".act span").text(x);
        $(".prev span").text(y);
    });


    var main = function() {
        getAllFb()
    }
    
    main()
});
