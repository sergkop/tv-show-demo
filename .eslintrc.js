const configs = [
  'eslint:recommended',
  'prettier',
  'plugin:prettier/recommended',
];

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: configs,
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: [
        'test.js',
      ],
      env: {
        jest: true,
      },
      extends: configs.concat('plugin:jest/recommended'),
      plugins: ['jest'],
    },
  ],
};
