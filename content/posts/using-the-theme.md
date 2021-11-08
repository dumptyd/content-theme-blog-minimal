---
title: "Using the theme"
description: "Learn how to use the theme for creating your own blog within minutes!"
category: "Documentation"
tags: ["usage", "installation", "documentation", "meta"]
createdAt: "2021-11-8 3:00:00"
---

`content-theme-blog-minimal` is a standalone theme for creating your blog within minutes!

### Table of contents

- [Feature overview](#feature-overview)
- [Usage](#usage)
  - [Setup](#setup)
  - [Writing and customization](#writing-and-customization)
  - [Deploy](#deploy)
  - [Getting new features](#getting-new-features)
- [Future plans](#might-add-in-the-future)


## Feature overview

- Write your content in markdown with full access to TailwindCSS utilities for styling.
- Categories &amp; tags
- Syntax highlighting with 30+ themes to chose from
- Footnotes
- Light and dark mode
- Gallery component for rendering image grids in markdown
- Out of the box continuous deployment for GitHub pages

## Usage

### Setup
1. Clone this repository.
2. Run `yarn install`.
   1. Don't have `node` installed?
   2. [Install `nvm`](https://davidwalsh.name/nvm).
   3. Install node using `nvm`. (The theme was created and tested on node 12.)
   4. `npm install -g yarn`
   5. Now you should be all set to run `yarn install`.

### Writing and customization

1. Modify the default config in [`blog.config.js`](https://github.com/dumptyd/content-theme-blog-minimal/blob/master/blog.config.js).
2. Run `yarn start` to start the development server.
3. Start writing by adding markdown files in [/content/posts](https://github.com/dumptyd/content-theme-blog-minimal/blob/master/content/posts) and update [/content/about.md](https://github.com/dumptyd/content-theme-blog-minimal/blob/master/content/about.md).

#### blog.config.js

All the high level customizations should be done using this file. Documentation for individual attributes is provided in [`blog.config.js`](https://github.com/dumptyd/content-theme-blog-minimal/blob/master/blog.config.js).

#### Frontmatter

Frontmatter block should be added at the very top of the markdown files.

**All fields are optional.** If none of the posts have `category` or `tags` set then those links will be hidden from the navbar respectively.

| Attribute | Type | Description |
| - | - | - |
| `title` | string | Title of the post. Defaults to the path. |
| `description` | string | Description for the post. This is used on listing page and for meta:description. |
| `createdAt` | string | Post creation datetime. Defaults to the datetime when the file was created. |
| `category` | string | Category under which the post should be grouped into. |
| `tags` | array | Tags for the post. |

**Example**

```md
---
title: "First post"
createdAt: "2018-12-31"
category: "Web Development"
tags: ["javascript", "vue", "html"]
---
```

#### Images and other static content

Images should be put under `static/images`. They can then be linked using this syntax `![Alt text](images/name.png)` or `img` tags.

Other static content can be put under `static/` as well. Each file inside this directory is mapped to `/`.

#### Custom components

The theme comes with these custom components that can be used inside markdown files just like HTML tags.

**`social`** - By default, this is shown on the footer when social links are present. Use `<social></social>` to add that section in other places like about.md.

**`gallery` and `gallery-item`** - A basic set of components for showcasing images. Check out the contents directory to see them in action.


**For more details, check out https://content.nuxtjs.org/writing.**

### Deploy

1. Make sure there are no errors by running `yarn lint`. Run `yarn lint --fix` to fix the auto-fixable ones.
2. Make sure `productionPublicPath` in `blog.config.js` is set correctly.
2. If you're deploying to GitHub pages, push your changes to `master` and that's it.
3. For deploying to other services, modify the `Deploy` step in [deploy.yml](https://github.com/dumptyd/content-theme-blog-minimal/blob/master/.github/workflows/deploy.yml) and then push to master.

### Getting new features

```bash
git remote add upstream https://github.com/dumptyd/content-theme-blog-minimal.git
git fetch upstream master
git checkout master
git rebase upstream/master
```

### Might add in the future

- [ ] Code copy widget
- [ ] Full text search
- [ ] Additional options in navbar
- [ ] Draft state
- [ ] Table of contents
- [ ] Google/other analytics
- [ ] Sitemap
- [ ] Compact styles for post content
