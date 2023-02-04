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
import { DeepAR } from 'deepar';
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { DisabledBodyScrollGlogalStyle } from '@styles/utils/DisabledBodyScroll';

import BasicLayout from '@layouts/Basic';

/**
 * Player Standalone page with BasicLayout
 */
const PlayerStandalonePage = () => {
  return (
    <>
      <DisabledBodyScrollGlogalStyle />
      <BasicLayout
        header={<></>}
        content={
          <ContainerWrapper>
            <ContainerInner>
              <Player />
            </ContainerInner>
          </ContainerWrapper>
        }
      />
    </>
  );
};

/**
 * Player Standalone
 */
const Player = () => {
  const deepAR = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;

    const AR = new DeepAR({
      licenseKey: process.env.DEEPAR_LICENSE_KEY,
      canvas: canvas.current,
      numberOfFaces: 1,
      deeparWasmPath: './assets/deepar/deepar.wasm',
      segmentationConfig: {
        modelPath: './assets/deepar/segmentation-160x160-opt.bin',
      },
      callbacks: {
        onInitialize: () => {
          AR.startVideo(true);
          AR.switchEffect(0, 'right', `./assets/deepar/effects/right`);
        },
      },
    });
    AR.downloadFaceTrackingModel('./assets/deepar/models-68-extreme.bin');
    deepAR.current = AR;
  }, [deepAR, canvas]);

  /**
   * Resize browser event
   * Destroy DeepAR
   */
  useEffect(() => {
    let time = null;
    const onResize = () => {
      clearTimeout(time);
      time = setTimeout(() => {
        canvas.current.width = window.innerWidth;
        canvas.current.height = window.innerHeight;
      }, 100);
    };

    window.addEventListener('resize', onResize);

    const screen = window.matchMedia('(orientation: portrait)');
    screen.addEventListener('change', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      screen.removeEventListener('change', onResize);

      if (deepAR.current) {
        try {
          deepAR.current.shutdown();
          deepAR.current = null;
          // eslint-disable-next-line no-empty
        } catch (e) {}
      }
    };
  }, [deepAR]);

  return (
    <Container>
      <Canvas ref={canvas}></Canvas>
    </Container>
  );
};

const ContainerWrapper = styled.div``;

const ContainerInner = styled.div``;

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100%;
  height: -moz-available;
  height: -webkit-fill-available;
  height: fill-available;
  height: stretch;
`;

const Canvas = styled.canvas``;

export default PlayerStandalonePage;
