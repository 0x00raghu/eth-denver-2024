'use client';
import Link from 'next/link';
import ProjectCard from '@/components/_projects/project-card';
import { Button, useDisclosure } from '@chakra-ui/react';
import { getProjectCreated } from '@/subgraph/index';
import { useEffect, useState } from 'react';
import { useWallet } from '@/context/_aa/WalletContext';

const Project = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projects, setProjects]: any = useState([]);
  const [selectedProject, setSelectedProject] = useState(projects?.[0]);
  const { selectedChain } = useWallet();

  useEffect(() => {
    handleGetProjects();
  }, [selectedChain]);

  const handleGetProjects = async () => {
    const data = await getProjectCreated(selectedChain.chain.id);
    console.log(data, 'projects', selectedChain.chain.name);
    setProjects(data);
  };

  const handleSelectProject = (item: any) => {
    setSelectedProject(item);
    onOpen();
  };

  return (
    <>
      <div className="mx-auto max-w-7xl sm:py-8 px-4 lg:px-8 ">
        <div className="sm:flex justify-between items-center">
          <h3 className="text-midnightblue text-4xl lg:text-55xl font-semibold mb-5 sm:mb-0">Discover projects</h3>
          <Button onClick={handleGetProjects}> Refresh</Button>

          <Link href={'/list-project'} className="text-blue-500 text-lg font-medium space-links font-mono">
            List Your Project&nbsp;&gt;&nbsp;
          </Link>
        </div>

        <div className="grid grid-cols-2 justify-center w-full">
          {projects &&
            projects.map((item: any, i: any) => {
              return (
                <ProjectCard
                  item={item}
                  index={i}
                  selectedProject={selectedProject}
                  onOpen={onOpen}
                  onClose={onClose}
                  isOpen={isOpen}
                  key={item.transactionHash}
                  handleSelectProject={handleSelectProject}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Project;
