module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],

  rules: {
    semi: ['error', 'always'],
    'no-multiple-empty-lines': ['warn', { max: 3 }],
    'space-before-function-paren': ['warn', 'never'],
    curly: ['off'],
    'vue/no-v-html': ['off'],
    'vue/html-closing-bracket-newline': ['warn', { singleline: 'never', multiline: 'never' }],
    'vue/html-indent': ['warn', 2, {
      baseIndent: 0,
      alignAttributesVertically: false
    }],
    'vue/multiline-html-element-content-newline': ['warn', {
      allowEmptyLines: true
    }],
    'vue/max-attributes-per-line': ['warn', {
      singleline: 25,
      multiline: {
        max: 25,
        allowFirstLine: true
      }
    }],
    'vue/singleline-html-element-content-newline': ['off'],
    'vue/html-self-closing': ['error', { html: { component: 'never', normal: 'never' } }]
  }
};
