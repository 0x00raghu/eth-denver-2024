'use client';

import { createContext, useContext, useState } from 'react';
import { createModularAccountAlchemyClient, alchemyEnhancedApiActions } from '@alchemy/aa-alchemy';
import { createWalletClient, custom, Transport, parseEther } from 'viem';
import { baseSepolia, WalletClientSigner } from '@alchemy/aa-core';
import { Alchemy, Network } from 'alchemy-sdk';
import web3 from 'web3';

interface WalletContextType {
  provider: any; // Adjust the type according to your provider type
  address: string | null;
  isAuthenticated: boolean;
  connectWallet: () => Promise<void>;
  transferAmount: (toAddress: string, amount: string) => Promise<void>;
  getWalletBalances: () => Promise<void>;
  tokenBalances: any[];
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
  const [address, setAddress] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [tokenBalances, setTokenBalances] = useState<any>([]);

  const connectWallet = async () => {
    const chain = baseSepolia;
    const client: any = createWalletClient({
      chain,
      transport: custom(window.ethereum as Transport),
    });

    const eoaSigner = new WalletClientSigner(client, 'json-rpc');

    const alchemy = new Alchemy({
      network: Network.BASE_SEPOLIA,
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    });

    const alchemyProvider = (
      await createModularAccountAlchemyClient({
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '',
        chain,
        signer: eoaSigner,
      })
    ).extend(alchemyEnhancedApiActions(alchemy));

    setProvider(alchemyProvider);
    setAddress(alchemyProvider.getAddress());
    setIsAuthenticated(true);
  };

  const transferAmount = async (toAddress: string, amount: string) => {
    if (!provider) {
      throw new Error('Provider not initialized. Please connect wallet first.');
    }

    const value = web3.utils.toWei(0.1, 'ether');
    const target = toAddress as `0x${string}`;
    console.log(value, target);

    const { hash: uoHash } = await provider.sendUserOperation({
      uo: {
        target,
        data: '0x',
        value,
      },
    });

    console.log('UserOperation Hash: ', uoHash);

    const txHash = await provider.waitForUserOperationTransaction({
      hash: uoHash,
    });

    console.log('Transaction Hash: ', txHash);
    return txHash;
  };

  const getWalletBalances = async () => {
    const _tokenBalances = await provider?.core?.getTokenBalances(address);
    console.log(_tokenBalances, '_tokenBalances');
    setTokenBalances(_tokenBalances?.tokenBalances);
    return _tokenBalances?.tokenBalances;
  };

  return (
    <WalletContext.Provider value={{ provider, address, isAuthenticated, connectWallet, transferAmount, getWalletBalances, tokenBalances }}>
      {children}
    </WalletContext.Provider>
  );
};
