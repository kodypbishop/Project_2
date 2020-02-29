$(document).ready(function(){

    let urlArr = window.location.href.split("/");
    let id = urlArr[urlArr.length-1];

    $.get("/api/user_data/"+id, function(data) {
        $("#reviewee-name").text(data.firstName);
    })

    $("#submit-review").on("click", function(e){
        e.preventDefault();

        let newReview = {
            content: $("#review-content").val().trim(),
            reviewee: $(this).data("reviewee"),
            reviewer: $(this).data("reviewer"),
            stars: $("input[name='star']:checked").val()
        }
            console.log(newReview)
        $.post("/api/review_data", newReview, function(){

        })

    })
})