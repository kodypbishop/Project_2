$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data", function(data){
      getUpdatedInfo(data.id);
  });

  function getUpdatedInfo(id){
    $.get("/api/user_data/"+id, function(updatedData){
        $("#profile-gender").text(updatedData.gender);
        $("#profile-pets").text(updatedData.pets);
        $("#profile-children").text(updatedData.children);
        $("#profile-job").text(updatedData.job);
    });
  }

});