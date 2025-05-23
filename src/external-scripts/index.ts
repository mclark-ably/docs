import hubspot, { AblyHubspotData, hubspotIdentifyUser, HubspotUser } from './hubspot';
import headway from './headway';
import announcement from '../utilities/console-announcement';
import {
  googleTagManagerCookiesAccepted,
  googleTagManagerSessionPageViews,
  googleTagManagerLoggedIn,
} from './google-tag-manager';
import inkeepChat, { inkeepChatIdentifyUser } from './inkeep';
import type { SessionState } from '../contexts/user-context';
import { identifyUser } from './ably-insights';

export type TrackableSession = {
  emulatingUser?: boolean;
  user?: HubspotUser;
  hubspot?: AblyHubspotData;
  pageVisitCount?: number;
  cookiesAcceptedByUser?: unknown;
  signedIn?: unknown;
};

type ExternalScriptsData = {
  hubspotTrackingId?: string;
  gtmContainerId?: string;
  announcementEnabled?: boolean;
  headwayAccountId?: string;
  inkeepEnabled?: string;
  inkeepApiKey?: string;
  insightsEnabled?: boolean;
  conversationsUrl?: string;
};

// Inject scripts and run any init code
const injectScripts = ({
  hubspotTrackingId,
  announcementEnabled,
  inkeepEnabled,
  inkeepApiKey,
  conversationsUrl,
}: ExternalScriptsData = {}) => {
  if (announcementEnabled) {
    announcement();
  }

  if (hubspotTrackingId) {
    hubspot(hubspotTrackingId, !(inkeepEnabled === 'true'));
  }

  if (inkeepEnabled) {
    inkeepChat(inkeepApiKey, conversationsUrl);
  }

  if (!document.querySelector('div[data-scripts-loaded="true"]')) {
    const scriptsLoadedMarker = document.createElement('div');
    scriptsLoadedMarker.setAttribute('data-scripts-loaded', 'true');
    document.body.appendChild(scriptsLoadedMarker);
  }
};

// Run signed in trackers
const sessionTracker = (
  {
    hubspotTrackingId,
    gtmContainerId,
    headwayAccountId,
    inkeepEnabled,
    inkeepApiKey,
    insightsEnabled,
  }: ExternalScriptsData = {},
  sessionState: SessionState,
) => {
  if (!sessionState) {
    return;
  }

  if (gtmContainerId) {
    googleTagManagerSessionPageViews(sessionState);
    googleTagManagerLoggedIn(sessionState);
    googleTagManagerCookiesAccepted(sessionState);
  }

  if (hubspotTrackingId) {
    hubspotIdentifyUser(sessionState);
  }

  if (headwayAccountId && sessionState.signedIn) {
    headway(headwayAccountId);
  }

  if (inkeepEnabled && inkeepApiKey) {
    if (sessionState.user) {
      inkeepChatIdentifyUser({ user: sessionState.user });
    }
  }

  if (insightsEnabled && sessionState.signedIn) {
    identifyUser(sessionState);
  }
};

const externalScriptInjector = (externalScriptsData: ExternalScriptsData | undefined) => ({
  injectScripts: () => injectScripts(externalScriptsData),
  sessionTracker: (sessionData: SessionState) => sessionTracker(externalScriptsData, sessionData),
});

export default externalScriptInjector;
