<template>
<section class="about-author prose dark:prose-light">
  <nuxt-content v-if="about" :document="about"></nuxt-content>
</section>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const about = await $content('about').fetch().catch(() => {});

    return {
      about
    };
  },
  head: {
    title: 'About'
  }
};
</script>

<style lang="scss">
.about-author {
  @apply max-w-none;
}
.about-author .nuxt-content {
  > h2:first-child,
  > h3:first-child,
  > h4:first-child,
  > h5:first-child{
    @apply mt-0;
  }
}
</style>
