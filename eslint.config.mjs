import pluginJs from '@eslint/js';
import globals from 'globals';
import StylisticPlugin from '@stylistic/eslint-plugin';
import pluginCypress from 'eslint-plugin-cypress/flat';

export default [
  {
    languageOptions:
        {
          globals: globals.browser
        }
  },
  pluginJs.configs.recommended,
  pluginCypress.configs.recommended,
  StylisticPlugin.configs['disable-legacy'],
  {
    plugins: {
      stylistic: StylisticPlugin,
      cypress: pluginCypress
    },

    rules: {
      'stylistic/quotes': ['error', 'single'],
      'stylistic/indent': ['error', 2],
      'stylistic/semi': ['error', 'always'],
      'stylistic/no-trailing-spaces': 'error',
      'stylistic/no-extra-semi': 'error',
      'stylistic/no-multi-spaces': 'error',
      'stylistic/no-multiple-empty-lines': 'error',
      'stylistic/brace-style': 'error',
      'stylistic/function-call-spacing': 'error',
      'stylistic/no-mixed-operators': 'error',
      'stylistic/max-len': ['error', { code: 120, ignoreStrings: true }],
      'stylistic/space-in-parens': ['error', 'never'],
      'cypress/no-assigning-return-values': 'error',
      'cypress/no-unnecessary-waiting': 'error',
      'cypress/assertion-before-screenshot': 'warn',
      'cypress/no-force': 'off',
      'cypress/no-async-tests': 'error',
      'cypress/unsafe-to-chain-command': 'off',
      'space-before-function-paren': 'off',
      'no-prototype-builtins': 'off',
      'quote-props': ['error', 'consistent-as-needed']
    }
  }];
