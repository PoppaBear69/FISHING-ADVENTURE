const fs = require("fs");

module.exports = function (eleventyConfig) {
    // ✅ Copy static assets
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/videos");

    // ✅ Generate a collection of images dynamically & exclude ocean.jpeg
    eleventyConfig.addCollection("images", function () {
        const imgDir = "src/images";

        return fs.readdirSync(imgDir)
            .filter(file => file.toLowerCase() !== "ocean.jpeg") // ❌ Exclude ocean.jpeg
            .map(file => ({
                url: `/images/${file}`,
                name: file
            }));
    });

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            data: "_data"
        }
    };
};
