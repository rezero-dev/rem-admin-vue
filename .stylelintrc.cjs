// https://stylelint.io/user-guide/configure/
module.exports = {
  extends: [
    // https://github.com/stylelint/stylelint-config-standard
    'stylelint-config-standard',
    // https://github.com/stylelint-less/stylelint-less
    'stylelint-config-standard-less',
    // https://github.com/ota-meshi/stylelint-config-recommended-vue
    'stylelint-config-recommended-vue',
    // https://github.com/constverum/stylelint-config-rational-order
    'stylelint-config-rational-order',
  ],
  overrides: [
    {
      files: ['**/*.(html)'],
      customSyntax: 'postcss-html',
    },
  ],
}
