# Sending and receiving messages with Pub/Sub

Enable clients to send and receive messages in a channel.

Messaging enables instant, scalable communication through publishing and subscribing to channels. Messages represent data payloads that clients publish and subscribe to. They are the basis of realtime communication in all applications.

Channels are used to separate messages into different topics. They are the building block of creating a realtime application using the publish-subscribe pattern. Channels are also the unit of security and scalability. Whilst billions of messages may be delivered by Ably, clients receive only the messages on the channels they subscribe to.

Messaging is implemented using [Ably Pub/Sub](/docs/channels/messages). The Pub/Sub SDK provides a set of flexible APIs capable of building any realtime application and is powered by Ably's reliable and scalable platform.

## Resources

Use the following methods to send and receive messages in a pub/sub application:

- [`channel.get()`](/docs/channels#create): creates a new or retrieves an existing `channel`.
- [`channel.subscribe()`](/docs/channels#subscribe): subscribes to channel messages events by registering a listener. Message events are emitted when a user publishes a message.
- [`channel.publish`](/docs/channels#publish): emits a message event when the user publishes a message to the channel.

Find out more about [channels](/docs/channels) and [messages](/docs/channels/messages).

## Getting started

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

4. In `.env.local` update the value of `VITE_ABLY_KEY` to be your Ably API key.

5. Install dependencies:

  ```sh
  yarn install
  ```

6. Run the server:

  ```sh
  yarn run pub-sub-channel-messages-javascript
  ```

7. Try it out by opening two tabs to [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
