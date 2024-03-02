'use client';
import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useWallet } from '@/context/_aa/WalletContext';
import { Code } from '@chakra-ui/react';

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: 'Profile', href: '/profile', current: false },
  { name: 'List Project', href: '/list-project', current: false },
  { name: 'Projects', href: '/projects', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const { isAuthenticated, address, connectWallet } = useWallet();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Disclosure as="nav" className="navbar">
      <div className="mx-auto max-w-7xl p-3 md:p-6 lg:px-8">
        <div className="relative flex h-12 sm:h-20 items-center">
          <div className="flex flex-1 items-center sm:justify-between">
            {/* LOGO */}
            <div className="hidden sm:flex flex-shrink-0 items-center border-right">
              <Image src="/images/_logo/Logo.svg" alt="logo" width={56} height={56} />
              <Link href="/" className="text-2xl font-semibold text-black ml-4">
                Crypto
              </Link>
            </div>

            {/* LINKS */}
            <div className="hidden lg:flex items-center border-right ">
              <div className="flex justify-end space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-black' : 'navlinks hover:opacity-100',
                      'px-3 py-4 rounded-md text-lg font-normal opacity-50 hover:text-black space-links',
                    )}
                    aria-current={item.href ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="gap-6 hidden lg:flex">
              {isAuthenticated ? (
                <Code colorScheme="yellow">{address}</Code>
              ) : (
                <button
                  onClick={connectWallet}
                  className="flex border w-full md:w-auto mt-5 md:mt-0 border-pink justify-center rounded-full text-xl font-medium items-center py-5 px-10 text-pink hover:text-white hover:bg-pink"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default Navbar;
