import { fetchRepoMetaData } from '@/utils/github';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const APIURL = 'https://api.studio.thegraph.com/query/36992/crypto-lift-connect/version/latest';

const getProjectCreatedQuery = `
query GetProjectCreated {
  projectCreateds {
    gitUrl
    name
    owner
    usdcBalance
    transactionHash
    id
    ethBalance
    blockTimestamp
    blockNumber
  }
}
`;

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

export const getProjectCreated = async () => {
  try {
    const data = await client.query({
      query: gql(getProjectCreatedQuery),
    });
    const response = data.data.projectCreateds;
    console.log(response, 'response');

    // Use map with async function and await each fetchRepoMetaData call
    const newResponseMap = await Promise.all(
      response.map(async (_dataItem: any) => {
        const _githubMeta = await fetchRepoMetaData(_dataItem.gitUrl);
        return { ..._dataItem, _githubMeta };
      }),
    );

    console.log(newResponseMap, 'newResponseMap');
    return newResponseMap;
  } catch (error) {
    console.error('Error in getProjectCreated:', error);
    return null;
  }
};
