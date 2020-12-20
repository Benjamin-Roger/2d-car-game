import "@/styles/tailwind.css";

import "@/styles/global.scss";

import { ThemeProvider } from "@material-ui/core/styles";

import { DefaultSEO } from "@/components/SEO.js";

import theme from "@/libs/theme";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSEO />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
