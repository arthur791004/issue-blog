import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { width } from '@/utils/styles';

const QUERY_ISSUES = gql`
  query issues($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      issues(
        first: 10
        states: [OPEN]
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        nodes {
          ... on Issue {
            id
            title
            createdAt
          }
        }
      }
    }
  }
`;

const Created = styled.div`
  font-size: 12px;
  color: gray;
`;

const Container = styled.div`
  ${width()};
  margin: 0 auto;
`;

const RepositoryPage = () => {
  const router = useRouter();
  const { name, owner } = router.query;
  const variables = {
    name,
    owner,
  };
  const { loading, error, data } = useQuery(QUERY_ISSUES, { variables });

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Oop...{error.toString()}</div>;
  }

  return (
    <Container>
      {data.repository.issues.nodes.map(({ id, title, createdAt }) => (
        <a key={id} href={`/${owner}/${name}/${id}`}>
          <div>
            <h2>{title}</h2>
            <Created>{createdAt.split('T')[0]}</Created>
          </div>
        </a>
      ))}
    </Container>
  );
};

export default RepositoryPage;
