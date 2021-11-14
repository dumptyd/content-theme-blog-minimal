/* eslint-disable quotes */

module.exports = {
  // used in the nav bar and title suffix (Home | ${this value})
  title: 'content-theme-blog-minimal',
  // used in meta description
  description: "A minimal blog theme for writing about tech...or anything else.",

  /*
    `location.origin` of where the site will be hosted (eg: https://example.com).
    If set, this will be used for generating the sitemap.
  */
  origin: 'https://dumptyd.github.io',
  /*
    specify the root path for the deployed site.
    if the blog will be deployed under a non-root path like /blog (eg: https://user.github.io/blog
    or https://example.com/blog), then change this to '/blog/' (trailing slash is important).
    for root path, set this to '/'.
  */
  productionPublicPath: '/content-theme-blog-minimal/',

  // theme to use for the blog. valid values are "light", "dark" and "system" (detect user's preference)
  blogTheme: 'system',

  /*
   can pick from any of the themes listed here: https://github.com/PrismJS/prism-themes/tree/master/themes
   preview: https://github.com/PrismJS/prism-themes/blob/master/README.md
   value format: 'prism-themes/themes/{filename}'
  */
  syntaxHighlightingTheme: 'prism-themes/themes/prism-night-owl.css',

  // maximum width of the content
  containerMaxWidth: '1024px',

  // Google fonts URL to the font
  fontURL: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap',
  // name of the font (include double quotes)
  fontName: '"IBM Plex Sans"',

  // path to the favicon file relative to `static/`. Use a png file.
  faviconLink: '/content-theme-blog-minimal/favicon.png',

  // enable Cloudflare analytics by specifying the token value provided in `data-cf-beacon` attribute of the script tag
  analyticsCloudflareToken: '11339a1546ce47ccb1e9ce95f0273a64',

  // social links - all links are optional, leave empty to hide. update `components/social.vue` to add more links
  github: 'https://github.com/',
  twitter: 'https://twitter.com/',
  youtube: 'https://youtube.com/',
  linkedin: 'https://linkedin.com/',
  email: 'john.doe@example.com',
  resume: 'https://example.com/myresume.pdf',

  // show or hide theme link from the footer
  showThemeLink: true
};
