import * as Ably from 'ably';
import { nanoid } from 'nanoid';

let client: Ably.Realtime | null = null;
let channel: Ably.RealtimeChannel | null = null;
const channelActionButton = document.getElementById('channel-action');
const urlParams = new URLSearchParams(window.location.search);

const connect = () => {
  // Initialises a new client instance with the Ably key and client ID.
  const newClient = new Ably.Realtime({
    key: import.meta.env.VITE_ABLY_KEY as string,
    clientId: nanoid(),
  });

  client = newClient;
  // Creating or retrieving channel with the name provided.
  channel = client.channels.get(urlParams.get('name') || 'pub-sub-channel-state');
  const stateChangesLog = document.getElementById('state-changes');

  // Subscribes to channel state changes, provides a log of all state changes received,
  // and updates the UI accordingly.
  channel.on((stateChange) => {
    const timestamp = new Date().toLocaleTimeString();
    stateChangesLog.innerHTML =
      `[${timestamp}] State changed: ${stateChange.previous} to ${stateChange.current}\n` + stateChangesLog.innerHTML;

    if (stateChange.current === 'attached') {
      channelActionButton.textContent = 'Click to detach';
    } else {
      channelActionButton.textContent = 'Click to attach';
    }
  });

  channel.attach();
};

// Attaches the client to the channel.
const handleAttach = () => {
  channel.attach();
};

// Detaches the client from the channel.
const handleDetach = () => {
  channel.detach();
};

channelActionButton.addEventListener('click', () => {
  const buttonText = channelActionButton.textContent;

  if (buttonText === 'Click to detach') {
    handleDetach();
  } else {
    handleAttach();
  }
});

connect();
