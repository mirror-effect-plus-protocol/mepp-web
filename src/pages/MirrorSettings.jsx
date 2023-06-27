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

import { DisabledBodyScrollGlogalStyle } from '@styles/utils/DisabledBodyScroll';

import withAuth from '@hocs/withAuth';

import BasicLayout from '@layouts/Basic';

import ExerciseProvider from '@components/exercises/ExerciseProvider';
import Player from '@components/exercises/Player';
import GUIProvider from '@components/generics/GUI';

/**
 * Mirror Settings page with AR player with BasicLayout + GUI Effect modifiers
 */
const MirrorSettingsPage = () => {
  return (
    <ExerciseProvider>
      <DisabledBodyScrollGlogalStyle />
      <BasicLayout
        content={
          <ContainerWrapper>
            <ContainerInner>
              <GUIProvider>
                <Player />
              </GUIProvider>
            </ContainerInner>
          </ContainerWrapper>
        }
      />
    </ExerciseProvider>
  );
};

const ContainerWrapper = styled.div``;

const ContainerInner = styled.div``;

export default withAuth(MirrorSettingsPage);
