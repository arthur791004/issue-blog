import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { ReactComponent as StarIcon } from '@/static/svg/star.svg';
import { cover, width } from '@/utils/styles';
import media from '@/utils/media';
import { Col } from '@/components/Flex';
import { Icon } from '@/components/Icons';

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

const Name = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: blue;
  margin-bottom: 5px;
`;

const Description = styled.div`
  font-size: 12px;
  color: gray;
`;

const Star = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 12px;
  color: gray;
`;

const Repository = styled.div`
  display: flex;
  position: relative;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;

  &:first-child {
    margin-top: 10px;
  }

  &:after {
    ${cover()};
    content: '';
    z-index: -1;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    opacity: 0;
    transition: opacity 0.15s ease-in-out;
    will-change: opacity;
  }

  &:hover:after {
    opacity: 1;
  }

  ${Col} + ${Col} {
    margin-left: 5px;
  }

  ${media.mobile`
    border-width: 0 0 1px 0;
  `}
`;

const Container = styled.div`
  ${width()};
  margin: 0 auto;
`;

const HomePage = () => {
  const { loading, error, data } = useQuery(QUERY_REPOSITORIES, { variables });

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Oop...{error.toString()}</div>;
  }

  return (
    <Container>
      {data.search.nodes.map(
        ({ id, nameWithOwner, description, stargazers }) => (
          <a key={id} href={`/${nameWithOwner}`}>
            <Repository>
              <Col flexBasis="75%">
                <Name>{nameWithOwner}</Name>
                <Description>{description}</Description>
              </Col>
              <Col growable>
                <Star>
                  <Icon size="16" color="gray">
                    <StarIcon />
                  </Icon>
                  <span>{stargazers.totalCount.toLocaleString()}</span>
                </Star>
              </Col>
            </Repository>
          </a>
        )
      )}
    </Container>
  );
};

export default HomePage;
