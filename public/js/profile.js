$(document).ready(function(){
    $.get("/api/user_data").then(function(data){
        console.log(data);
    })
})

$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
        console.log(data);
      $(".member-name").text(data.firstName);
    });
  
  });