'use client';
import { useEffect } from 'react';
import { useWallet } from '@/context/_aa/WalletContext';
import DynamicReactTable from '@/utils/table';
import { getProjectFundInUSD, withdrawUSDC, withdrawEth } from '@/context/_aa/ContractFunctions'; // Import the additional contract functions
import { ArrowDownIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { openTransak } from '@/components/_onramp/transak';
import { ArrowTopRightOnSquareIcon, ArrowUpIcon } from '@heroicons/react/20/solid';

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
    <>
      <div className="app-container app-theme-white flex flex-col w-full text-gray-700 bg-white">
        <section className="">
          <div className="">
            <div className="">
              <div className="mx-auto max-w-7xl pb-10 lg:py-6  w-full">
                <div className="sm:flex sm:items-center w-full">
                  <div className="sm:flex-auto w-full">
                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8 w-full">
                      {/* Left column */}

                      <div className="grid grid-cols-1 gap-4 h-full">
                        <div className="h-full rounded-lg bg-white shadow">
                          <div className="p-6 h-full">
                            <div className="h-full">
                              <div className="pt-2 h-full">
                                <h2 className="leading-6 text-xl font-bold font-sans text-gray-900 ">Trade Crypto with Fiat</h2>
                                <p className="mt-4 text-base text-gray-500 font-extralight">
                                  Buy & Sell crypto easily with fiat and add to your wallet
                                </p>
                                <div className="pt-8 flex rounded-md shadow-sm  justify-center">
                                  <button
                                    type="button"
                                    onClick={() => openTransak('BUY', '')}
                                    className="mr-7 inline-flex items-center rounded-md border border-transparent bg-gradient-to-r from-black  to-blue-900 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm "
                                  >
                                    <ArrowDownIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                    Buy Crypto
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => openTransak('SELL', '')}
                                    className="inline-flex items-center rounded-md border border-transparent bg-gradient-to-r from-green-800  via-black to-black  px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                  >
                                    <ArrowUpIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                    Sell Crypto
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right column */}

                      <div className="grid grid-cols-1 gap-4 lg:col-span-2 ">
                        <section aria-labelledby="section-1-title">
                          <div className="overflow-hidden rounded-lg bg-white shadow">
                            <div className="p-6">
                              <div>
                                <div>
                                  <h2 className="leading-6 text-xl font-semibold text-gray-900 font-sans  lg:-mx-2">Balance</h2>
                                  <div className="bg-gray-50 px-4 text-right sm:px-6 -my-4">
                                    <button type="submit" className="uppercase inline-flex text-blue-600 hover:text-orange-900">
                                      {' '}
                                      View All
                                      <ArrowRightIcon className="h-5 w-5 ml-2" aria-hidden="true" />
                                    </button>
                                  </div>
                                </div>

                                <div className="mt-4 flex flex-col">
                                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full align-middle ">
                                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-300">
                                          <thead className="bg-gray-50">
                                            <tr>
                                              <th
                                                scope="col"
                                                className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                              >
                                                Symbol
                                              </th>
                                              <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Balance
                                              </th>
                                              <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                View
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody className="divide-y divide-gray-200 bg-white">
                                            {tokenBalances.length > 0 &&
                                              tokenBalances.map((transaction: any, i) => (
                                                <tr key={i}>
                                                  <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                                                    {transaction?.symbol || ''}
                                                  </td>
                                                  <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                                                    {transaction.amount || ''}
                                                  </td>
                                                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                    <a href={transaction?.meta?.viewURL || ''} target="_blank" rel="noreferrer">
                                                      <ArrowTopRightOnSquareIcon width={15} />
                                                    </a>
                                                  </td>
                                                </tr>
                                              ))}
                                            {tokenBalances && tokenBalances.length === 0 && (
                                              <tr className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 text-center w-full ">
                                                No Records Found
                                              </tr>
                                            )}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-auto max-w-7xl">
                <div>
                  <div className="grid grid-cols-1 gap-4 lg:col-span-2 ">
                    <section aria-labelledby="section-1-title">
                      <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="p-6">
                          <div>
                            <div>
                              <h2 className="leading-6 text-xl font-semibold text-gray-900 font-sans  ">NFT Balance</h2>
                              <div className="bg-gray-50 px-4 text-right sm:px-6 -my-4">
                                <button type="submit" className="uppercase inline-flex text-blue-600 hover:text-orange-900">
                                  {' '}
                                  View All
                                  <ArrowRightIcon className="h-5 w-5 ml-2" aria-hidden="true" />
                                </button>
                              </div>
                            </div>

                            <div className="mt-4 flex flex-col">
                              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full align-middle ">
                                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                      <thead className="bg-gray-50">
                                        <tr>
                                          <th
                                            scope="col"
                                            className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                          >
                                            Name
                                          </th>
                                          <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Address
                                          </th>
                                          <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Type
                                          </th>
                                          <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Balance
                                          </th>
                                          <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            TokenId
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-gray-200 bg-white">
                                        {nftBalances.length > 0 &&
                                          nftBalances.map((transaction: any, i) => (
                                            <tr key={i}>
                                              <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                                                {transaction?.name || ''}
                                              </td>
                                              <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                                                {transaction.address || ''}
                                              </td>
                                              <td className="whitespace-nowrap px-6 py-2  text-sm font-medium">{transaction.tokenType || ''}</td>
                                              <td className="whitespace-nowrap px-6 py-2  text-sm font-medium">{transaction.balance || ''}</td>
                                              <td className="whitespace-nowrap px-6 py-2  text-sm font-medium">{transaction.tokenId || ''}</td>
                                            </tr>
                                          ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto border p-4 rounded-lg w-full mt-4">
          <h2 className="leading-6 text-xl font-bold font-sans text-gray-900 py-10 ">With Draw Functions</h2>
          <div className="flex text-white flex-row  gap-2 w-1/2  ">
            <button
              onClick={handleWithdrawUSDC}
              className="flex border w-full h-full  border-black justify-center rounded-lg text-xl font-medium items-center py-5 px-10 text-black hover:text-white hover:bg-black"
            >
              Withdraw USDC
            </button>

            <button
              onClick={handleWithdrawEth}
              className="flex border w-full  h-full   border-black justify-center rounded-lg text-xl font-medium items-center py-5 px-10 text-black hover:text-white hover:bg-black"
            >
              Withdraw Eth
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
