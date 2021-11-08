<template>
<div class="post-item">
  <time class="post-item__created-at">{{ createdAtFormattedShort }}</time>
  <div>
    <nuxt-link :to="href" class="post-item__link">{{ title }}</nuxt-link>
    <div v-if="description" class="post-item__description">{{ description }}</div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    createdAtFormattedShort: { type: String, required: true },
    href: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' }
  }
};
</script>

<style lang="scss">
.post-item {
  @apply mb-3 md:flex items-baseline;
}
.post-item__created-at {
  @apply text-sm opacity-50 dark:opacity-60 w-24 flex-shrink-0;
}
.post-item__link {
  @apply leading-normal hover:underline;
}
.post-item__description {
  @apply text-sm opacity-60 mt-1;
}
</style>
