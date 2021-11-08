<template>
<div v-if="posts && posts.length">
  <post-item
    v-for="post in posts" :key="post.href"
    v-bind="{
      createdAtFormattedShort: post.createdAtFormattedShort,
      href: post.href, title: post.title, description: post.description
    }">
  </post-item>
</div>
<div v-else class="text-center opacity-60">There are no posts in that category.</div>
</template>

<script>
import { getPostsByCategory } from '~/utils';

export default {
  async asyncData({ $content, params }) {
    const posts = await getPostsByCategory($content, params.category);
    return {
      posts
    };
  },
  head() {
    return {
      title: `Posts in ${this.$route.params.category}`
    };
  }
};
</script>

<style>

</style>
