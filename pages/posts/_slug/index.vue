<template>
<div>
  <article v-if="post" class="post-content prose dark:prose-light">
    <header class="post-content__header">
      <h1 class="post-content__title">{{ post.title }}</h1>

      <div class="post-content__meta">
        <time class="post-content__meta-date">{{ post.createdAtFormattedLong }}</time>
        <template v-if="post.category && post.category.slug">
          <span class="post-content__meta-divider"></span>
          <nuxt-link
            :to="post.category.href" class="post-content__meta-category link-native"
            title="View all posts from this category">
            {{ post.category.label }}
          </nuxt-link>
        </template>
      </div>

      <div v-if="post.tags" class="post-content__tags">
        <nuxt-link
          v-for="tag in post.tags" :key="tag.slug" class="post-content__tag link-native"
          :to="tag.href" title="View all posts with this tag">
          #{{ tag.label }}
        </nuxt-link>
      </div>
    </header>
    <nuxt-content :document="post"></nuxt-content>
  </article>

  <aside class="post-surround">
    <div class="post-surround__row">
      <span class="post-surround__previous">
        <template v-if="prev">
          &larr; <nuxt-link :to="prev.href">{{ prev.title }}</nuxt-link>
        </template>
      </span>

      <span class="post-surround__home">
        <nuxt-link to="/" class="" title="Go to all posts">
          <icon-home></icon-home>
        </nuxt-link>
      </span>

      <span class="post-surround__next">
        <template v-if="next">
          <nuxt-link :to="next.href">{{ next.title }}</nuxt-link> &rarr;
        </template>
      </span>
    </div>
  </aside>
</div>
</template>

<script>
import { Home } from 'lucide-vue';

export default {
  components: {
    'icon-home': Home
  },
  async asyncData({ $content, params, error }) {
    const post = await $content('posts').where({ slug: { $eq: params.slug } }).limit(1).fetch();
    if (!post || !post.length) return error({ statusCode: 404, message: 'Page not found' });
    const [prev, next] = await $content('posts').only(['title', 'href']).sortBy('createdAt', 'asc').surround(params.slug).fetch();
    return {
      post: post[0] || null,
      prev,
      next
    };
  },
  head() {
    if (!this.post) return;
    const { title, description, category, tags, createdAt } = this.post;

    const meta = [
      { hid: 'og:type', property: 'og:type', content: 'article' },
      { hid: 'og:title', property: 'og:title', content: title },
      { hid: 'twitter:title', name: 'twitter:title', content: title },
      { hid: 'article:published_time', property: 'article:published_time', content: createdAt }
    ];
    if (category && category.label) meta.push({ hid: 'article:section', property: 'article:section', content: category.label });
    tags.forEach(({ label }) => {
      meta.push({ hid: `article:tag:${label}`, property: 'article:tag', content: label });
    });
    if (description) meta.unshift(
      { hid: 'description', name: 'description', content: description },
      { hid: 'og:description', property: 'og:description', content: description },
      { hid: 'twitter:description', name: 'twitter:description', content: description }
    );
    return {
      title: this.post.title,
      meta
    };
  }
};
</script>

<style lang="scss">
.post-content {
  @apply max-w-none;
}
.post-content__header {
  @apply pb-3 border-b-4 mb-8;
}
h1.post-content__title { /* increased specificity */
  @apply text-3xl md:text-4xl mb-0;
}
.post-content__meta {
  @apply opacity-50 text-sm flex flex-wrap items-center;
}
.post-content__meta-date {
  @apply inline mt-3;
}
.post-content__meta-divider {
  @apply mx-2 border-r border-current mt-3 self-stretch inline-block;
}
.post-content__meta-category {
  @apply font-normal mt-3;
}
.post-content__tags {
  @apply opacity-50 text-sm mt-3;
}
.post-content__tag {
  @apply font-normal mr-3;
}
.post-surround {
  @apply border-t pt-6;
}
.post-surround__row {
  @apply row gx-2 gy-3;
}
.post-surround__previous, .post-surround__next {
  @apply col-12 sm:col-6 md:col-5 order-2 md:order-none text-center;
}
.post-surround__previous {
  @apply sm:text-left;
}
.post-surround__next {
  @apply sm:text-right;
}
.post-surround__home {
  @apply col-12 md:col-2 flex justify-center order-1 md:order-none;
}
</style>
