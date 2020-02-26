$(document).ready(function (data) {
    $("/api/profile", function () {
        $.ajax({
            url: "/api/profile",
            type: "GET",
            data: {
                firstName: $("#firstName").val(),
                lastName: $("#lastName").val(),
                gender: $("#gender").val(),
                stars: $("#lastName").val(),

            }.then(function () {
                console.log(data)
                window.location.replace("/profile");
            })
        })
    })
});
