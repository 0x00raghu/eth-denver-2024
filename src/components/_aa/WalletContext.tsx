'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createModularAccountAlchemyClient } from '@alchemy/aa-alchemy';
import { createWalletClient, custom, parseEther } from 'viem';
import { baseSepolia, WalletClientSigner } from '@alchemy/aa-core';
import { Alchemy, Network } from 'alchemy-sdk';
import _ from 'lodash';

interface WalletContextType {
  provider: any; // Adjust the type according to your provider type
  address: string | null;
  isAuthenticated: boolean;
  connectWallet: () => Promise<void>;
  transferAmount: (toAddress: string, amount: string) => Promise<void>;
  getWalletBalances: () => Promise<any>;
  tokenBalances: any[];
}

interface WalletProviderProps {
  children: React.ReactNode;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [provider, setProvider] = useState<any>(null);
  const [alchemyClient, setAlchemyClient] = useState<any>(null);
  const [address, setAddress] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [tokenBalances, setTokenBalances] = useState<any>([]);

  const connectWallet = async () => {
    console.log('connectWallet: ', connectWallet);
    const chain = baseSepolia;
    const client: any = createWalletClient({
      chain,
      transport: custom(window.ethereum),
    });

    const eoaSigner = new WalletClientSigner(client, 'json-rpc');

    const alchemy = new Alchemy({
      network: Network.BASE_SEPOLIA,
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    });
    setAlchemyClient(alchemy);

    const alchemyProvider = await createModularAccountAlchemyClient({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '',
      chain,
      signer: eoaSigner,
      gasManagerConfig: {
        policyId: '7ae5ae77-cc13-413f-8ed0-da340340821d',
      },
    });

    // 0.996840926798627995

    setProvider(alchemyProvider);
    setAddress(alchemyProvider.getAddress());
    setIsAuthenticated(true);
  };

  const transferAmount = async (toAddress: string, amount: string) => {
    if (!provider) {
      throw new Error('Provider not initialized. Please connect wallet first.');
    }

    const value = parseEther('0.0001');
    const target = toAddress as `0x${string}`;
    console.log(value, target);

    const result = await provider.sendUserOperation({
      uo: {
        target,
        data: '0x',
        value: BigInt("100000000000000000"),
      },
    });

    console.log('UserOperation Hash: ', result);

    const txHash = await provider.waitForUserOperationTransaction({
      hash: result.hash,
    });

    console.log('Transaction Hash: ', txHash);
    return txHash;
  };

  const getTokenMetaData = async (tokenAddress: string) => {
    const tokenMetaData = await alchemyClient?.core?.getTokenMetadata(tokenAddress);
    console.log(tokenMetaData, 'tokenMetaData');
    return tokenMetaData;
  };

  const getWalletBalances = async () => {
    const _tokenBalances = await alchemyClient?.core?.getTokenBalances(address);

    const promises = await _tokenBalances?.tokenBalances.map(async (item: any) => {
      const metaData = await getTokenMetaData(item.contractAddress);
      if (metaData) {
        const amount = item.tokenBalance / Math.pow(10, metaData.decimals);
        item.amount = amount.toFixed(2);
        delete item.tokenBalance;
        item.viewURL = `https://sepolia.basescan.org/address/${address}#tokentxns`;
      }
      return { ...item, ...metaData };
    });

    const tokenBalancesNew = await Promise.all(promises);
    setTokenBalances(tokenBalancesNew);
    return tokenBalancesNew;
  };

  return (
    <WalletContext.Provider value={{ provider, address, isAuthenticated, connectWallet, transferAmount, getWalletBalances, tokenBalances }}>
      {children}
    </WalletContext.Provider>
  );
};
