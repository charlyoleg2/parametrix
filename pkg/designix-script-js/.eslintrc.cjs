module.exports = {
	extends: ['eslint:recommended', 'prettier'],
	plugins: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	env: {
		// es2021: true,
		// node: true,
		browser: true
	},
	root: true
	//ignorePatterns: ['*.cjs'],
};
