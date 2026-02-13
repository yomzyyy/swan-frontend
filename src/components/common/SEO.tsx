import { Helmet } from '@dr.pogodin/react-helmet';
import { ENV } from '../../config/env';
import { SEO_DEFAULTS } from '../../constants/seo';
import type { SEOProps } from '../../types';

function SEO({ title, description, path, ogImage, ogType = 'website', publishedTime, modifiedTime, noIndex }: SEOProps) {
  const fullTitle = title + SEO_DEFAULTS.titleSuffix;
  const canonicalUrl = ENV.SITE_URL + path;
  const imageUrl = ogImage?.startsWith('http') ? ogImage : ENV.SITE_URL + (ogImage || SEO_DEFAULTS.defaultOgImage);

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content={SEO_DEFAULTS.locale} />
      <meta property="og:site_name" content={SEO_DEFAULTS.siteName} />

      {/* Article-specific OG tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content={SEO_DEFAULTS.twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
}

export default SEO;
