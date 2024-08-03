// eslint.config.js

import eslint from '@eslint/js';
import globals from 'globals';

export default [
	{
		ignores: ['dist/', 'output/', 'build/', 'node_modules/']
	},
	eslint.configs.recommended,
	{
		languageOptions: {
			globals: {
				...globals.node
			}
		}
	}
];
