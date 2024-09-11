/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        autumn100: '#FEE3D1',
        autumn200: '#FEBD94',
        autumn300: '#FF8A40',
        autumn400: '#BE4A00',
        autumn500: '#5B2807',
        autumn600: '#170C04',
        burgundy100: '#FFDFE5',
        burgundy200: '#FF6B89',
        burgundy300: '#F81542',
        burgundy400: '#BF0227',
        burgundy500: '#89001B',
        translusentBlack: 'rgba(0, 0, 0, 0.5)',
        grey50: '#F4F4F4',
        grey100: '#D3D3D6',
        grey200: '#787883',
        grey300: '#363645',
        grey350: '#3A3A3A',
        grey400: '#0C0D17',
        grey500: '#010105',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      backgroundImage: {
        'authBg': "url('/authBg.png')",
        'redFlowBg': "url('/redFlowBg.png')",
        'happyStudents': "url('/uniStudents.png')",
        'happyStudentsMobile': "url('/uniStudentsMobile.png')",
        'hiking': "url('/hiking.png')",
        'hikingMobile': "url('/hikingMobile.png')",
        'guysLaughing': "url('/guysLaughing.png')",
        'guysLaughingMobile': "url('/guysLaughingMobile.png')",
        'heroImg': "url('/heroImg.png')",
        'heroImg2': "url('/heroImg3.jpg')",
        'createDealImg': "url('/createDeal.png')"
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      
    },
    fontFamily: {
      playfair: ['Playfair Display', 'serif'],
      lato: ['Lato', 'sans-serif'],
    },
    // listStyleType: {
    //   none: true,
    // },
  },
  // corePlugins: {
  // },
  plugins: [require('tailwindcss-animate')],
};
