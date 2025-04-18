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
  const gui = useContext(GUIContext);
  const { exerciseStep, ready } = useContext(ExerciseContext);
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const deepAR = useRef(null);
  const deepARInit = useRef(false);
  const canvas = useRef(null);

  const updateEffectValues = (data) => {
    if (!deepAR.current) return;
    if (data) {
      const position = data.position;
      const rotation = data.rotation;
      const scale = data.scale;
      if (position) {
        // prettier-ignore
        deepAR.current.changeParameterVector('Root','','position', position.x, position.y, position.z);
      }
      if (rotation) {
        // prettier-ignore
        deepAR.current.changeParameterVector('Root', '', 'rotation', rotation.x, rotation.y, rotation.z);
      }
      if (scale) {
        // prettier-ignore
        deepAR.current.changeParameterVector('Root', '', 'scale', scale.x, scale.y, scale.z);
      }
    }
  };

  /**
   * Init Deep AR
   * doc: https://help.deepar.ai/en/articles/3545295-api-reference
   */
  useEffect(() => {
    if (!identity) return;
    if (!deepAR.current) {
      if (!deepARInit.current) {
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

          updateEffectValues(identity.mirror_settings);
          ready(true);
        };

        init();
      }
    }

    return () => {
      if (deepAR.current) {
        deepAR.current.stopCamera();
        deepAR.current.shutdown();
        deepAR.current = null;
      }
    };
  }, [identity]);

  /**
   * Resize browser event
   * Destroy DeepAR
   */
  useEffect(() => {
    let time = null;
    const onResize = () => {
      clearTimeout(time);
      time = setTimeout(() => {
        if (canvas.current) {
          canvas.current.width = window.innerWidth;
          canvas.current.height = window.innerHeight;
        }
      }, 300);
    };

    window.addEventListener('resize', onResize);

    const screen = window.matchMedia('(orientation: portrait)');
    screen.addEventListener('change', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      screen.removeEventListener('change', onResize);

      if (deepAR.current) {
        try {
          deepAR.current.stopCamera();
          deepAR.current.shutdown();
          deepAR.current = null;
          // eslint-disable-next-line no-empty
        } catch (e) {}
      }
    };
  }, []);

  /**
   * Ending
   * Destroy DeepAR
   */
  useEffect(() => {
    if (exerciseStep === ExerciseStep.ENDED && deepAR.current && !gui) {
      deepAR.current.stopCamera();
      deepAR.current.shutdown();
      deepAR.current = null;
    }
  }, [exerciseStep]);

  /**
   * Empty
   * Destroy DeepAR
   */
  useEffect(() => {
    if (exerciseStep === ExerciseStep.EMPTY && !gui) {
      // weird settimeout because DeepAR seems not to be fully initialized to this state
      // can't be destroy without this settimeout
      setTimeout(() => {
        if (deepAR.current) {
          deepAR.current.stopCamera();
          deepAR.current.shutdown();
          deepAR.current = null;
        }
      }, 2000);
    }
  }, [exerciseStep]);

  /**
   * GUI modifiers
   */
  useEffect(() => {
    if (deepAR.current && gui) {
      updateEffectValues(gui);
    }
  }, [gui]);

  if (identityLoading) return <></>;

  return (
    <Container>
      {exerciseStep !== ExerciseStep.ENDED && (
        <>
          <Canvas ref={canvas}></Canvas>
          <GradientTop
            hide={
              exerciseStep !== ExerciseStep.INITIATED &&
              exerciseStep !== ExerciseStep.COMPLETED &&
              exerciseStep !== ExerciseStep.ENDED &&
              exerciseStep !== ExerciseStep.EMPTY
            }
          />
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
    `background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.95) 90%)`};
`;

const GradientTop = styled(Gradient)`
  transition: opacity 0.5s ease;
  top: 0;
  opacity: 1;
  ${({ hide }) => hide && `opacity:0;`}
`;

const GradientBottom = styled(Gradient)`
  bottom: 0;
  transform: rotate(180deg);
`;

export default Player;
