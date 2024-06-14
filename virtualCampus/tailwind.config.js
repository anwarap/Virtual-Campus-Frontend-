// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     'node_modules/flowbite-react/lib/esm/**/*.js'
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('flowbite/plugin')
// ]
// }


import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...require('tailwindcss/colors'),
      'blue-100': '#1e1d85',
      'gray-900': 'rgba(0,0,0,0.35)',
      'indigo-750': '#6d6cb0',
      'white-100': 'rgba(255, 255, 255, 0.4)',
      'white-50': 'rgba(255, 255, 255, 0.85)'
      
    },
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'],
      'prompt': ['Prompt', 'sans-serif'],
      'Kantumruy': ['Kantumruy', 'sans-serif'],
      'roboto-mono': ['Roboto Mono', 'monospace'],

    },
    fontWeight: {
      'mono-md':500,
      'prompt-light': 50,
      'prompt-xlight': 200,
      'prompt-lrlight': 300,
      'prompt-normal': 400,
      'prompt-semibold': 800,
    },
    
    extend: {
      spacing: {
        '128': '85vh',
        '120': '65vw',
      },
    },
  },

  plugins: [require('daisyui')],
  daisyui:{
    darkTheme:"light",
    base:false
  }
});

// const withMT = require("@material-tailwind/react/utils/withMT");
 
// module.exports = withMT({
//   content: ["./index.html", "./src/*/.{vue,js,ts,jsx,tsx}"],
//   theme: {
//     fontFamily: {
//       'sans': ['ui-sans-serif', 'system-ui'],
//       'serif': ['ui-serif', 'Georgia'],
//       'mono': ['ui-monospace', 'SFMono-Regular'],
//       'display': ['Oswald'],
//       'body': ['"Open Sans"'],
//     },
//     extend: {},
//   },
//   plugins: [
//     // require('@tailwindcss/forms'),

//   ],
// });