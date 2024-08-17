import React from 'react';
import styled from 'styled-components';

import { media } from '@styles/configs/breakpoints';
import { spacings } from '@styles/configs/spacings';

const ImageRounded = ({ src }) => {
  return <Image src={src} />;
};

const Image = styled.div`
  border-radius: ${spacings.default * 1.5}px 0 0 ${spacings.default * 1.5}px;
  background-image: ${({ src }) => `url('${src}')`};
  background-size: cover;
  background-position: center center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: 500px;

  ${media.xsOnly`
    border-radius: ${spacings.default}px;
    min-height: 400px;
  `}

  ${media.smOnly`
    border-radius: ${spacings.default}px;
    min-height: 400px;
  `}
`;

export default ImageRounded;
