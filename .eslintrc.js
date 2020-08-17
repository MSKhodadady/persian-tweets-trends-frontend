module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    // 'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    "camelcase": "off",
    "no-console": "off",
    "vue/singleline-html-element-content-newline": "off",
    "padded-blocks": "off",
    "semi": ["error", "always"]
  }
}
