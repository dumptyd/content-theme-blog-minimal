<template>
<div>
  <tags-wrapper :tags="tags"></tags-wrapper>
  <nuxt-child></nuxt-child>
</div>
</template>

<script>
import { getTags } from '~/utils';

export default {
  async asyncData({ $content }) {
    const tags = await getTags($content);
    return {
      tags
    };
  },
  head: {
    title: 'Tags'
  },
  created() {
    if (/^\/tags\/?$/.test(this.$route.path) && this.tags.length) {
      this.$router.replace(this.tags[0].href);
    }
  },
  methods: {
    getHref(categoryLabel) {
      return `/tags/${categoryLabel}`;
    }
  }
};
</script>
