import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://tradesaurs.vercel.app";

export const siteConfig = {
  name: "TradeSaurs",
  title: "TradeSaurs — Resource Belajar Trading",
  description:
    "Kumpulan resource belajar ICT, SMC, dan Traders Family dalam Bahasa Indonesia dengan tampilan neobrutalism yang rapi untuk dipelajari.",
  url: siteUrl,
  creator: "@hadespwnme",
  ogAlt:
    "TradeSaurs, resource belajar trading berbahasa Indonesia untuk ICT, SMC, dan Traders Family.",
};

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
};

export function createMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  path = "/",
}: MetadataInput = {}): Metadata {
  const url = path === "/" ? "/" : path;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "id_ID",
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: siteConfig.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: siteConfig.creator,
      images: [
        {
          url: "/twitter-image",
          alt: siteConfig.ogAlt,
        },
      ],
    },
  };
}
