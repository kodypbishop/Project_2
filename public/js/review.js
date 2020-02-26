$(document).ready(function(){
    $("#submit-review").on("click", function(e){
        e.preventDefault();

        let newReview = {
            content: $("#review-content").val().trim(),
            reviewee: $(this).data("reviewee"),
            reviewer: $(this).data("reviewer"),
            stars: $("input[name='star']:checked").val()
        }

        $.post("/api/review_data", newReview, function(){

        })

    })
})