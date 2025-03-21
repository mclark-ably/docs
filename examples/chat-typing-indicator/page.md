# Typing indicators for chat applications

Use typing indicators to make users aware of who is currently typing a message.

Typing indicators enable you to display a message when other users are in the process of typing a message. They are most commonly used to display a message such as **"John is typing…"**, or if more than a certain number of people are typing, then **"Multiple people are typing…"**.

Typing indicators add value in different applications. They can set a user's expectations of when there will be a new interaction, such as in the case of a 1:1 customer support application. In larger chat applications, such as live streaming, they can help to show engagement by displaying how many users are in the process of typing in realtime.

Typing indicators are implemented using [Ably Chat](https://ably.com/docs/products/chat). The Chat SDK contains a set of purpose-built APIs that abstract away the complexities involved in architecting chat features. It is built on top of Ably's core platform, and so it provides the same performance guarantees and scaling potential.

## Resources

// React brief (Only visible if viewing the React example)

Use the following components to add typing indicators into a chat application:

* [`ChatClientProvider`](https://ably.com/docs/chat/setup?lang=react#instantiate): initializes and manages a shared chat client instance, passing it down through React context to enable realtime chat functionality across the application.
* [`ChatRoomProvider`](https://ably.com/docs/chat/rooms?lang=react#create): manages the state and functionality of a specific chat room, providing access to messages, participants, and realtime interactions within that room via React context.
* [`useRoom()`](https://ably.com/docs/chat/rooms?lang=react#create) hook: a hook to manage the state and interaction for a chat “room”, allowing users to join, send messages, listen for messages, and use the other chat functions such as typing indicators.
* [`useTyping()`](https://ably.com/docs/chat/rooms/typing?lang=react#subscribe) hook: a hook to manage and track the typing status of users within a chat room.

Find out more about [typing indicators](https://ably.com/docs/chat/rooms/typing).

// End React brief

// Javascript brief (Only visible if viewing the Javascript example)

Use the following methods to add typing indicators into a chat application:

* [`rooms.get()`](https://ably.com/docs/chat/rooms?lang=javascript#create) - creates a new or retrieves an existing `room`.
* [`rooms.typing.subscribe()`](https://ably.com/docs/chat/rooms/typing#subscribe) - subscribes to typing events by registering a listener. Typing events are emitted when a user starts typing, or when they stop typing.
* [`room.typing.get()`](https://ably.com/docs/chat/rooms/typing?lang=javascript#retrieve) - Retrieve list of users currently typing by their clientId.
* [`room.typing.start()`](https://ably.com/docs/chat/rooms/typing?lang=javascript#set) - Emit a typing event that the user is currently typing, initialising the timeout which will call `room.typing.stop()` if no further events are emitted by the user.

Find out more about [typing indicators](https://ably.com/docs/chat/rooms/typing).

// End Javascript brief

## View on Github

// React

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

2. Change directory:

```sh
cd /examples/
```

3. Rename the environment file:

```sh
mv .env.example .env.local
```

4. In `.env.local` update the value of `NEXT_PUBLIC_ABLY_KEY` to be your Ably API key.

5. Install dependencies:

```sh
yarn install
```

6. Run the server:

```sh
yarn run chat-typing-indicator-react
```

7. Try it out by opening two tabs to http://localhost:3000/ with your browser to see the result.

// Javascript

1. Clone the [Ably docs](https://github.com/ably/docs) repository where this example can be found:

```sh
git clone git@github.com:ably/docs.git
```

2. Change directory:

```sh
cd /examples/
```

3. Rename the environment file:

```sh
mv .env.example .env.local
```

4. In `.env.local` update the value of `VITE_PUBLIC_ABLY_KEY` to be your Ably API key.

5. Install dependencies:

```sh
yarn install
```

6. Run the server:

```sh
yarn run chat-typing-indicator-javascript
```

7. Try it out by opening two tabs to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Open in CodeSandbox

// React

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `NEXT_PUBLIC_ABLY_KEY` variable to use your Ably API key.

// Javascript

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_PUBLIC_ABLY_KEY` variable to use your Ably API key.
