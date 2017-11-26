$("document").ready(function() {
    $.post("http://localhost:8080/MyEng/Main", {message:"setCookie"}, function(data) {
        console.log(data)
        
    })
    
    
})