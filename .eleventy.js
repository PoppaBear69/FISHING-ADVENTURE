module.exports = function (eleventyConfig) {
    // ✅ Pass through static assets (images, CSS, JS)
    eleventyConfig.addPassthroughCopy("src/images"); // Ensures images are copied
    eleventyConfig.addPassthroughCopy("src/css");    // Ensures styles.css is copied
    eleventyConfig.addPassthroughCopy("src/js");     // Ensures scripts.js is copied
  
    // ✅ Set input and output directories
    return {
      dir: {
        input: "src",   // Source folder (where your site files are)
        output: "_site", // Build output folder
        includes: "_includes", // Where Eleventy looks for layouts/partials
        data: "_data" // Where global data files are stored
      },
      passthroughFileCopy: true,
      templateFormats: ["html", "md", "liquid", "njk"] // Allowed template formats
    };
  };
  