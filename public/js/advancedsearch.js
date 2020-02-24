$(document).ready(function() {
    $("#submit").on("click",function(event){
        event.preventDefault();

        $.ajax({
            url: "/search",
            type:"POST",
            data: {firstName:$("#email").val()},
            success: function(res) {
                window.location.pathname = res
            }
          })
        })
    });
