/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': '#ffffff',
        'gray-100': '#f0f0f0',
        'gray-200': '#d0d0d0',
        'dark-gray': '#102030',
        'primary': '#3498db',
        'success': '#2ecc71',
        'error': '#e74c3c',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({strategy: 'class'}),
  ],
};