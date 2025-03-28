"use client";

import { Inter } from "next/font/google";
import { ChatClient, ChatClientProvider, ChatRoomProvider, AllFeaturesEnabled } from '@ably/chat';
import { Realtime } from 'ably';
import '../../styles/styles.css'
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

// @ts-ignore
dynamic(() => import('franken-ui/js/core.iife'), {
  ssr: false,
});

// @ts-ignore
dynamic(() => import('franken-ui/js/icon.iife'), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

const mockNames = ['Bob', 'Jane', 'John', 'Sammy'];
const mockName = () => mockNames[Math.floor(Math.random() * mockNames.length)];

const realtimeClient = new Realtime({key: process.env.NEXT_PUBLIC_ABLY_KEY, clientId: mockName()});
const chatClient = new ChatClient(realtimeClient);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [roomName, setRoomName] = useState('chat-room-messages');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    if (name !== null) {
      setRoomName(name);
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ChatClientProvider client={chatClient}>
          <ChatRoomProvider
            id={roomName}
            options={AllFeaturesEnabled}
          >
            {children}
          </ChatRoomProvider>
        </ChatClientProvider>
      </body>
    </html>
  );
}
