import { config } from '@/constants/config';
import { getProjectFundInUSD } from '@/context/_aa/ContractFunctions';
import { fetchRepoMetaData } from '@/utils/github';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const getProjectCreated = async (chain: number) => {
  try {
    const APIURL = config.graphUrl(chain);

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

    const data = await client.query({
      query: gql(getProjectCreatedQuery),
    });

    const response = data.data.projectCreateds;

    const newResponseMap = await Promise.all(
      response.map(async (_dataItem: any, i: any) => {
        const _githubMeta = await fetchRepoMetaData(_dataItem.gitUrl);
        const livePrices = await getProjectFundInUSD(i, chain);
        return { ..._dataItem, _githubMeta, livePrices };
      }),
    );

    return newResponseMap;
  } catch (error) {
    console.error('Error in getProjectCreated:', error);
    return null;
  }
};
