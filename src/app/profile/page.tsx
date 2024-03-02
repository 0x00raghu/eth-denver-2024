'use client';
import { useEffect } from 'react';
import { useWallet } from '@/context/_aa/WalletContext';
import DynamicReactTable from '@/utils/table';
import { getProjectFundInUSD, withdrawUSDC, withdrawEth } from '@/context/_aa/ContractFunctions'; // Import the additional contract functions
import { ArrowDownIcon } from '@heroicons/react/24/solid';
import { openTransak } from '@/components/_onramp/transak';

const Home = () => {
  const { address, sendUserOperation, tokenBalances, getWalletBalances, selectedChain, getWalletNfts, nftBalances } = useWallet();

  const handleGetBalances = async () => {
    await getWalletBalances();
    await getWalletNfts();
  };

  useEffect(() => {
    handleGetBalances();
  }, [address]);

  // Function to handle withdrawing USDC
  const handleWithdrawUSDC = async () => {
    const { uo }: any = await withdrawUSDC(1, 0, selectedChain.chain.id);
    await sendUserOperation(uo);
  };

  // Function to handle withdrawing Ethereum
  const handleWithdrawEth = async () => {
    const { uo }: any = await withdrawEth(0, selectedChain.chain.id);
    await sendUserOperation(uo);
  };

  const handleGetBalanceLiveFeed = async () => {
    const { ethBalance, usdcBalance } = await getProjectFundInUSD(0, selectedChain.chain.id);
    console.log(ethBalance, usdcBalance);
  };

  return (
    <div id="home-section" className="bg-lightkblue">
      <div className="mx-auto max-w-7xl pt-20 sm:pb-24 px-6 space-y-10">
        <div className="relative text-white focus-within:text-white grid grid-cols-3 flex-row gap-x-2 input-shadow rounded-full pt-5 space-y-3  max-w-7xl">
          <button
            onClick={handleWithdrawUSDC}
            className="flex border w-full md:w-auto mt-5 md:mt-0 border-pink justify-center rounded-full text-xl font-medium items-center py-5 px-10 text-pink hover:text-white hover:bg-pink"
          >
            Withdraw USDC
          </button>

          <button
            onClick={handleWithdrawEth}
            className="flex border w-full md:w-auto mt-5 md:mt-0 border-pink justify-center rounded-full text-xl font-medium items-center py-5 px-10 text-pink hover:text-white hover:bg-pink"
          >
            Withdraw Eth
          </button>

          <button
            onClick={handleGetBalanceLiveFeed}
            className="flex border w-full md:w-auto mt-5 md:mt-0 border-pink justify-center rounded-full text-xl font-medium items-center py-5 px-10 text-pink hover:text-white hover:bg-pink"
          >
            Get Balance With Feeds
          </button>

          <button
            type="button"
            onClick={() => openTransak('BUY', '')}
            className="flex border w-full md:w-auto mt-5 md:mt-0 bg-ultramarine justify-center rounded-full text-xl font-medium items-center py-5 px-10 text-white hover:text-white hover:bg-pink"
          >
            <ArrowDownIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Buy Crypto
          </button>
        </div>

        {tokenBalances && tokenBalances.length > 0 && <DynamicReactTable data={tokenBalances} />}
        {nftBalances && nftBalances.length > 0 && <DynamicReactTable data={nftBalances} />}
      </div>
    </div>
  );
};

export default Home;
