import styled, { css } from 'styled-components';

const growCSS = css`
  flex-grow: 1;
`;

const shrinkCSS = css`
  flex-shrink: 1;
`;

export const Col = styled.div`
  flex-shrink: 0;
  flex-basis: ${({ flexBasis = 'auto' }) => flexBasis};

  ${props => props.growable && growCSS};
  ${props => props.shrinkable && shrinkCSS};
`;
