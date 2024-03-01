import Image from 'next/image';
import { StarIcon, CurrencyDollarIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { Button, Code } from '@chakra-ui/react';
import DonateModal from './donate-modal';
import { useEffect, useState } from 'react';

const ProjectCard = ({ item, isOpen, handleSelectProject, onClose, selectedProject, index }: any) => {
  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noreferrer');
  };

  return (
    <div className="w-full max-w-xl">
      <div className="bg-white m-3 px-3 pt-3 pb-12 my-20 shadow-courses rounded-2xl">
        <div className="relative rounded-3xl">
          <Image src={'/images/_courses/courseone.png'} alt="gaby" width={389} height={262} className="m-auto clipPath" />
          <div className="absolute right-5 -bottom-2 bg-ultramarine rounded-full p-6">
            <h3 className="text-white uppercase text-center text-sm font-medium">
              best <br /> seller
            </h3>
          </div>
        </div>

        <div className="px-3">
          <h4 className="text-2xl font-bold pt-6 text-black">{item.name}</h4>
          <h4 className="text-2xl font-bold pt-1 text-black">{item.html_url}</h4>
          <div>
            <h3 className="text-base font-normal pt-6 opacity-75">{item.owner}</h3>
          </div>
          <div className="flex justify-between item-center py-6">
            <div className="flex gap-4">
              <h3 className="text-red text-22xl font-medium">{item._githubMeta?.stargazers_count}</h3>
              <div className="flex">
                <StarIcon className="h-5 w-5 text-gold" />
                <StarIcon className="h-5 w-5 text-gold" />
                <StarIcon className="h-5 w-5 text-gold" />
                <StarIcon className="h-5 w-5 text-gold" />
                <StarIcon className="h-5 w-5 text-gold" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-medium">${item.usdcBalance}</h3>
            </div>
          </div>
          <h5>Forks: {item?._githubMeta?.forks_count}</h5>
          <h3>Last Updated At: {item?._githubMeta?.pushed_at}</h3>
          <Code>{item?._githubMeta?.owner?.login}</Code> <br />
          <Code>{item?._githubMeta?.visibility}</Code>
          <hr style={{ color: '#C4C4C4' }} />
          <div className="flex justify-between pt-6 w-full max-w-7xl">
            <Button
              onClick={() => openInNewTab(item.gitUrl)}
              backgroundColor={'black'}
              color={'white'}
              width={'inherit'}
              rightIcon={<ArrowTopRightOnSquareIcon className="h-6 w-6" aria-hidden="true" />}
            >
              View on Github
            </Button>
          </div>
          <div className="flex justify-between pt-6 w-full max-w-7xl">
            <Button
              onClick={() => handleSelectProject(item)}
              leftIcon={<CurrencyDollarIcon className="h-6 w-6" aria-hidden="true" />}
              colorScheme="pink"
              variant="solid"
              width={'inherit'}
            >
              Donate USDC
            </Button>
          </div>
          {isOpen && <DonateModal item={selectedProject} onClose={onClose} isOpen={isOpen} index={index} />}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
