import { identity } from 'lodash';

export const safeWindow =
  typeof window === 'undefined'
    ? {
        navigator: {
          platform: '',
        },
        location: {
          assign: identity,
          pathname: '',
          hash: '',
          host: '',
          hostname: '',
          href: '',
          origin: '',
          port: '',
          protocol: '',
        },
        localStorage: {
          length: 0,
          getItem: identity,
          setItem: identity,
          removeItem: identity,
          key: identity,
          clear: identity,
        },
        sessionStorage: {
          length: 0,
          getItem: identity,
          setItem: identity,
          removeItem: identity,
          key: identity,
          clear: identity,
        },
        addEventListener: identity,
        Headway: null,
        dataLayer: null,
      }
    : (window as Window &
        typeof globalThis & {
          Headway?: { init: (params: unknown) => void };
          dataLayer?: Record<string, string | number>[];
        });
