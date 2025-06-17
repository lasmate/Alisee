/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {}
	},
	plugins: [
		function ({ addVariant }) {
			addVariant('light', '.light &');
		}
	]
};
