/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D0EA59',
          low: '#495125',
          lowest: '#222516',
          container: '#FBFFC8',
        },
        surface: {
          bg: '#0F0F0F',
          card: '#212121',
          text: '#F2F2F2',
          secondary: '#81817E',
        },
        border: '#363635',
        success: '#0DB80A',
        danger: '#FF4D4D',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'primary-glow': '0 0 30px rgba(208, 234, 89, 0.3)',
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}
