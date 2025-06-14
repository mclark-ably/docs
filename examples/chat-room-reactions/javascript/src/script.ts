import * as Ably from 'ably';
import { ChatClient, Room } from '@ably/chat';
import { nanoid } from 'nanoid';
import './styles.css';

const realtimeClient = new Ably.Realtime({
  clientId: nanoid(),
  key: import.meta.env.VITE_ABLY_KEY as string,
});

let room: Room;

async function initializeChat() {
  const chatClient = new ChatClient(realtimeClient);
  const urlParams = new URLSearchParams(window.location.search);
  const roomName = urlParams.get('name') || 'chat-room-reactions';
  room = await chatClient.rooms.get(roomName);

  /** 💡 Add every room reaction published to the room 💡 */
  room.reactions.subscribe((reaction) => {
    const reactionsContainer = document.getElementById('reaction-area');

    const reactionElement = document.createElement('span');
    reactionElement.className = 'reaction';
    reactionElement.textContent = reaction.type;
    reactionElement.dataset.createdAt = new Date().toISOString();
    reactionsContainer.appendChild(reactionElement);

    const removeExpiredReactions = () => {
      const reactionArea = document.getElementById('reaction-area');
      const reactionSpans = reactionArea.getElementsByClassName('reaction');
      const currentTime = new Date().getTime();

      Array.from(reactionSpans).forEach((span: HTMLElement) => {
        const createdAt = new Date(span.dataset.createdAt).getTime();
        if (currentTime - createdAt > 4000) {
          span.remove();
        }
      });

      setTimeout(removeExpiredReactions, 4000);
    };

    setTimeout(removeExpiredReactions, 4000);
  });

  /** 💡 Attach to the room to subscribe to reactions 💡 */
  await room.attach();
}

const emojis = ['❤️', '😲', '👍', '😊'];
const emojiSelector = document.getElementById('emoji-selector');

emojis.forEach((emoji) => {
  const emojiSpan = document.createElement('span');
  emojiSpan.textContent = emoji;
  emojiSpan.className = 'emoji-btn';
  emojiSpan.onclick = () => room.reactions.send({ type: emoji });
  emojiSelector.appendChild(emojiSpan);
});

initializeChat().catch((error) => {
  console.log('Error initializing chat', error);
});
