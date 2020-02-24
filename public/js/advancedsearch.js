$(document).ready(function() {
    $("#submitName").on("click",function(event){
        event.preventDefault();

        $.ajax({
            url: "/search",
            type:"POST",
            data: {
                firstName:$("#firstName").val(),
                lastName:$("#lastName").val()
        },
            success: function(res) {
                window.location.pathname = res
            }
          })
        })

        
        $("#submitEmail").on("click",function(event){
            event.preventDefault();
    
            $.ajax({
                url: "/search",
                type:"POST",
                data: {
                    email:$("#email").val()
            },
                success: function(res) {
                    window.location.pathname = res
                }
              })
            })
    });
