<template>
<!-- generic component for "tags" and "categories" pages -->
<div class="tags-wrapper">
  <nuxt-link
    v-for="tag in tags" :key="tag.label"
    replace
    class="tags-wrapper__tag"
    :to="tag.href">
    {{ tag.label }} <small>({{ tag.postCount }})</small>
  </nuxt-link>
</div>
</template>

<script>
export default {
  props: {
    tags: { type: Array, required: true } // { label, href, postCount }
  }
};
</script>

<style lang="scss">
.tags-wrapper {
  @apply overflow-auto border pr-2 pb-2 rounded text-base mb-6;
  max-height: 40vh;
}
.tags-wrapper__tag {
  @apply inline-block px-3 border-2 ml-2 mt-2 rounded cursor-pointer select-none hover:no-underline;

  &.nuxt-link-exact-active {
    @apply bg-gray-500 border-current text-white dark:text-gray-300;
  }
}
</style>
