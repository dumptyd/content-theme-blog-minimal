<template>
<div>
  <tags-wrapper :tags="categories"></tags-wrapper>
  <nuxt-child></nuxt-child>
</div>
</template>

<script>
import { getCategories } from '~/utils';

export default {
  async asyncData({ $content }) {
    const categories = await getCategories($content);
    return {
      categories
    };
  },
  head: {
    title: 'Categories'
  },
  created() {
    if (/^\/categories\/?$/.test(this.$route.path) && this.categories.length) {
      this.$router.replace(this.categories[0].href);
    }
  }
};
</script>
