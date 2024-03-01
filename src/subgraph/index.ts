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
  const data = await client.query({
    query: gql(getProjectCreatedQuery),
  });
  return data?.data?.projectCreateds;
};
