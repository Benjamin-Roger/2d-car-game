
  (module.exports = {
    plugins: [
      "tailwindcss",
      "postcss-100vh-fix",
      "postcss-flexbugs-fixes",

      [
        "postcss-preset-env",
        {
          autoprefixer: {
            flexbox: "no-2009",
          },
          stage: 3,
          features: {
            "custom-properties": false,
          },
        },
      ],
      [
        "@fullhuman/postcss-purgecss",
        process.env.NODE_ENV === "production"
          ? {
              // the paths to all template files
              content: [
                "./pages/**/*.{js,jsx,ts,tsx}",
                "./components/**/*.{js,jsx,ts,tsx}",
              ],
              safelist: [/Mui/g, "material-icons", "MuiIcon-root",'html', 'body'],
              // function used to extract class names from the templates
              defaultExtractor: (content) =>
                content.match(/[\w-/:]+(?<!:)/g) || [],
            }
          : false,
      ],
    ],
  });
