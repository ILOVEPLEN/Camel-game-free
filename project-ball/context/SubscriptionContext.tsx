import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getIsProUser } from '../lib/subscriptions';

interface SubscriptionContextValue {
  isPro: boolean;
  refreshPro: () => Promise<void>;
  paywallVisible: boolean;
  showPaywall: () => void;
  hidePaywall: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextValue>({
  isPro: false,
  refreshPro: async () => {},
  paywallVisible: false,
  showPaywall: () => {},
  hidePaywall: () => {},
});

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [isPro, setIsPro] = useState(false);
  const [paywallVisible, setPaywallVisible] = useState(false);

  const refreshPro = useCallback(async () => {
    const pro = await getIsProUser();
    setIsPro(pro);
  }, []);

  useEffect(() => { refreshPro(); }, [refreshPro]);

  return (
    <SubscriptionContext.Provider value={{
      isPro,
      refreshPro,
      paywallVisible,
      showPaywall: () => setPaywallVisible(true),
      hidePaywall: () => setPaywallVisible(false),
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  return useContext(SubscriptionContext);
}
