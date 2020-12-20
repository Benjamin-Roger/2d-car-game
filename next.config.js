module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    localeDetection: false,
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"], // to read SVG
    });

    return config;
  },

  async headers() {
    // for security headers
    return [
      {
        source: "/(.*?)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "deny",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self' vitals.vercel-insights.com 'unsafe-eval' 'unsafe-inline' data:",
          },
        ],
      },
    ];
  },
};
