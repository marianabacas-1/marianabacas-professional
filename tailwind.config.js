/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    "bg-green-50", "bg-amber-50", "bg-red-50", "bg-blue-50",
    "border-green-200", "border-amber-200", "border-red-200", "border-blue-200",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: 'rgba(150, 29, 112, 1)',
        primaryWithOp: 'rgba(150, 29, 112, 0.8)',
        primaryWithOp2: 'rgba(150, 29, 112, 0.6)',
        secondary: 'rgba(228, 226, 222, 1)',
        secondaryWithOp: 'rgba(228, 226, 222, 0.8)',
        secondaryWithOp2: 'rgba(228, 226, 222, 0.6)',
        tertiary: 'rgba(0, 0, 0, 1)',
        tertiaryWithOp: 'rgba(0, 0, 0, 0.8)',
        tertiaryInt: 'rgba(0, 0, 0, 0.7)',
        tertiaryWithOp2: 'rgba(0, 0, 0, 0.6)',
        cuaternary: 'rgba(255, 255, 255, 1)'
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      boxShadow: {
        primarySh: '0px 5px 24px 6px #961D70',
        secondarySh: '0px 5px 24px 6px #E4E2DE',
      },
    },
  },
  plugins: [],
}
