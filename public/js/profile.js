$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
  let id; 
    $.get("/api/user_data").then(function(data) {
        console.log(data);// gives me access to ID
        id = data.id;
      $(".member-name").text(data.firstName);
      $(".member-gender").text(data.gender);
    });

    let myWidget = cloudinary.createUploadWidget({
      cloudName: 'dbzd68jqu',
      uploadPreset: 'txetxwgy'
  }, (error, result) => {
      if (!error && result && result.event === "success") {
          console.log('Done! Here is the image info: ', result.info);// gives you http url
          $.ajax({
            url: "/api/user/" + id,
            type: "PATCH",
            data: {
              url: result.info.secure_url}
          })

          
      }
  }
  )

  document.getElementById("upload_widget").addEventListener("click", function () {
      myWidget.open();
  }, false);

  
  });
  

  
  
