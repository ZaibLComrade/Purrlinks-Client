/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"primary": "#FA7592",
				"secondary-1": "#B683AB",
				"secondary-2": "#dedbd2",
				"accent-1": "#A8DADC",
				"accent-2": "#FFCBA4",
				"title": "#333333",
				"subtitle": "#666666",
				"neutral": " #EDEDED",
				"active-status": "#4CAF50",
				"paused-status": "#B0B0B0",
				"accept": "#4CAF50",
				"reject": "#FF3D00",
			},
		},
	},
	plugins: [],
}

