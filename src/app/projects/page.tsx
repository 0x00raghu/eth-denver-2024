'use client';
import Link from 'next/link';
import ProjectCard from '@/components/_projects/project-card';
import { useDisclosure } from '@chakra-ui/react';
import { getProjectCreated } from '@/subgraph/index';
import { useState } from 'react';

const Project = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projects, setProjects] = useState([]);

  const handleGetProjects = async () => {
    const ap = await getProjectCreated();
    console.log(ap, 'getProjectCreated');
    setProjects(ap);
  };

  return (
    <>
      <div className="mx-auto max-w-7xl sm:py-8 px-4 lg:px-8 ">
        <div className="sm:flex justify-between items-center">
          <h3 className="text-midnightblue text-4xl lg:text-55xl font-semibold mb-5 sm:mb-0">Popular projects.</h3>
          <Link href={'/'} className="text-Blueviolet text-lg font-medium space-links">
            Explore projects&nbsp;&gt;&nbsp;
          </Link>
        </div>

        <button
          onClick={handleGetProjects}
          className="flex border w-full md:w-auto mt-5 md:mt-0 border-pink justify-center rounded-full text-xl font-medium items-center py-5 px-10 text-pink hover:text-white hover:bg-pink"
        >
          Test
        </button>

        <div className="grid grid-cols-3 justify-center min-h-screen">
          {projects && projects.map((item: any, i: any) => <ProjectCard key={i} item={item} onOpen={onOpen} onClose={onClose} isOpen={isOpen} />)}
        </div>
      </div>
    </>
  );
};

export default Project;
