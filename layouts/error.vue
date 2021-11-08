<template>
<div>
  <div class="text-center max-w-none prose dark:prose-light mt-8">
    <div class="inline-block mx-auto text-red-400 dark:text-yellow-600 animate-bounce">
      <icon-bug class="fill-current" :size="128"></icon-bug>
    </div>
    <div class="-mt-6">
      <h3 v-if="error.statusCode === 404">404 - Page not found.</h3>
      <h3 v-else>{{ error.statusCode }} - {{ error.message || 'An error occurred' }}</h3>
      <p>How did you end up here?</p>
    </div>
  </div>
</div>
</template>

<script>
import { Bug } from 'lucide-vue';

export default {
  components: {
    'icon-bug': Bug
  },
  layout: 'default',
  props: {
    error: { type: Object, required: true }
  },
  head: {
    title: 'Page not found'
  }
};
</script>
