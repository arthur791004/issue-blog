import { css } from 'styled-components';
import { SIZES, SIZE_MIN_WIDTH } from '@/constants/sizes';
import media from '@/utils/media';

export const cover = ({ offset = 0 } = {}) => css`
  position: absolute;
  left: ${offset};
  right: ${offset};
  top: ${offset};
  bottom: ${offset};
`;

export const width = () => css`
  max-width: ${SIZE_MIN_WIDTH[SIZES.MEDIUM]}px;

  ${media.mobile`
    max-width: 100%;
  `}
`;
