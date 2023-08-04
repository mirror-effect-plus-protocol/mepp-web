/*
 * MEPP - A web application to guide patients and clinicians in the process of
 * facial palsy rehabilitation, with the help of the mirror effect and principles
 * of motor learning
 * Copyright (C) 2021 MEPP <info@mirroreffectplus.org>
 *
 * This file is part of MEPP.
 *
 * MEPP is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * MEPP is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with MEPP.  If not, see <http://www.gnu.org/licenses/>.
 */
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
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.tertiary};
  z-index: ${zindex.max};
`;

export { TemporaryProfilBanner };
