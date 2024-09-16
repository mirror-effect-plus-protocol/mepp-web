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
import * as deepar from 'deepar';
import React, { useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { DisabledBodyScrollGlogalStyle } from '@styles/utils/DisabledBodyScroll';

import BasicLayout from '@layouts/Basic';

import GUIProvider, { GUIContext } from '@components/generics/GUI';

/**
 * Player Standalone page with BasicLayout
 */
const MirrorEffectStandalonePage = () => {
  return (
    <>
      <DisabledBodyScrollGlogalStyle />
      <BasicLayout
        header={<></>}
        content={
          <ContainerWrapper>
            <ContainerInner>
              <GUIProvider withoutProfilButtons>
                <Player />
              </GUIProvider>
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
  const deepARInit = useRef(false);
  const deepAR = useRef(null);
  const canvas = useRef(null);
  const video = useRef(null);
  const gui = useContext(GUIContext);

  /**
   * Init DeepAR
   */
  useEffect(() => {
    if (deepAR.current) return;
    if (deepARInit.current) return;

    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;
    let AR;
    const init = async () => {
      deepARInit.current = true;
      AR = await deepar.initialize({
        licenseKey: process.env.DEEPAR_LICENSE_KEY,
        canvas: canvas.current,
        effect: './assets/effects/right',
      });
      deepAR.current = AR;
      AR.setVideoElement(video.current, false);
    };
    init();

    return () => {
      AR && AR.shutdown();
    };
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

  /**
   * GUI modifiers
   */
  useEffect(() => {
    if (deepAR.current) {
      deepAR.current.changeParameterVector(
        'Root',
        '',
        'rotation',
        gui.rotation.x,
        gui.rotation.y,
        gui.rotation.z,
      );

      deepAR.current.changeParameterVector(
        'Root',
        '',
        'position',
        gui.position.x,
        gui.position.y,
        gui.position.z,
      );

      deepAR.current.changeParameterVector(
        'Root',
        '',
        'scale',
        gui.scale.x,
        gui.scale.y,
        gui.scale.z,
      );
    }
  }, [deepAR, gui]);

  useEffect(() => {
    async function record() {
      if (deepAR.current && gui.exportVideo) {
        await deepAR.current.startVideoRecording();
      }
      if (deepAR.current && !gui.exportVideo) {
        try {
          const video = await deepAR.current.finishVideoRecording();
          var a = document.createElement('a');
          document.body.appendChild(a);
          a.style = 'display: none';
          var url = window.URL.createObjectURL(video);
          a.href = url;
          a.download = 'export.mp4';
          a.click();
          window.URL.revokeObjectURL(url);
        } catch (e) {
          console.log('no record');
        }
      }
    }
    record();
  }, [deepAR, gui]); // Or [] if effect doesn't need props or state

  return (
    <Container>
      <Video ref={video} autoPlay loop src="/assets/mirror-effect-export.mp4" />
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

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 100%;
`;

export default React.memo(MirrorEffectStandalonePage);
