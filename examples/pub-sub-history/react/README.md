# Message history with Pub/Sub

History enables users to retrieve historical messages published to an application.

Use history to retrieve messages that have been previously published to a channel. Users can then start working in your application with context of what happened before they went joined, or came online. Uses include retrieving the values of bids from an auction site before placing your own, or providing the last 2 minutes worth of contextual data in a realtime dashboard.

History enables users to retrieve messages that have been previously published within an application. It enables provides users with context as to how the current state has been reached.

History is implemented using [Ably Pub/Sub](/docs/products/channels). The Pub/Sub SDK provides a set of flexible APIs capable of building any realtime application. It is powered by Ably's reliable and scalable platform.

## Resources

Use the following components to retrieve message history in a pub/sub application:

- [`AblyProvider`](/docs/getting-started/react#ably-provider): initializes and manages a shared pub/sub client instance, passing it down through React context to enable realtime pub/sub functionality across the application.
- [`ChannelProvider`](/docs/getting-started/react#channel-provider): manages the state and functionality of a specific channel, providing access to messages, history, presence, and realtime interactions within that channel via React context.
- [`useChannel()`](/docs/getting-started/react#useChannel) hook: a hook enabling users to subscribe to a channel and receive its messages.
- [`channel.history()`](/docs/storage-history/history#retrieve-channel): retrieve paginated message event history.

Find out more about [history](/docs/storage-history/history).

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
  yarn run pub-sub-history-react
  ```

7. Try it out by opening a tab to [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and update the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
