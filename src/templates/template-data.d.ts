import { HtmlComponentProps } from 'src/components/html-component-props';
import { MenuData } from 'src/components/Sidebar/RightSidebar/menu-data';

export type AblyDocumentMeta = {
  title: string;
  meta_description: string;
  meta_keywords: string;
  languages: string[];
  redirect_from: string[];
  product?: string;
};

export type AblyDocument = {
  meta?: AblyDocumentMeta;
};

export type Versions = FileHtmlVersionConnection;

export type AblyDocumentData = {
  document: AblyDocument;
  versions: Versions;
};

export type Location = {
  search: string;
  pathname: string;
  hash: string;
};

export type AblyPageContext = {
  contentOrderedList: HtmlComponentProps[];
  languages: string[];
  version: string;
  contentMenu: Record<string, MenuData[][]>;
  slug: string;
  script: string;
};

export type ProductName =
  | 'channels'
  | 'spaces'
  | 'livesync'
  | 'chat'
  | 'liveobjects'
  | 'asset-tracking'
  | 'api-reference'
  | 'home';

export type ProductTitle =
  | 'Channels'
  | 'Ably Spaces'
  | 'Ably LiveSync'
  | 'Ably Chat'
  | 'Ably LiveObjects'
  | 'Ably Asset Tracking'
  | 'API References'
  | 'Home'
  | 'Ably Pub/Sub';

export type AblyTemplateData = {
  data: AblyDocumentData;
  location: Location;
  pageContext: AblyPageContext;
  currentProduct?: ProductName;
};
