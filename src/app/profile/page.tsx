'use client';
import Image from 'next/image';
import { useWallet } from '@/context/_aa/WalletContext';
import DynamicReactTable from '@/utils/table';
import { createProject, fundUSDC, fundEth, withdrawUSDC, withdrawEth, getBalance } from '@/context/_aa/ContractFunctions'; // Import the additional contract functions

const Home = () => {
  const { address, sendUserOperation, tokenBalances, getWalletBalances } = useWallet();

  const handleTransferAmount = async () => {
    if (address) await sendUserOperation('0x5B4d77e199FE8e5090009C72d2a5581C74FEbE89', '10000000000');
  };

  const handleGetBalances = async () => {
    const balances = await getWalletBalances();
    console.log(tokenBalances, 'tokenBalances');
    console.log(balances, 'balance');
  };

  const handleCreateProject = async () => {
    const { uoCallData, contractAddress } = await createProject('test1', 'https://github.com/vuejs/eslint-config-typescript');
    await sendUserOperation(contractAddress, uoCallData);
  };

  const handleFundUSDC = async () => {
    const { uoCallData, contractAddress } = await fundUSDC(1, 0);
    await sendUserOperation(contractAddress, uoCallData);
  };

  // Function to handle funding Ethereum
  const handleFundEth = async () => {
    const { uoCallData, contractAddress } = await fundEth(1, 0); // Adjust arguments as needed
    await sendUserOperation(contractAddress, uoCallData);
  };

  // Function to handle withdrawing USDC
  const handleWithdrawUSDC = async () => {
    const { uoCallData, contractAddress } = await withdrawUSDC(1, 0); // Adjust arguments as needed
    await sendUserOperation(contractAddress, uoCallData);
  };

  // Function to handle withdrawing Ethereum
  const handleWithdrawEth = async () => {
    const { uoCallData, contractAddress } = await withdrawEth(0); // Adjust arguments as needed
    await sendUserOperation(contractAddress, uoCallData);
  };

  // Function to handle getting balance
  const handleGetBalance = async () => {
    const { uoCallData, contractAddress } = await getBalance(); // Adjust arguments as needed
    await sendUserOperation(contractAddress, uoCallData);
  };

  return (
    <div id="home-section" className="bg-lightkblue">
      <div className="mx-auto max-w-7xl pt-20 sm:pb-24 px-6">
        {tokenBalances && tokenBalances.length > 0 && <DynamicReactTable data={tokenBalances} />}

        <div className="relative text-white focus-within:text-white grid grid-cols-3 flex-row gap-x-2 input-shadow rounded-full pt-5 space-y-3  max-w-7xl">
          <button
            onClick={handleGetBalances}
            className="flex border w-full md:w-auto mt-5 md:mt-0 border-pink justify-center rounded-full text-xl font-medium items-center py-5 px-10 text-pink hover:text-white hover:bg-pink"
          >
            Get Balances
          </button>

          <button
            onClick={handleTransferAmount}
            className="flex border w-full md:w-auto mt-5 md:mt-0 border-pink justify-center rounded-full text-xl font-medium items-center py-5 px-10 text-pink hover:text-white hover:bg-pink"
          >
            Transfer
          </button>

          <button
            onClick={handleCreateProject}
            className="flex border w-full md:w-auto mt-5 md:mt-0 border-pink justify-center rounded-full text-xl font-medium items-center py-5 px-10 text-pink hover:text-white hover:bg-pink"
          >
            Create Project
          </button>

          <button
            onClick={handleFundUSDC}
            className="flex border w-full md:w-auto mt-5 md:mt-0 border-pink justify-center rounded-full text-xl font-medium items-center py-5 px-10 text-pink hover:text-white hover:bg-pink"
          >
            Fund USDC
          </button>
          <button
            onClick={handleFundEth}
            className="flex border w-full md:w-auto mt-5 md:mt-0 border-pink justify-center rounded-full text-xl font-medium items-center py-5 px-10 text-pink hover:text-white hover:bg-pink"
          >
            Fund Eth
          </button>

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
            onClick={handleGetBalance}
            className="flex border w-full md:w-auto mt-5 md:mt-0 border-pink justify-center rounded-full text-xl font-medium items-center py-5 px-10 text-pink hover:text-white hover:bg-pink"
          >
            Get Balance
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
