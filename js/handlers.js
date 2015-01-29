$(document).ready(function () {

    function updateLoc() {
        $(".current-location").html(Url.getLocation());
    }

    $("article .btn").on("click", function () {
        var code = $(this).closest(".row").find("pre").text()
        if (!code) { return; }
        eval(code);
        updateLoc();
    });

    updateLoc();

    $(".version").text(Url.version);
});
