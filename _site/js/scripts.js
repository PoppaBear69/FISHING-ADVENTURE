document.addEventListener("DOMContentLoaded", function () {
    const mapButton = document.getElementById("openMap");
    const mapContainer = document.getElementById("mapContainer");
    const googleMap = document.getElementById("googleMap");

    if (mapButton && mapContainer && googleMap) {
        console.log("All elements found. Adding event listeners...");

        // Show the map when clicking "My Area"
        mapButton.addEventListener("click", function () {
            console.log("Opening map...");
            mapContainer.style.display = "flex";

            // Ensure the map is always reloaded properly
            if (!googleMap.hasAttribute("data-loaded")) {
                googleMap.src =
                    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d96672.4225027839!2d-72.7718674515876!3d40.78372388313736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2us!4v1741388724694!5m2!1sen!2us";
                googleMap.setAttribute("data-loaded", "true");
            }
        });

        // Close the map when clicking outside the iframe
        mapContainer.addEventListener("click", function (event) {
            if (!googleMap.contains(event.target)) {
                console.log("Closing map...");
                mapContainer.style.display = "none";
            }
        });

    } else {
        console.error("One or more elements not found in the document.");
    }
});
