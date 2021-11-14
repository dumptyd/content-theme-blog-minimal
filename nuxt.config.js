import dayjs from 'dayjs';
import slug from 'slug';
import blogConfig from './blog.config';
// eslint-disable-next-line nuxt/no-cjs-in-config
const path = require('path');

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  generate: {
    fallback: '404.html',
    subFolders: false
  },

  router: {
    base: blogConfig.productionPublicPath
  },

  hooks: {
    /**
     * Adds/modifies these keys:
     * - slug: replaces with URL friendly slugs
     * - href: post url
     * - createdAtFormattedShort: formatted date to show in post list
     * - createdAtFormattedLong: formatted date to show on post page
     * - tags: normalizes to [{ label, slug, href }] || []
     * - category: normalizes to { label, slug, href }
     */
    'content:file:beforeInsert': file => {
      file.title = file.title || file.path;
      file.description = file.description || '';

      file.slug = slug(file.slug);
      file.href = `/posts/${file.slug}`;

      file.createdAtFormattedShort = dayjs(file.createdAt).format('MMM DD, YY');
      file.createdAtFormattedLong = dayjs(file.createdAt).format('MMMM DD, YYYY');

      if (file.tags && file.tags.length) file.tags = file.tags.map(tag => {
        const tagSlug = slug(tag);
        return { label: tag.toLowerCase(), slug: tagSlug, href: `/tags/${tagSlug}` };
      });
      else file.tags = [];

      if (file.category) {
        const label = file.category.toString();
        const categorySlug = slug(label);
        file.category = { label, slug: categorySlug, href: `/categories/${categorySlug}` };
      } else file.category = { label: '', slug: '', href: '' };
    },
    // https://github.com/nuxt/content/issues/376#issuecomment-702193217
    'vue-renderer:ssr:templateParams'(params) {
      if (!blogConfig.productionPublicPath) return;
      params.HEAD = params.HEAD.replace(`<base href="${blogConfig.productionPublicPath}">`, '');
    }
  },

  server: {
    host: '0'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: `%s | ${blogConfig.title}`,
    htmlAttrs: {
      lang: 'en',
      id: 'root'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: blogConfig.faviconLink },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: blogConfig.fontURL }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/index.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    ...(process.env.NODE_ENV === 'development' ? ['~/plugins/tota11y.client.js'] : [])
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://github.com/nuxt-community/color-mode-module
    '@nuxtjs/color-mode'
  ],

  colorMode: {
    classSuffix: '',
    storageKey: 'preferred-mode',
    preference: blogConfig.blogTheme,
    fallback: 'light'
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    liveEdit: false,
    markdown: {
      rehypePlugins: [
        ['rehype-urls', function addBaseToCringeURLs(url) {
          if (!blogConfig.productionPublicPath) return;
          if (url.href && url.href.startsWith('/images/')) return path.join(blogConfig.productionPublicPath, url.href);
        }]
      ],
      prism: {
        theme: blogConfig.syntaxHighlightingTheme
      }
    },
    nestedProperties: [
      'category.slug',
      'tags.slug'
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
};
