const config = require("./data/SiteConfig");
const pathPrefix = config.pathPrefix === "/" ? "" : config.pathPrefix;
const regexExcludeRobots = /^(?!\/(dev-404-page|404|offline-plugin-app-shell-fallback|tags|categories)).*$/

module.exports = {
	pathPrefix: config.pathPrefix,
	siteMetadata: {
	  siteUrl: config.siteUrl + pathPrefix,
	  rssMetadata: {
	    site_url: config.siteUrl + pathPrefix,
	    feed_url: config.siteUrl + pathPrefix + config.siteRss,
	    title: config.siteTitle,
	    description: config.siteDescription,
	    image_url: `${config.siteUrl + pathPrefix}/logos/logo-512.png`,
	    author: config.userName,
	    copyright: config.copyright
	  }
	},
  	plugins: [
  		'gatsby-plugin-react-helmet',
  		'gatsby-plugin-sass'
  	],
};
