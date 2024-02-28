'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { createModularAccountAlchemyClient } from '@alchemy/aa-alchemy';
import { createWalletClient, custom, Transport } from 'viem';
import { baseSepolia, WalletClientSigner } from '@alchemy/aa-core';

interface WalletContextType {
  provider: any; // Adjust the type according to your provider type
  address: string | null;
  isAuthenticated: boolean;
  connectWallet: () => Promise<void>;
  transferAmount: (toAddress: string, amount: string) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [provider, setProvider] = useState<any>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const connectWallet = async () => {
    const chain = baseSepolia;
    const client = createWalletClient({
      chain,
      transport: custom(window.ethereum as Transport),
    });

    const eoaSigner = new WalletClientSigner(client, 'json-rpc');

    const alchemyProvider = await createModularAccountAlchemyClient({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '',
      chain,
      signer: eoaSigner,
    });

    setProvider(alchemyProvider);
    setAddress(alchemyProvider.getAddress());
    setIsAuthenticated(true);
  };

  const transferAmount = async (toAddress: string, amount: string) => {
    if (!provider) {
      throw new Error('Provider not initialized. Please connect wallet first.');
    }

    const { hash: uoHash } = await provider.connectWallet({
      uo: {
        target: toAddress,
        data: '0x',
        value: BigInt(amount),
      },
    });

    console.log('UserOperation Hash: ', uoHash);

    const txHash = await provider.waitForUserOperationTransaction({
      hash: uoHash,
    });

    console.log('Transaction Hash: ', txHash);
    return txHash;
  };

  return <WalletContext.Provider value={{ provider, address, isAuthenticated, connectWallet, transferAmount }}>{children}</WalletContext.Provider>;
};
