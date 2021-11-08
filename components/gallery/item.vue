<template>
<div class="gallery__item col-6 md:col-4 lg:col-3">
  <a :href="src" target="_blank" class="gallery__image-container" title="Open full size image">
    <img :src="src" :alt="alt" class="gallery__image" loading="lazy">
  </a>
  <div class="gallery__caption">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  props: {
    src: { type: String, required: true },
    alt: { type: String, default: '' }
  }
};
</script>
<style lang="scss">
.gallery__item .gallery__image-container {
  @apply block w-full relative m-0 hover:no-underline;
  padding-bottom: 100%;
}
.gallery__item .gallery__image {
  @apply w-full h-full absolute top-0 left-0 object-cover m-0;
}
.gallery__caption {
  @apply text-sm text-center;
}
</style>
