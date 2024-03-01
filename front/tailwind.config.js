export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './lib/ui/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          100: '#151D20',
          200: '#16502d',
          300: '#37c871',
          400: '#55ff99',
          500: '#b3ff80',
        },
        gray: {
          100: '#4a504d',
          200: '#b7c8ba',
          300: '#e0f0e4',
        },
      },
      fontSize: {
        title: [
          '32px',
          {
            fontWeight: '900',
          },
        ],
        heading: [
          '24px',
          {
            fontWeight: '700',
          },
        ],
        subheading: [
          '20px',
          {
            fontWeight: '700',
          },
        ],
        body: [
          '16px',
          {
            fontWeight: '500',
          },
        ],
        small: [
          '10px',
          {
            fontWeight: '400',
          },
        ],
      },
      spacing: {
        '1U': '4px',
        '1.5U': '6px',
        '2U': '8px',
        '3U': '12px',
        '4U': '16px',
        '5U': '20px',
        '6U': '24px',
        '7U': '28px',
        '8U': '32px',
        '9U': '36px',
        '10U': '40px',
        '11U': '44px',
        '12U': '48px',
        '13U': '52px',
        '14U': '56px',
        '15U': '60px',
        '16U': '64px',
        '17U': '68px',
        '18U': '72px',
        '19U': '76px',
        '20U': '80px',
      },
    },
  },
  plugins: [],
};
