import React from 'react';
import styled from 'styled-components';

import { media } from '@styles/configs/breakpoints';

const ImageRounded = ({ src }) => {
  return <Image src={src} />;
};

const Image = styled.div`
  border-radius: 32px 0 0 32px;
  background-image: ${({ src }) => `url('${src}')`};
  background-size: cover;
  background-position: center center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: 500px;

  ${media.xsOnly`
    border-radius: 32px;
  `}

  ${media.smOnly`
    border-radius: 32px;
  `}
`;

export default ImageRounded;
