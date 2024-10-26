import { Helmet } from 'react-helmet';

import {
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS
} from '@/lib/constants'

interface HelmetWrapperProps {
  showDefault?: boolean;
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: string;
}

const HelmetWrapper: React.FC<HelmetWrapperProps> = ({
  showDefault = false,
  title = SITE_NAME,
  description = SITE_DESCRIPTION,
  defaultTitle = SITE_DESCRIPTION,
  url = window.location.href,
  type = 'website'
}) => {
  const image = `${process.env.APP_URL}/arishme.png`;
  return (
    <Helmet>
      {showDefault ? (
        <title>{defaultTitle}</title>
      ) : (<title>{title} | {SITE_TITLE}</title>)}


      {/* General Meta Tags */}
      <meta name="description" content={description} />
      <meta name="keywords" content={SITE_KEYWORDS}/>
      {/* OpenGraph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter Meta Tags (optional) */}
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default HelmetWrapper;
