<template>
<section v-if="posts.length">
  <post-item
    v-for="post in posts" :key="post.slug"
    v-bind="{
      createdAtFormattedShort: post.createdAtFormattedShort,
      href: post.href,
      title: post.title,
      description: post.description
    }">
  </post-item>
</section>
<div v-else>There are no posts here yet.</div>
</template>

<script>
import { getPosts } from '~/utils';

export default {
  async asyncData({ $content }) {
    const posts = await getPosts($content);

    return {
      posts
    };
  },
  head: {
    title: 'Posts'
  }
};
</script>
