import React, { useEffect, useState } from 'react';
import Icon from '@ably/ui/core/Icon';

export const GoTopButton = () => {
  const [showGoTop, setShowGoTop] = useState(false);
  const scrollOffset = 20;

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleVisibleButton = () => {
      setShowGoTop(window.scrollY > scrollOffset);
    };

    window.addEventListener('scroll', handleVisibleButton);
    return () => window.removeEventListener('scroll', handleVisibleButton);
  }, []);

  return (
    <div className={showGoTop ? 'block' : 'hidden'} onClick={handleScrollUp}>
      <div className="rounded text-white py-2 px-2 bg-cool-black fixed bottom-0 left-0 m-4 z-20 cursor-pointer">
        <Icon
          name="icon-gui-arrow-long-up-outline"
          size="1.5rem"
          additionalCSS="block text-white align-text-bottom w-6 h-6 m-2.5"
        />
      </div>
    </div>
  );
};
