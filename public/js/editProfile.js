$(document).ready(function () {

    let myWidget = cloudinary.createUploadWidget({
        cloudName: 'dbzd68jqu',
        uploadPreset: 'txetxwgy'
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('Done! Here is the image info: ', result.info);// gives you http url
            $.ajax({
                url: "/api/user/",
                type: "PATCH",
                data: {
                    url: result.info.secure_url
                }
            })


        }
    }
    )

    document.getElementById("upload_widget").addEventListener("click", function () {
        myWidget.open();
    }, false);

    $("#updateProfile").on("click", function (event) {
        event.preventDefault();
        let gender = $("input[name='gender']:checked").val();
        let pets = $("input[name='pets']:checked").val();
        let children = $("input[name='children']:checked").val();
        let jobs = $("#job").val();
        console.log(gender + pets + children + jobs)
        $.ajax({
            url: "/api/user",
            type: "POST",
            data: {
                gender: gender,
                pets: pets,
                children: children,
                jobs: jobs
            },
            success: function (res) {
                window.location.pathname = res
            }
        })
    })
});
