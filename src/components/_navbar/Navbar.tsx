'use client';
import Link from 'next/link';
import React from 'react';
import { useWallet } from '@/context/_aa/WalletContext';
import { Select } from '@chakra-ui/react';

const Navbar = () => {
  const { isAuthenticated, address, connectWallet } = useWallet();

  return (
    <>
      <section className="w-full px-8 text-gray-700 bg-white">
        <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
          <div className="relative flex flex-col md:flex-row">
            <Link href="/" className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
              <span className="mx-auto text-xl font-black leading-none text-gray-900 select-none">
                Gitfund
                <span className="text-indigo-600">.</span>
              </span>
            </Link>
            <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
              <Link href="/projects" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">
                Discover
              </Link>

              <Link href="/list-project" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">
                Submit a Project
              </Link>
              <Link href="/profile" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">
                My Profile
              </Link>
            </nav>
          </div>

          <div className="">
            <Select placeholder="Select option">
              <option value="option1">Base</option>
              <option value="option2">Arbitrum</option>
              <option value="option3">Option 3</option>
            </Select>
          </div>
          {true && (
            <button
              disabled={address ? true : false}
              onClick={connectWallet}
              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {address ? `Connected to: ${address}` : 'Connect Wallet'}
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default Navbar;
