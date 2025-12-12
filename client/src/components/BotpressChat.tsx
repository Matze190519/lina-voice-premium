import { useEffect } from 'react';

export default function BotpressChat() {
  useEffect(() => {
    // Check if scripts are already loaded
    if (document.getElementById('bp-inject')) return;

    // Load inject.js
    const injectScript = document.createElement('script');
    injectScript.src = 'https://cdn.botpress.cloud/webchat/v3.5/inject.js';
    injectScript.id = 'bp-inject';
    injectScript.async = true;
    
    injectScript.onload = () => {
      // Load config script after inject.js is loaded
      const configScript = document.createElement('script');
      configScript.src = 'https://files.bpcontent.cloud/2025/05/06/15/20250506153427-V2JQXLMN.js';
      configScript.id = 'bp-config';
      configScript.async = true;
      document.body.appendChild(configScript);
    };

    document.body.appendChild(injectScript);

    // Cleanup function
    return () => {
      // We don't remove scripts on unmount to persist chat state across navigation
    };
  }, []);

  return null;
}
