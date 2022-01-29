/* --- temporary way to access mlg.html by clicking on the nav logo 5 times ;) --- */

if (domLoaded = true) {
    setTimeout(function() {
        var count = 0;
        document.querySelector("#nav-logo").addEventListener("click", function() {
            count += 1;
            console.log(count);
            if (count == 5)
                window.location = "mlg.html";
        });
    }, 500);
}