<template>
<div class="social-links">
  <a v-if="github" :href="github" target="_blank" rel="noopener noreferrer" class="social-links__link link-native" title="Github">
    <icon-github aria-hidden="true" :size="size"></icon-github>
    <span class="sr-only">Github</span>
  </a>
  <a v-if="linkedin" :href="linkedin" target="_blank" rel="noopener noreferrer" class="social-links__link link-native" title="LinkedIn">
    <icon-linkedin class="text-blue-400" aria-hidden="true" :size="size"></icon-linkedin>
    <span class="sr-only">LinkedIn</span>
  </a>
  <a v-if="twitter" :href="twitter" target="_blank" rel="noopener noreferrer" class="social-links__link link-native" title="Twitter">
    <icon-twitter class="text-blue-400" aria-hidden="true" :size="size"></icon-twitter>
    <span class="sr-only">Twitter</span>
  </a>
  <a v-if="youtube" :href="youtube" target="_blank" rel="noopener noreferrer" class="social-links__link link-native" title="YouTube">
    <icon-youtube class="text-red-500" aria-hidden="true" :size="size"></icon-youtube>
    <span class="sr-only">YouTube</span>
  </a>
  <a v-if="resume" :href="resume" target="_blank" rel="noopener noreferrer" class="social-links__link link-native" title="Resume">
    <icon-file-text class="text-green-600" aria-hidden="true" :size="size"></icon-file-text>
    <span class="sr-only">Resume</span>
  </a>
  <a v-if="email" :href="`mailto:${email}`" target="_blank" rel="noopener noreferrer" class="social-links__link link-native" title="Email me">
    <icon-mail aria-hidden="true" :size="size"></icon-mail>
    <span class="sr-only">Email me</span>
  </a>
  <!-- add more here. List of available social icons - https://lucide.dev/?search=logo -->
</div>
</template>

<script>
import { Github, Twitter, Youtube, Mail, Linkedin, FileText } from 'lucide-vue';
import blogConfig from '~/blog.config';

export default {
  components: {
    'icon-github': Github,
    'icon-twitter': Twitter,
    'icon-youtube': Youtube,
    'icon-linkedin': Linkedin,
    'icon-mail': Mail,
    'icon-file-text': FileText
  },
  props: {
    size: { type: Number, default: 28 }
  },
  data() {
    return {
      github: blogConfig.github,
      twitter: blogConfig.twitter,
      youtube: blogConfig.youtube,
      email: blogConfig.email,
      linkedin: blogConfig.linkedin,
      resume: blogConfig.resume
    };
  }
};
</script>

<style lang="scss">
.social-links {
  @apply inline-flex flex-wrap items-center;
}
.social-links__link {
  @apply mr-4 opacity-90 transition-transform transform hover:opacity-100 hover:scale-110;
  &:last-child {
    @apply mr-0;
  }
}
</style>
