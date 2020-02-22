$(document).ready(function() {
    $("#submit").on("click",function(event){
        event.preventDefault();

        $.ajax({
            url: "/search",
            type:"POST",
            data: {email:$("#email").val()},
            success: function(res) {
                console.log(res);
                alert(res)
            }
          })
        })
    });
