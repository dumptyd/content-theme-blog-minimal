<template>
<div class="layout">
  <header class="layout__header">
    <h1 class="header__title">
      <nuxt-link to="/">{{ title }}</nuxt-link>
    </h1>
    <nav class="layout__nav">
      <ul>
        <li><nuxt-link to="/" exact>Posts</nuxt-link></li>
        <li v-if="hasCategories"><nuxt-link to="/categories">Categories</nuxt-link></li>
        <li v-if="hasTags"><nuxt-link to="/tags">Tags</nuxt-link></li>
        <li><nuxt-link to="/about" aria-label="About the author of this blog">About</nuxt-link></li>
        <li class="self-stretch flex items-center" aria-hidden="true">
          <div v-if="$colorMode.unknown" class="select-none">
            <icon-loader class="animate-spin"></icon-loader>
          </div>
          <button v-else :title="`Switch to ${oppositeTheme} mode`" @click="$colorMode.preference = oppositeTheme;">
            <component :is="$colorMode.value === 'light' ? 'icon-moon' : 'icon-sun'"></component>
          </button>
        </li>
      </ul>
    </nav>
  </header>
  <hr>
  <main class="layout__content">
    <Nuxt></Nuxt>
  </main>
  <hr>
  <!-- TODO: hide footer when there are no socials and showThemeLink is false -->
  <footer class="layout__footer">
    <social class="mr-auto mb-4" :size="24"></social>
    <!-- TODO: add repository link -->
    <div v-if="showThemeLink" class="credit mb-4">
      <a href="https://github.com/dumptyd/content-theme-blog-minimal" target="_blank">Theme by @dumptyd</a>
    </div>
  </footer>
</div>
</template>

<script>
import { Moon, Sun, Loader } from 'lucide-vue';
import { hasTags, hasCategories } from '~/utils';
import blogConfig from '~/blog.config';

export default {
  components: {
    'icon-moon': Moon,
    'icon-sun': Sun,
    'icon-loader': Loader
  },
  data() {
    return {
      hasTags: false,
      hasCategories: false,

      title: blogConfig.title,
      showThemeLink: blogConfig.showThemeLink
    };
  },
  async fetch() {
    this.hasTags = await hasTags(this.$content);
    this.hasCategories = await hasCategories(this.$content);
  },
  head() {
    const meta = [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ];
    if (blogConfig.description) meta.push(
      { hid: 'description', name: 'description', content: blogConfig.description },
      { hid: 'og:description', property: 'og:description', content: blogConfig.description },
      { hid: 'twitter:description', name: 'twitter:description', content: blogConfig.description }
    );
    return {
      meta
    };
  },
  computed: {
    oppositeTheme() {
      return this.$colorMode.value === 'light' ? 'dark' : 'light';
    }
  }
};
</script>

<style lang="scss">
.layout {
  @apply flex flex-col min-h-screen;
}
.layout__header {
  @apply flex flex-wrap items-center container;
}
.header__title {
  @apply text-xl md:text-2xl font-semibold md:mr-auto my-3 mr-8 dark:text-gray-300;
  a {
    @apply hover:no-underline;
  }
}
.layout__nav {
  @apply my-3;
  > ul {
    @apply flex flex-wrap items-center justify-end;
  }

  > ul li {
    @apply mr-8;
    &:last-child {
      @apply mr-0;
    }
  }
  a {
    @apply hover:underline;
  }
  .nuxt-link-exact-active, .nuxt-link-active {
    @apply font-semibold pointer-events-none dark:text-gray-200;
  }

}
.layout__content {
  @apply container flex-grow my-8;
}
.layout__footer {
  @apply container pt-4 text-sm flex items-center flex-wrap;
}
.credit a {
  @apply underline;
}
</style>
