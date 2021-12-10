import React from 'react';
import styled from 'styled-components';

import { DisabledBodyScrollGlogalStyle } from '@styles/utils/DisabledBodyScroll';

import withAuth from '@hocs/withAuth';

import { useTrackingView } from '@hooks/useTrackingView';

import BasicLayout from '@layouts/Basic';

import Exercises from '@components/exercises/Exercise';
import ExerciseProvider from '@components/exercises/ExerciseProvider';
import Player from '@components/exercises/Player';
import { Header } from '@components/header/Header';

/**
 * Mirror page with AR player with BasicLayout
 */
const MirrorPage = () => {
  useTrackingView('/mirror');

  return (
    <ExerciseProvider>
      <DisabledBodyScrollGlogalStyle />
      <BasicLayout
        header={<Header isLogged />}
        content={
          <ContainerWrapper>
            <ContainerInner>
              <Player />
              <Exercises />
            </ContainerInner>
          </ContainerWrapper>
        }
      />
    </ExerciseProvider>
  );
};

const ContainerWrapper = styled.div``;

const ContainerInner = styled.div``;

export default withAuth(MirrorPage);
