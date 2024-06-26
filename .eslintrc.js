module.exports = {
  extends: 'airbnb',
  plugins: ['react', 'react-native', 'react-hooks', 'import', 'jsx-a11y'],
  parser: '@babel/eslint-parser',
  env: {
    jest: true,
    'react-native/react-native': true,
  },
  rules: {
    'no-use-before-define': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-unused-styles': 2,
    'arrow-body-style': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'react-native/no-raw-text': 2,
    'react-native/no-single-element-style-arrays': 2,
    'padded-blocks': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'linebreak-style': 'off',
    'no-useless-escape': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'object-curly-newline': 'off',
    'no-undef': 'off',
    'jsx-quotes': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-console': 'off',
    'react/function-component-definition': 'off',
    'import/no-extraneous-dependencies': 'off',
    semi: 'off',
  },
  globals: {
    fetch: false,
  },
}
