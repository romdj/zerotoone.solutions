/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#F11759',      // Pink
        'brand-secondary': '#8333C5',    // Purple  
        'brand-accent': '#D67D21',       // Orange
        'brand-white': '#FFFFFF',
        'text-primary': '#1a1a1a',
        'text-secondary': '#4a5568',
        'text-muted': '#718096'
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #F11759 0%, #8333C5 50%, #D67D21 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(241, 23, 89, 0.1) 0%, rgba(131, 51, 197, 0.1) 50%, rgba(214, 125, 33, 0.1) 100%)',
        'brand-bg-light': 'linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 50%, #fef3e2 100%)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'brand': '0 4px 20px rgba(241, 23, 89, 0.15)',
        'brand-hover': '0 6px 25px rgba(241, 23, 89, 0.25)'
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'gradient-shift': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' }
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}