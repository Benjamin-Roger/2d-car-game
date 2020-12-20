import { NextSeo, DefaultSeo } from "next-seo";
import config from "@/config";

import { useRouter } from "next/router";

export const SEO = ({ title, description }) => {
  return (
    <>
      <NextSeo
        title={title ? title + " | " + config.name : ""}
        description={description}
        openGraph={{
          title: title,
          description: description,
        }}
      />
    </>
  );
};

export const DefaultSEO = () => {
  const { asPath } = useRouter();

  const baseUrl =
    "https://" + (process.env.NEXT_PUBLIC_BASE_URL || config.website);

  return (
    <>
      <DefaultSeo
        title={config.siteTitle}
        description={config.defaultSiteDescription}
        canonical={baseUrl + asPath}
        openGraph={{
          type: "website",
          url: baseUrl + asPath,
          title: config.name,
          description: config.defaultSiteDescription,
          images: [
            {
              url: baseUrl + config.logo.src,
              width: config.logo.width,
              height: config.logo.height,
              alt: config.name,
            },
          ],
          site_name: config.name,
        }}
      />
    </>
  );
};
