module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
  extends: ["@nuxtjs", "plugin:nuxt/recommended", "prettier"],
  plugins: [],
  // add your custom rules here
  rules: {
    "vue/attribute-hyphenation": 0,
    "vue/multi-word-component-names": 0,
    "no-debugger": 0,
    "no-console": 0,
    "vue/no-v-for-template-key": 0,
  },
};
