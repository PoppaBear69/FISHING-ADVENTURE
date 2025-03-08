module.exports = function (config) {
    config.addPassthroughCopy("src/css");
    config.addPassthroughCopy("src/images");
    config.addPassthroughCopy("src/js");
    config.addPassthroughCopy("src/videos");

    return {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "_site"
        }
    };
};
