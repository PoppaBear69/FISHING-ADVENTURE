document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".enlargeable");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeLightbox = document.getElementById("close-lightbox");

    // Map Elements (Only on Home Page)
    const mapPopup = document.getElementById("mapPopup");
    const mapButton = document.getElementById("openMap");
    const closeMap = document.getElementById("closeMap");

    // Ensure lightbox starts hidden
    if (lightbox) {
        lightbox.style.display = "none";
        lightboxImg.src = "";

        images.forEach(img => {
            img.addEventListener("click", function () {
                console.log("Clicked image source:", this.src);
                if (this.src) {
                    lightboxImg.src = this.src;
                    lightbox.style.display = "flex";
                }
            });
        });

        closeLightbox.addEventListener("click", function () {
            lightbox.style.display = "none";
            lightboxImg.src = "";
        });

        lightbox.addEventListener("click", function (e) {
            if (e.target !== lightboxImg) {
                lightbox.style.display = "none";
                lightboxImg.src = "";
            }
        });
    }

    // ✅ Ensure map functionality works only on the home page
    if (mapButton && mapPopup && closeMap) {
        mapButton.addEventListener("click", function () {
            mapPopup.style.display = "flex";
        });

        closeMap.addEventListener("click", function () {
            mapPopup.style.display = "none";
        });

        mapPopup.addEventListener("click", function (e) {
            if (e.target !== mapPopup.querySelector("iframe")) {
                mapPopup.style.display = "none";
            }
        });

        // Ensure map is hidden when the page loads
        window.addEventListener("load", function () {
            mapPopup.style.display = "none";
        });
    }
});
