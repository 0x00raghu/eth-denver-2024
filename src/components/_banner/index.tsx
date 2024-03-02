'use client';
import Image from 'next/image';
import Link from 'next/link';

// impport svg in the next/image
import bgcode from '../../assets/logo.svg';
import hero from '../../assets/hero.svg';

const Banner = () => {
  return (
    <section className="px-2 py-20 bg-white md:px-0">
      <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
        <div className="flex flex-wrap items-center sm:-mx-3">
          <div className="w-full md:w-1/2 md:px-3">
            <div className="w-full pb-6 space-y-6 font  sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
              <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl">
                <span className="block xl:inline">
                  Support the{' '}
                  <span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-black via-blue-700 to-blue-900 lg:inline">
                    Software
                  </span>{' '}
                  that drives everything you do
                </span>
              </h1>
              <p className="mx-auto text-base text-gray-500 sm:max-w-md font-mono lg:text-xl md:max-w-3xl">
                {'>'}_ It's never been easier to fund the projects on chain.
              </p>
              <section className="bg-white ">
                <div className="py-4">
                  <div className="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 md:grid-cols-3  dark:text-gray-400">
                    <p className="text-base font-bold  tracking-tight leading-tight text-center text-grey">On your favorite chains</p>
                    <a href="#" className="flex justify-center items-center">
                      <Image src={'/images/_logo/base.svg'} alt="" width={50} height={50} className="flex-shrink-0 rounded-full" />
                      <p className="px-2 font-bold">BASE</p>
                    </a>
                    <a href="#" className="flex justify-center items-center">
                      <Image src={'/images/_logo/arbitrum.svg'} alt="" width={50} height={50} className="flex-shrink-0 rounded-full" />
                      <p className="px-2 font-bold">ARBITRUM</p>
                    </a>
                  </div>
                </div>
              </section>

              <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                <Link
                  href="/creator/discover"
                  className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-black  bg-gradient-to-r from-black via-black to-blue-900 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto"
                >
                  Discover Projects
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 ml-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link href="/creator/profile" className="flex items-center px-6 py-3 text-black bg-white border border-black ">
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="w-full  relative">
              <Image src="/images/_banner/bgcode.svg" alt="nothing" width={1000} height={805} className="absolute top-0 left-0" />
              <Image src="/images/_banner/coins.svg" alt="nothing" width={1000} height={805} className="top-0 left-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
