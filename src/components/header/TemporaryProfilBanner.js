import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { zindex } from '@styles/configs/zindex';
import { FlexAlignCenter } from '@styles/tools';
import { rem } from '@styles/utils/rem';

/**
 * Header with Logo and login navigation
 */
const TemporaryProfilBanner = () => {
  const { t } = useTranslation();
  return <Container>{t('temporaryProfile:label')}</Container>;
};

const Container = styled(FlexAlignCenter.Component)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 5px;
  font-size: ${rem(12)};
  background-color: ${({ theme }) => theme.colors.tertiary};
  z-index: ${zindex.max};
`;

export { TemporaryProfilBanner };
