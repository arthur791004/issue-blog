import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const QUERY_REPOSITORIES = gql`
  query repositories($type: SearchType!, $query: String!, $first: Int) {
    search(type: $type, query: $query, first: $first) {
      nodes {
        ... on Repository {
          id
          nameWithOwner
          description
          updatedAt
          url
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`;

const variables = {
  type: 'REPOSITORY',
  query: 'blog',
  first: 10,
};

const Home = () => {
  const { loading, error, data } = useQuery(QUERY_REPOSITORIES, { variables });

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Oop...{error.toString()}</div>;
  }

  return (
    <div>
      {data.search.nodes.map(
        ({ id, nameWithOwner, description, updatedAt, url }) => (
          <div key={id}>
            <div>{nameWithOwner}</div>
            <div>{description}</div>
            <div>{updatedAt}</div>
            <div>{url}</div>
          </div>
        )
      )}
    </div>
  );
};

export default Home;
