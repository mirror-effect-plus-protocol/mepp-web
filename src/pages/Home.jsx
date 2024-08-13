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
import styled from 'styled-components';

import { WrapperFull } from '@styles/tools/index';

import { theme } from '@themes/index';

import HomeLayout from '@layouts/Home';

import { FooterHome } from '@components/footer/FooterHome';
import { GridOneColumn } from '@components/grids/GridOneColumn';
import { GridTwoColumn } from '@components/grids/GridTwoColumn';
import { HeaderHome } from '@components/header/HeaderHome';

/**
 * HomePage with HomeLayout
 */
const HomePage = () => {
  return (
    <HomeLayout
      header={<HeaderHome />}
      content={
        <ContainerWrapper>
          <ContainerInner>
            <GridTwoColumn
              left={<div>GridTwoColumn-HOME:Left</div>}
              right={<div>GridTwoColumn-HOME:Right</div>}
            />
            <GridOneColumn
              content={<div>GridOneColumn-LOGOS:Aide financière + Logo</div>}
            />
            <GridTwoColumn
              left={<div>GridTwoColumn-DESCRIPTION:Left</div>}
              right={<div>GridTwoColumn-DESCRIPTION:Right</div>}
            />
            <GridTwoColumn
              left={<div>GridTwoColumn-HISTORY:Left</div>}
              right={<div>GridTwoColumn-HISTORY:Right</div>}
            />
            <GridTwoColumn
              left={<div>GridTwoColumn-PERSONS:Left</div>}
              right={<div>GridTwoColumn-PERSONS:Right</div>}
            />
            <GridTwoColumn
              left={<div>GridTwoColumn-DONATE:Left</div>}
              right={<div>GridTwoColumn-DONATE:Right</div>}
              background={theme.colors.bluelight}
            />
          </ContainerInner>
        </ContainerWrapper>
      }
      footer={<FooterHome />}
    />
  );
};

const ContainerWrapper = styled(WrapperFull)``;

const ContainerInner = styled.div``;

export default HomePage;
