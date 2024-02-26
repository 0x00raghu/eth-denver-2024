'use client';
import Link from 'next/link';
import ProjectCard from '@/components/_projects/project-card';
import { useDisclosure } from '@chakra-ui/react';
import { projectsData } from '@/constants/projects-data';

const Project = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className="mx-auto max-w-7xl sm:py-8 px-4 lg:px-8 ">
        <div className="sm:flex justify-between items-center">
          <h3 className="text-midnightblue text-4xl lg:text-55xl font-semibold mb-5 sm:mb-0">Popular projects.</h3>
          <Link href={'/'} className="text-Blueviolet text-lg font-medium space-links">
            Explore projects&nbsp;&gt;&nbsp;
          </Link>
        </div>
        <div className="grid grid-cols-3 justify-center min-h-screen">
          {projectsData.map((item: any, i: any) => (
            <ProjectCard key={i} item={item} onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Project;
