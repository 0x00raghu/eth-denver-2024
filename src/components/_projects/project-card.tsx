import Image from 'next/image';
import { StarIcon, CurrencyDollarIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { Button, Code } from '@chakra-ui/react';
import DonateModal from './donate-modal';

const ProjectCard = ({ item, isOpen, handleSelectProject, onClose, selectedProject, index }: any) => {
  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noreferrer');
  };

  return (
    <div className="w-full max-w-xl">
      <div className="bg-white border m-3 px-3 pt-3 pb-12 my-20  rounded-lg">
        <div className="px-3">
          <Code>{item?._githubMeta?.visibility}</Code>
          <h4 className="text-2xl font-bold pt-6 text-black">{item.name}</h4>
          <h4 className="text-2xl font-bold pt-1 text-black font-mono">{item.html_url}</h4>
          <div>
            <h3 className="text-base font-normal pt-1 opacity-75 font-mono">{item.owner}</h3>
          </div>
          <div className="relative rounded-3xl  py-4">
            <div className="flex items-center justify-center bg-black  rounded-lg p-1">
              <h3
                onClick={() => openInNewTab(item.gitUrl)}
                className="flex gap-2 items-center text-white uppercase font-mono text-center text-sm font-medium"
              >
                <p>View on Github</p> <ArrowTopRightOnSquareIcon className="h-6 w-6" aria-hidden="true" />
              </h3>
            </div>
          </div>
          <div className="flex justify-between item-center py-1">
            <div className="flex gap-4">
              <StarIcon className="h-5 w-5 text-gold" />
              <h3 className="text-red text-22xl font-medium font-mono">{item._githubMeta?.stargazers_count}</h3>
            </div>
            <h3 className="text-xl font-medium font-mono">USDC : ${item?.livePrices?.usdcBalance}</h3>
            <h3 className="text-xl font-medium font-mono">ETH : ${item?.livePrices?.ethBalance}</h3>
          </div>
          <h5>Forks: {item?._githubMeta?.forks_count}</h5>
          <h3 className="">Last Updated At: {item?._githubMeta?.pushed_at}</h3>
          <Code>{item?._githubMeta?.owner?.login}</Code> <br />
          <hr style={{ color: '#C4C4C4' }} />
          <div className="flex justify-between pt-6 w-full max-w-7xl">
            <Button
              onClick={() => handleSelectProject(item)}
              leftIcon={<CurrencyDollarIcon className="h-6 w-6" aria-hidden="true" />}
              colorScheme="gray"
              variant="solid"
              width={'inherit'}
            >
              Donate
            </Button>
          </div>
          {isOpen && <DonateModal item={selectedProject} onClose={onClose} isOpen={isOpen} index={index} />}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
