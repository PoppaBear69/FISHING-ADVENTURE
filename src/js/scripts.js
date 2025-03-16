document.addEventListener("DOMContentLoaded", function () {
    const mapPopup = document.getElementById("mapPopup");
    const mapButton = document.getElementById("openMap");
    const closeMap = document.getElementById("closeMap");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeLightbox = document.getElementById("close-lightbox");
    const images = document.querySelectorAll(".enlargeable");

   
    if (mapButton && mapPopup && closeMap) {
        mapButton.addEventListener("click", function () {
            mapPopup.style.display = "flex"; // Restore functionality
            setTimeout(() => mapPopup.classList.add("show"), 10); // Smooth transition
        });

        closeMap.addEventListener("click", function () {
            mapPopup.classList.remove("show");
            setTimeout(() => (mapPopup.style.display = "none"), 300); // Smoothly hide
        });

        mapPopup.addEventListener("click", function (e) {
            if (e.target !== mapPopup.querySelector("iframe")) {
                mapPopup.classList.remove("show");
                setTimeout(() => (mapPopup.style.display = "none"), 300);
            }
        });

        window.addEventListener("load", function () {
            mapPopup.classList.remove("show");
            mapPopup.style.display = "none";
        });
    }

    
    if (lightbox) {
        images.forEach(img => {
            img.addEventListener("click", function () {
                lightboxImg.src = this.src;
                lightbox.style.display = "flex"; // Restore functionality
                setTimeout(() => lightbox.classList.add("show"), 10); // Smooth transition
            });
        });

        closeLightbox.addEventListener("click", function () {
            lightbox.classList.remove("show");
            setTimeout(() => {
                lightbox.style.display = "none";
                lightboxImg.src = "";
            }, 300);
        });

        lightbox.addEventListener("click", function (e) {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove("show");
                setTimeout(() => {
                    lightbox.style.display = "none";
                    lightboxImg.src = "";
                }, 300);
            }
        });

        window.addEventListener("load", function () {
            lightbox.classList.remove("show");
            lightbox.style.display = "none";
            lightboxImg.src = "";
        });
    }
});
