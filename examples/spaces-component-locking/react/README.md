# Locking components within collaborative applications

Enable users to lock components for editing within a collaborative application.

Manage concurrent access to shared resources within your application and prevent conflicts in collaborative environments, ensuring that only one user can modify a specific component at a time.

Component locking enhances applications where multiple users can edit the same fields, such as spreadsheets, slide shows and forms. It is a key component in maintaining data integrity and preventing conflicting changes.

Component locking is implemented using [Ably Spaces](/docs/products/spaces). The Spaces SDK contains a set of purpose-built APIs that abstract away the complexities involved in managing the state of components accessibility in a collaborative application. It is built on top of Ably's core platform, and so it provides the same performance and scaling guarantees.

## Resources

Use the following components to add component locking into an application:

- [`SpacesProvider`](/docs/spaces/react#spaces-provider): initializes and manages a shared space client instance, passing it down through React context to enable realtime spaces functionality across the application.
- [`SpaceProvider`](/docs/spaces/react#spaces-provider): manages the state and functionality of a specific space, providing access to realtime interactions within that space via React context.
- [`useSpace()`](/docs/spaces/react#useSpace) hook: a hook to subscribe to the current Space, receive Space state events, and get the current Space instance.
- [`useMembers()`](/docs/spaces/react#useMembers) hook: a hook to build component locking. It retrieves members of the space, including members that have left the space, but have not yet been removed.
- [`space.locks.acquire()`](/docs/spaces/locking#acquire): a method to attempt to acquire a lock with a given unique ID.

This example also uses the [`ChannelProvider`](/docs/getting-started/react#channel-provider) and [`useChannel()`](/docs/getting-started/react#useChannel) hook from the core Pub/Sub product in order to publish and subscribe to the changing values of each component.

Find out more about [component locking](/docs/spaces/locking).

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
  yarn run spaces-component-locking-react
  ```

7. Try it out by opening two tabs to [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.

## Open in CodeSandbox

In CodeSandbox, rename the `.env.example` file to `.env.local` and enter the value of your `VITE_ABLY_KEY` variable to use your Ably API key.
