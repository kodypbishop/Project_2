$(document).ready(function(){
    $("#writeReview").on("click", function(e){
        e.preventDefault();

        let revieweeID = $(this).data("id");
        console.log(revieweeID);
        
        window.location.pathname = "/review/"+revieweeID;
    })
})