'use client';
import React, { useState, useEffect } from 'react';
import { fetchGitHubRepos } from '@/utils/github';
import GithubProjects from '@/components/_github/GithubProjects';
import { AuthButton } from '@/components/_github/AuthButton';
import { Button } from '@chakra-ui/react';

const ListProject = () => {
  const [repos, setRepos]: any = useState([]);

  const fetchRepos = async () => {
    const data = await fetchGitHubRepos('0x00raghu');
    setRepos(data);
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <div className="mx-auto max-w-7xl sm:py-8 px-4 lg:px-8 ">
      <AuthButton />
      {/* <Button onClick={fetchRepos} colorScheme="teal">
        Get Github Repos
      </Button> */}
      {repos && repos.length > 0 && <GithubProjects data={repos} />}
    </div>
  );
};

export default ListProject;
