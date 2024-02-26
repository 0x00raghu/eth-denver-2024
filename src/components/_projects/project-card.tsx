import Image from 'next/image';
import { StarIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { Button } from '@chakra-ui/react';
import DonateModal from './donate-modal';

const ProjectCard = ({ item, isOpen, onOpen, onClose }: any) => {
  return (
    <div className="w-full max-w-xl">
      <div className="bg-white m-3 px-3 pt-3 pb-12 my-20 shadow-courses rounded-2xl">
        <div className="relative rounded-3xl">
          <Image src={item.imgSrc} alt="gaby" width={389} height={262} className="m-auto clipPath" />
          <div className="absolute right-5 -bottom-2 bg-ultramarine rounded-full p-6">
            <h3 className="text-white uppercase text-center text-sm font-medium">
              best <br /> seller
            </h3>
          </div>
        </div>

        <div className="px-3">
          <h4 className="text-2xl font-bold pt-6 text-black">{item.heading}</h4>
          <h4 className="text-2xl font-bold pt-1 text-black">{item.heading2}</h4>

          <div>
            <h3 className="text-base font-normal pt-6 opacity-75">{item.name}</h3>
          </div>

          <div className="flex justify-between item-center py-6">
            <div className="flex gap-4">
              <h3 className="text-red text-22xl font-medium">{item.rating}</h3>
              <div className="flex">
                <StarIcon className="h-5 w-5 text-gold" />
                <StarIcon className="h-5 w-5 text-gold" />
                <StarIcon className="h-5 w-5 text-gold" />
                <StarIcon className="h-5 w-5 text-gold" />
                <StarIcon className="h-5 w-5 text-gold" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-medium">${item.price}</h3>
            </div>
          </div>

          <hr style={{ color: '#C4C4C4' }} />

          <div className="flex justify-between pt-6 w-full max-w-7xl">
            <Button
              onClick={onOpen}
              leftIcon={<CurrencyDollarIcon className="h-6 w-6" aria-hidden="true" />}
              colorScheme="pink"
              variant="solid"
              width={'inherit'}
            >
              Donate USDC
            </Button>
          </div>

          <DonateModal item={item} onClose={onClose} isOpen={isOpen} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
