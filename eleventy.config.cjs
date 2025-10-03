const markdownIt = require("markdown-it");
const markdownItAbbr = require("markdown-it-abbr");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItFootNote = require("markdown-it-footnote");

const siteTitle = "Guitar Challenges";
const siteSubtitle = "by the Fiasco Bros. EST 1991.";

module.exports = function (eleventyConfig) {
	const markdownLib = markdownIt({
		html: true,
		linkify: false,
		typographer: true,
		xhtmlOut: false,
	})
		.use(markdownItAnchor)
		.use(markdownItFootNote)
		.use(markdownItAbbr)
		.use(markdownItAttrs, {
			allowedAttributes: ["id", "class", "loading"],
		});

	eleventyConfig.setLibrary("md", markdownLib);

	eleventyConfig.addPairedShortcode("markdown", (content) => {
		return markdownLib.render(content);
	});

	eleventyConfig.addGlobalData("title", siteTitle);
	eleventyConfig.addGlobalData("siteTitle", siteTitle);
	eleventyConfig.addGlobalData("siteSubtitle", siteSubtitle);

	eleventyConfig.addPassthroughCopy("src/public");
	eleventyConfig.addPassthroughCopy({ "src/robots.txt": "/robots.txt" });
	eleventyConfig.setUseGitIgnore(false);
	eleventyConfig.setServerOptions({
		liveReload: true,
		watch: ["src/public/**/*"],
		showVersion: true,
	});

	return {
		dir: {
			includes: "_includes",
			layouts: "_layouts",
		},
	};
};
