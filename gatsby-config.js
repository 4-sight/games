/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: {
    title: ``,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    `gatsby-plugin-dts-css-modules`,
    `gatsby-plugin-split-css`,
    `gatsby-plugin-preact`,
  ],
};
