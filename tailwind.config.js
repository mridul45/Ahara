/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': 'var(--color-primary-bg)',
        'shiva-blue': 'var(--color-shiva-blue)',
        'secondary-white': 'var(--color-secondary-white)',
        'shiva-black': 'var(--color-shiva-black)',
        'shiva-white': 'var(--color-shiva-white)',
        'nirvana-one': 'var(--color-nirvana-one)',
        'nirvana-two': 'var(--color-nirvana-two)',
        'nirvana-three': 'var(--color-nirvana-three)',
        'bg-dark': 'var(--color-bg-dark)',
        'surface-1': 'var(--color-surface-1)',
        'surface-2': 'var(--color-surface-2)',
        'border-dark': 'var(--color-border-dark)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'teal-400': 'var(--color-teal-400)',
        'cyan-400': 'var(--color-cyan-400)',
        'purple-400': 'var(--color-purple-400)',
        'emerald-500': 'var(--color-emerald-500)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        open: ['var(--font-open)', 'sans-serif'],
      },
      boxShadow: {
        brand: 'var(--shadow-brand)',
      },
      borderRadius: {
        'xl': 'var(--radius-xl)',
      },
      backgroundImage: {
        'brand-gradient': 'var(--gradient-brand)',
        'zen-gradient': 'var(--gradient-zen)',
        'surface-glow': 'var(--gradient-surface-glow)',
      }
    },
  },
  plugins: [],
}
