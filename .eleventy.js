const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const UglifyJS = require("uglify-es");
const htmlmin = require("html-minifier");

module.exports = function(eleventyConfig) {
  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
  eleventyConfig.addLayoutAlias("home", "layouts/home.njk");

  // Date formatting (human readable)
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  // Date formatting (machine readable)
  eleventyConfig.addFilter("machineDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  // Minify CSS
  //eleventyConfig.addFilter("cssmin", function(code) {
    //return new CleanCSS({}).minify(code).styles;
  //});

  //// Minify JS
  //eleventyConfig.addFilter("jsmin", function(code) {
    //let minified = UglifyJS.minify(code);
    //if (minified.error) {
      //console.log("UglifyJS error: ", minified.error);
      //return code;
    //}
    //return minified.code;
  //});

  // Minify HTML output
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (outputPath.indexOf(".html") > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  // only content in the `posts/` directory
  //eleventyConfig.addCollection("products", function(collection) {
    //return collection.getAllSorted().filter(function(item) {
      //return item.inputPath.match(/^\.\/src\/_products\//) !== null;
    //});
  //});

  // Don't process folders with static assets e.g. images

  // eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy('src/_redirects')

  /* Markdown Plugins */
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: false
  };

  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts)
  );

  return {
    templateFormats: ["md", "njk", "html"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",
    passthroughFileCopy: true,
    dataTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      includes: "includes",
      data: "data",
      output: "dist"
    }

  }
}
