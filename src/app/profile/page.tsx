'use client';
import Image from 'next/image';
import { useWallet } from '@/components/_aa/WalletContext';
import DynamicReactTable from '@/utils/table';

const Home = () => {
  const { address, transferAmount, tokenBalances, getWalletBalances } = useWallet();

  const handleTransferAmount = async () => {
    if (address) await transferAmount('0x5B4d77e199FE8e5090009C72d2a5581C74FEbE89', '100000000000000000');
  };

  const handleGetBalances = async () => {
    const balances = await getWalletBalances();
    console.log(tokenBalances, 'tokenBalances');
    console.log(balances, 'balance');
  };

  const data = [
    { ToConvert: 'inches', Into: 'millimetres (mm)', MultiplyBy: 25.4 },
    { ToConvert: 'feet', Into: 'centimetres (cm)', MultiplyBy: 30.48 },
    { ToConvert: 'yards', Into: 'metres (m)', MultiplyBy: 0.91444 },
  ];

  return (
    <div id="home-section" className="bg-lightkblue">
      <div className="mx-auto max-w-7xl pt-20 sm:pb-24 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 space-x-1">
          <div className="col-span-6 flex flex-col justify-evenly">
            <div className="flex gap-2 mx-auto lg:mx-0">
              <Image src="/images/_banner/check.svg" alt="check-image" width={20} height={20} />
              <h3 className="text-kellygreen text-sm font-semibold text-center lg:text-start">Get 30% off on first enroll</h3>
            </div>
            <h1 className="text-midnightblue text-4xl sm:text-5xl font-semibold text-center lg:text-start lh-120 pt-5 lg:pt-0">
              Advance your engineering skills with us.
            </h1>
            <h3 className="text-charcoal text-lg font-normal text-center lg:text-start opacity-75 pt-5 lg:pt-0">
              Build skills with our courses and mentor from world-class companies.
            </h3>

            {tokenBalances && tokenBalances.length > 0 && <DynamicReactTable data={tokenBalances} />}

            <div className="relative text-white focus-within:text-white flex flex-row-reverse input-shadow rounded-full pt-5 lg:pt-0">
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
            </div>
          </div>

          <div className="col-span-6 flex justify-center">
            <Image src="/images/_banner/mahila.png" alt="nothing" width={1000} height={805} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
