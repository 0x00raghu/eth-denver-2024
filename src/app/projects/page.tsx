'use client';
import Link from 'next/link';
import ProjectCard from '@/components/_projects/project-card';
import { useDisclosure } from '@chakra-ui/react';
import { getProjectCreated } from '@/subgraph/index';
import { useEffect, useState } from 'react';

const Project = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    handleGetProjects();
  }, []);

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
          <Link href={'/list-project'} className="text-Blueviolet text-lg font-medium space-links">
            Explore projects&nbsp;&gt;&nbsp;
          </Link>
        </div>

        {projects &&
          projects.map((item: any, i: any) => {
            return (
              <div className="grid grid-cols-3 justify-center min-h-screen" key={i}>
                <ProjectCard item={item} onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Project;
