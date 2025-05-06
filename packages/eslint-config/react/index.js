module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:storybook/recommended',
    '../common/index.js',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/no-direct-mutation-state': 'off',
    'react/require-render-return': 'off',
    'react/no-unescaped-entities': 'off',
  },
  ignorePatterns: '**/generated/*',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
