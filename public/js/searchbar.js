$(document).ready(function () {

    $("#submitSearch").on("click", function (event) {
        event.preventDefault();
        if($("#searchBar").val().trim().length < 1){}else{
        $.ajax({
            url: "/api/searchbar",
            type: "POST",
            data: {
                search: $("#searchBar").val()
            },
            success: function (res) {
                window.location.pathname = res
            }
        })}
    })

});