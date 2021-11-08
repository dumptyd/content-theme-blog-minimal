<template>
<div v-if="posts && posts.length">
  <post-item
    v-for="post in posts" :key="post.slug"
    v-bind="{
      createdAtFormattedShort: post.createdAtFormattedShort,
      href: post.href, title: post.title, description: post.description
    }">
  </post-item>
</div>
<div v-else class="text-center opacity-60">There are no posts with that tag.</div>
</template>

<script>
import { getPostsByTag } from '~/utils';

export default {
  async asyncData({ $content, params }) {
    const posts = await getPostsByTag($content, params.tag);
    return {
      posts
    };
  },
  head() {
    return {
      title: `Posts tagged with ${this.$route.params.tag}`
    };
  }
};
</script>
