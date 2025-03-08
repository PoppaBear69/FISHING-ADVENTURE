module.exports = function (eleventyConfig) {
    // Pass through static assets so they appear in _site
    eleventyConfig.addPassthroughCopy("src/assets/css");
    eleventyConfig.addPassthroughCopy("src/assets/js");
    eleventyConfig.addPassthroughCopy("src/assets/images");
    eleventyConfig.addPassthroughCopy("src/assets/videos");

    return {
        dir: {
            input: "src",          // ✅ Source folder for Eleventy
            includes: "_includes", // ✅ Tells Eleventy where to find layout.html
            data: "_data",
            output: "_site"        // ✅ Output folder where Netlify will serve files
        }
    };
};
