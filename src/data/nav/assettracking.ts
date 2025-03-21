import { NavProduct } from './types';

export default {
  name: 'Ably Asset Tracking',
  link: '/docs/asset-tracking',
  icon: {
    closed: 'icon-product-asset-tracking-mono',
    open: 'icon-product-asset-tracking',
  },
  content: [
    {
      name: 'Introduction',
      pages: [
        {
          name: 'About Asset Tracking',
          link: '/docs/asset-tracking/',
        },
      ],
    },
    {
      name: 'Track',
      pages: [
        {
          name: 'Using the example apps',
          link: '/docs/asset-tracking/example-apps',
        },
        {
          name: 'Using the SDKs',
          link: '/docs/asset-tracking/using-the-sdks',
        },
      ],
    },
  ],
  api: [
    {
      name: 'API References',
      pages: [
        {
          link: 'https://sdk.ably.com/builds/ably/ably-asset-tracking-android/main/dokka/index.html',
          name: 'Kotlin',
          external: true,
        },
        {
          link: 'https://sdk.ably.com/builds/ably/ably-asset-tracking-swift/main/jazzy/',
          name: 'Swift',
          external: true,
        },
      ],
    },
  ],
} satisfies NavProduct;
