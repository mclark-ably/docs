import { graphql, useStaticQuery } from 'gatsby';

const stripTrailingSlash = (str: string) => (str.endsWith('/') ? str.slice(0, -1) : str);

const canonicalUrl = (siteUrl: string): ((path: string) => string) => {
  return (path: string): string => stripTrailingSlash(`${siteUrl}${path}`);
};

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
          externalScriptsData {
            hubspotTrackingId
            addsearchSiteKey
            gtmContainerId
            headwayAccountId
            announcementEnabled
            inkeepEnabled
            inkeepApiKey
            inkeepIntegrationId
            inkeepOrganizationId
            insightsEnabled
            insightsDebug
            mixpanelApiKey
            mixpanelAutoCapture
            posthogApiKey
            posthogHost
          }
        }
      }
    }
  `);

  const siteMetadata = data.site.siteMetadata;

  return {
    ...siteMetadata,
    canonicalUrl: canonicalUrl(siteMetadata.siteUrl),
  };
};
