import { Button, Code } from '@chakra-ui/react';
import React from 'react';

const statuses: any = {
  Complete: 'text-green-700 bg-green-50 ring-green-600/20',
  'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const GithubProjects = ({ data }: any) => {
  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100">
        {data &&
          data.map((project: any) => (
            <li key={project.id} className="flex items-center justify-between gap-x-6 py-5">
              <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{project.name}</p>
                  <p
                    className={classNames(
                      statuses[project.visibility],
                      'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                    )}
                  >
                    {project.visibility}
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  <p className="whitespace-nowrap">Forks {project.forks}</p>
                  <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p className="whitespace-nowrap">Stars {project.stargazers_count}</p>
                  <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p className="truncate">
                    Created by <Code>{project.owner.login}</Code>
                  </p>
                </div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <Button backgroundColor={'black'} color={'white'}>
                  Select
                </Button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default GithubProjects;