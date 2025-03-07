module.exports = function(eleventyConfig) {
    // Ensure Eleventy copies CSS and JS files
    eleventyConfig.addPassthroughCopy({ "src/css": "css" });
    eleventyConfig.addPassthroughCopy({ "src/js": "js" });

    return {
        dir: {
            input: "src",
            output: "_site"
        },
        markdownTemplateEngine: "liquid",
        htmlTemplateEngine: "liquid"
    };
};
