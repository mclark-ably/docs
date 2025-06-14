import { IconName } from '@ably/ui/core/Icon/types';

export type NavProduct = {
  name: string;
  icon: { closed: IconName; open: IconName };
  content: NavProductContent[];
  api: NavProductContent[];
  showJumpLink?: boolean;
  link?: string;
};

export type NavProductPages = NavProductPage | NavProductContent;

export type NavProductContent = {
  name: string;
  pages: NavProductPages[];
  expand?: boolean;
};

export type NavProductPage = {
  name: string;
  link: string;
  external?: boolean;
  languages?: string[];
  index?: boolean;
};
