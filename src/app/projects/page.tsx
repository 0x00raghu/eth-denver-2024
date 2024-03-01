'use client';
import Link from 'next/link';
import ProjectCard from '@/components/_projects/project-card';
import { useDisclosure } from '@chakra-ui/react';
import { getProjectCreated } from '@/subgraph/index';
import { useEffect, useState } from 'react';

const Project = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projects, setProjects]: any = useState([]);
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  useEffect(() => {
    handleGetProjects();
  }, []);

  const handleGetProjects = async () => {
    const data = await getProjectCreated();
    console.log(data, 'getProjectCreated');
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
          <h3 className="text-midnightblue text-4xl lg:text-55xl font-semibold mb-5 sm:mb-0">Popular projects.</h3>
          <Link href={'/list-project'} className="text-Blueviolet text-lg font-medium space-links">
            List Your Project&nbsp;&gt;&nbsp;
          </Link>
        </div>

        <div className="grid grid-cols-3 justify-center w-full">
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
