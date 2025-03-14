document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".gallery-item");

    // Create modal for full-size images
    const modal = document.createElement("div");
    modal.classList.add("image-modal");

    const modalImage = document.createElement("img");
    modal.appendChild(modalImage);
    document.body.appendChild(modal);

    // Click-to-Enlarge Functionality
    images.forEach(img => {
        img.addEventListener("click", () => {
            modalImage.src = img.src;
            modal.classList.add("open");
        });
    });

    // Close Modal When Clicking Outside the Image
    modal.addEventListener("click", () => {
        modal.classList.remove("open");
    });
});
