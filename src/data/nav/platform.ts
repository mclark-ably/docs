import { NavProduct } from './types';

export default {
  name: 'Platform',
  link: '/docs/platform',
  icon: {
    closed: 'icon-product-platform-mono',
    open: 'icon-product-platform',
  },
  content: [
    {
      name: 'Introduction',
      pages: [
        {
          name: 'About Ably',
          link: '/docs/platform',
          index: true,
        },
      ],
    },
    {
      name: 'Architecture',
      pages: [
        {
          name: 'Overview',
          link: '/docs/platform/architecture',
          index: true,
        },
        {
          name: 'Edge network',
          link: '/docs/platform/architecture/edge-network',
        },
        {
          name: 'Infrastructure operations',
          link: '/docs/platform/architecture/infrastructure-operations',
        },
        {
          name: 'Fault tolerance',
          link: '/docs/platform/architecture/fault-tolerance',
        },
        {
          name: 'Performance',
          link: '/docs/platform/architecture/performance',
        },
        {
          name: 'Platform scalability',
          link: '/docs/platform/architecture/platform-scalability',
        },
        {
          name: 'Connection recovery',
          link: '/docs/platform/architecture/connection-recovery',
        },
        {
          name: 'Message ordering',
          link: '/docs/platform/architecture/message-ordering',
        },
        {
          name: 'Idempotency',
          link: '/docs/platform/architecture/idempotency',
        },
      ],
    },
    {
      name: 'Products and SDKs',
      pages: [
        {
          name: 'SDKs',
          link: '/docs/sdks',
          external: true,
        },
        {
          name: 'Deprecation',
          pages: [
            {
              name: 'Policy',
              link: '/docs/platform/deprecate',
              index: true,
            },
            {
              name: 'Nov 2025 - Protocol v1',
              link: '/docs/platform/deprecate/protocol-v1',
            },
          ],
        },
      ],
    },
    {
      name: 'Pricing',
      pages: [
        {
          link: '/docs/pricing',
          name: 'Overview',
          index: true,
        },
        {
          name: 'Package types',
          pages: [
            {
              link: '/docs/pricing/free',
              name: 'Free',
            },
            {
              link: '/docs/pricing/standard',
              name: 'Standard',
            },
            {
              link: '/docs/pricing/pro',
              name: 'Pro',
            },
            {
              link: '/docs/pricing/enterprise',
              name: 'Enterprise',
            },
          ],
        },
        {
          link: '/docs/pricing/billing',
          name: 'Billing',
        },
        {
          link: '/docs/pricing/limits',
          name: 'Limits',
        },
        {
          link: '/docs/pricing/faqs',
          name: 'Pricing FAQs',
        },
      ],
    },
    {
      name: 'Integrations',
      pages: [
        {
          name: 'Overview',
          link: '/docs/integrations',
          index: true,
        },
        {
          name: 'Inbound integrations',
          pages: [
            {
              name: 'Inbound Webhooks',
              link: '/docs/integrations/inbound/webhooks',
            },
            {
              name: 'Kafka Connector',
              link: '/docs/integrations/inbound/kafka-connector',
            },
          ],
        },
        {
          name: 'Outbound Webhooks',
          pages: [
            {
              name: 'Overview',
              link: '/docs/integrations/webhooks',
              index: true,
            },
            {
              name: 'AWS Lambda Functions',
              link: '/docs/integrations/webhooks/lambda',
            },
            {
              name: 'Azure Functions',
              link: '/docs/integrations/webhooks/azure',
            },
            {
              name: 'Google Cloud Functions',
              link: '/docs/integrations/webhooks/gcp-function',
            },
            {
              name: 'Zapier',
              link: '/docs/integrations/webhooks/zapier',
            },
            {
              name: 'Cloudflare Workers',
              link: '/docs/integrations/webhooks/cloudflare',
            },
            {
              name: 'IFTTT',
              link: '/docs/integrations/webhooks/ifttt',
            },
          ],
        },
        {
          name: 'Outbound streaming',
          pages: [
            {
              name: 'Overview',
              link: '/docs/integrations/streaming',
              index: true,
            },
            {
              name: 'Kafka',
              link: '/docs/integrations/streaming/kafka',
            },
            {
              name: 'Kinesis',
              link: '/docs/integrations/streaming/kinesis',
            },
            {
              name: 'AMQP',
              link: '/docs/integrations/streaming/amqp',
            },
            {
              name: 'SQS',
              link: '/docs/integrations/streaming/sqs',
            },
            {
              name: 'Pulsar',
              link: '/docs/integrations/streaming/pulsar',
            },
            {
              name: 'DataDog',
              link: '/docs/integrations/streaming/datadog',
            },
          ],
        },
        {
          name: 'AWS authentication',
          link: '/docs/integrations/aws-authentication',
        },
        {
          name: 'Message Queues',
          link: '/docs/integrations/queues',
        },
      ],
    },
    {
      name: 'Account management',
      pages: [
        {
          name: 'Overview',
          link: '/docs/account',
          index: true,
        },
        {
          name: 'User management',
          link: '/docs/account/users',
        },
        {
          name: 'Organizations',
          link: '/docs/account/organizations',
        },
        {
          name: 'Single sign-on (SSO)',
          link: '/docs/account/sso',
        },
        {
          name: 'Two-factor authentication (2FA)',
          link: '/docs/account/2fa',
        },
        {
          name: 'Enterprise customization',
          link: '/docs/platform-customization',
        },
        {
          name: 'App management',
          pages: [
            {
              name: 'Overview',
              link: '/docs/account/app',
              index: true,
            },
            {
              name: 'Stats',
              link: '/docs/account/app/stats',
            },
            {
              name: 'API keys',
              link: '/docs/account/app/api',
            },
            {
              name: 'Queues',
              link: '/docs/account/app/queues',
            },
            {
              name: 'Notifications',
              link: '/docs/account/app/notifications',
            },
            {
              name: 'Dev console',
              link: '/docs/account/app/console',
            },
            {
              name: 'Settings',
              link: '/docs/account/app/settings',
            },
          ],
        },
        {
          name: 'Programmatic management using Control API',
          link: '/docs/account/control-api',
        },
      ],
    },
    {
      name: 'Debugging and Errors',
      pages: [
        {
          name: 'Overview',
          link: '/docs/errors',
          index: true,
        },
        {
          name: 'Error codes',
          link: '/docs/errors/codes',
        },
      ],
    },
  ],
  api: [
    {
      name: 'API References',
      pages: [
        {
          link: '/docs/api/control-api',
          name: 'Control API',
        },
      ],
    },
  ],
} satisfies NavProduct;
