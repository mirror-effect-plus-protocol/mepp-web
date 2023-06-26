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
import { useGetIdentity } from 'react-admin';
import styled from 'styled-components';

import { GUIContext } from '@components/generics/GUI';

import { ExerciseStep, ExerciseContext } from './ExerciseProvider';

/**
 * DeepAP.ai player
 */
const Player = () => {
  const { exercise, exerciseStep, ready } = useContext(ExerciseContext);
  const gui = useContext(GUIContext);
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const deepAR = useRef(null);
  const deepARInit = useRef(false);
  const canvas = useRef(null);

  /**
   * Init Deep AR
   * doc: https://help.deepar.ai/en/articles/3545295-api-reference
   */
  useEffect(() => {
    if (!identity) return;
    if (deepAR.current) return;
    if (deepARInit.current) return;

    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;

    const side = identity.side === 0 ? 'left' : 'right';

    let AR;
    const init = async () => {
      deepARInit.current = true;
      AR = await deepar.initialize({
        licenseKey: process.env.DEEPAR_LICENSE_KEY,
        canvas: canvas.current,
        effect: `./assets/effects/${side}`,
      });
      deepAR.current = AR;
      ready(true);
    };
    init();

    return () => {
      AR && AR.shutdown();
    };
  }, [deepAR, canvas, identity, exercise]);

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
   * Ending
   * Destroy DeepAR
   */
  useEffect(() => {
    if (exerciseStep === ExerciseStep.ENDED && deepAR.current) {
      deepAR.current.shutdown();
      deepAR.current = null;
    }
  }, [deepAR, exerciseStep]);

  /**
   * Empty
   * Destroy DeepAR
   */
  useEffect(() => {
    if (exerciseStep === ExerciseStep.EMPTY) {
      // weird settimeout because DeepAR seems not to be fully initialized to this state
      // can't be destroy without this settimeout
      setTimeout(() => {
        if (deepAR.current) {
          deepAR.current.shutdown();
          deepAR.current = null;
        }
      }, 2000);
    }
  }, [deepAR, exerciseStep]);

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

  if (identityLoading) return <></>;

  return (
    <Container>
      {exerciseStep !== ExerciseStep.ENDED && (
        <>
          <Canvas ref={canvas}></Canvas>
          <GradientTop />
          <GradientBottom />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100%;
`;

const Canvas = styled.canvas``;

const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 300px;
  opacity: 0.9;

  ${({ theme }) =>
    theme &&
    `background: linear-gradient(0deg, ${theme.colors.black}00, ${theme.colors.black})`};
`;

const GradientTop = styled(Gradient)`
  top: 0;
`;

const GradientBottom = styled(Gradient)`
  bottom: 0;
  transform: rotate(180deg);
`;

export default Player;
