module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		//'plugin:@typescript-eslint/strict-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'prettier'
	],
	plugins: ['@typescript-eslint'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		//sourceType: 'module',
		//ecmaVersion: 2020,
		project: true,
		tsconfigRootDir: __dirname
	},
	root: true
	//env: {
	//	browser: true,
	//	es2021: true,
	//	node: true
	//},
	//ignorePatterns: ['*.cjs'],
};
