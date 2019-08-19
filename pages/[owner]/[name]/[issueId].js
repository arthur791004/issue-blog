import React from 'react';
import { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const QUERY_ISSUE = gql`
  query issue($issueId: ID!) {
    node(id: $issueId) {
      ... on Issue {
        bodyHTML
      }
    }
  }
`;

const BlogPage = () => {
  const router = useRouter();
  const { issueId } = router.query;
  const variables = { issueId };
  const { loading, error, data } = useQuery(QUERY_ISSUE, { variables });

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Oop...{error.toString()}</div>;
  }

  return <div dangerouslySetInnerHTML={{ __html: data.node.bodyHTML }} />; // eslint-disable-line react/no-danger
};

export default BlogPage;
