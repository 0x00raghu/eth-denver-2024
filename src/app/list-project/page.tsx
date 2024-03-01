'use client';
import React, { useState, useEffect } from 'react';
import { fetchGitHubAccountByEmail, fetchGitHubRepos } from '@/utils/github';
import GithubProjects from '@/components/_github/GithubProjects';
import { AuthButton } from '@/components/_github/AuthButton';
import { useSession } from 'next-auth/react';

const ListProject = () => {
  const [repos, setRepos]: any = useState([]);
  const { data: session }: any = useSession();

  const fetchRepos = async () => {
    if (session?.user?.email) {
      const emailData: any = await fetchGitHubAccountByEmail(session?.user?.email);
      const userName = emailData?.items[0]?.login;
      const data = await fetchGitHubRepos('0x00raghu'); //userName || 0x00raghu
      setRepos(data);
    }
  };

  useEffect(() => {
    fetchRepos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.email]);

  return (
    <div className="mx-auto max-w-7xl sm:py-8 px-4 lg:px-8 ">
      <AuthButton />
      {repos && repos.length > 0 && <GithubProjects data={repos} />}
    </div>
  );
};

export default ListProject;
