---
title: Rendering markdown elements
category: "Demo"
tags: ["demo", "meta", "markdown"]
createdAt: "2021-11-8 02:00:00"
---

# h1 heading

Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore vel asperiores officia delectus enim vitae earum dolorum odio quaerat recusandae.

## h2 Heading

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore porro earum facere error. Accusantium hic eum, vel inventore dignissimos doloribus debitis velit expedita natus quaerat minus sit autem rem ullam atque perferendis tempore repudiandae asperiores aut cupiditate enim illo vitae.

### h3 Heading

Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni molestias fugit eveniet mollitia aliquid consequatur recusandae porro deleniti, nam nesciunt facilis reprehenderit sequi laboriosam corporis similique eum dolores! Animi, facilis.

#### h4 Heading

Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, distinctio.

##### h5 Heading

Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum, amet!

###### h6 Heading

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, voluptatum.

## Code

**Inline code**

`const arr = Array(10).fill(true);`

**JavaScript**

```js
import dayjs from 'dayjs';
import slug from 'slug';
import blogConfig from './blog.config';

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

```

**C++ (with file name)**

```cpp [hello-world.cpp]
// Your First C++ Program

#include <iostream>

int main() {
    std::cout << "Hello World!";
    return 0;
}
```

## Emphasis

**This is bold text**

*This is italic text*

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

**Unordered**

+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

**Ordered**

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa
1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

**Start numbering with offset:**

57. foo
1. bar


## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](https://github.com/dumptyd/content-theme-blog-minimal)

[link with title](https://github.com/dumptyd/content-theme-blog-minimal "title text!")

Auto-converted link https://github.com/dumptyd/content-theme-blog-minimal


## Images

![Minion](/images/nyantocat.gif)


## Footnotes

Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.

[^bignote]: Here's one with multiple paragraphs and code.

    Indent paragraphs to include them in the footnote.

    `{ my code }`

    Add as many paragraphs as you like.


## Task list

- [x] Task lists
- [ ] Code copy widget
- [ ] Full text search
- [ ] Additional options in navbar
- [ ] Draft state
- [ ] Table of contents
- [ ] Google/other analytics
- [ ] Sitemap

## Social

<social></social>

## Gallery

<gallery>
  <gallery-item src="https://picsum.photos/seed/1/400/800"></gallery-item>
  <gallery-item src="https://picsum.photos/seed/2/400/800"></gallery-item>
  <gallery-item src="https://picsum.photos/seed/23/400/800"></gallery-item>
  <gallery-item src="https://picsum.photos/seed/44/400/800">Optional caption</gallery-item>
</gallery>
