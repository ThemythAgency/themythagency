import { Helmet } from "react-helmet-async";

export const SITE_URL = "https://themythagency.lovable.app";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  keywords?: string;
  publishedTime?: string;
  author?: string;
  section?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const DEFAULT_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/7QeVYSnUduXNCX3Fagei5udCJj12/social-images/social-1774086224369-78596.webp";

const Seo = ({
  title,
  description,
  path,
  type = "website",
  image = DEFAULT_IMAGE,
  keywords,
  publishedTime,
  author,
  section,
  jsonLd,
}: SeoProps) => {
  const url = `${SITE_URL}${path}`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={url} />

      <meta property="og:site_name" content="Themyth Agency" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      {type === "article" && publishedTime ? (
        <meta property="article:published_time" content={publishedTime} />
      ) : null}
      {type === "article" && author ? <meta property="article:author" content={author} /> : null}
      {type === "article" && section ? <meta property="article:section" content={section} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
