import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        d7d7d7: '#D7D7D7',
        f9f7f8: '#F9F7F8',
        747474: '#747474',
        '5D5FEF': '#5D5FEF',
        CF0707: '#CF0707',
        EF5DA8: '#EF5DA8',
        '27AE65': '#27AE65',
        '27AE6510': '#27AE6510',
        FCDDEC: '#FCDDEC',
        FFAE0210: '#FFAE0210',
        FFAE02: '#FFAE02',
        CF07071A10: '#CF07071A10',
        CF07071A: '#CF07071A',
      },
      fontFamily: {
        ng_regular: 'ng_regular',
        ng_medium: 'ng_medium',
        ng_bold: 'ng_bold',
        ng_extrabold: 'ng_extrabold',
      },
    },
  },
  plugins: [],
};
export default config;
