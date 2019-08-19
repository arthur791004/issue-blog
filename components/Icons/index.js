import styled from 'styled-components';

const DEFAULT_ICON_SIZE = 24;

export const Icon = styled.div`
  display: inline-flex;
  width: ${props => props.size}px;
  height: ${props => props.size}px;

  svg {
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    ${({ color }) => color && `fill: ${color};`}
  }
`;

Icon.defaultProps = {
  size: DEFAULT_ICON_SIZE,
  color: 'black',
};
