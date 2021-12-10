import React, { useRef, useEffect, useContext } from 'react';
import { useGetIdentity } from 'react-admin';
import styled from 'styled-components';

import { ExerciseStep, ExerciseContext } from './ExerciseProvider';

/**
 * DeepAP.ai player
 */
const Player = () => {
  const { exercise, exerciseStep, ready } = useContext(ExerciseContext);
  const { identity, loading: identityLoading } = useGetIdentity();
  const deepAR = useRef(null);
  const canvas = useRef(null);

  /**
   * Init Deep AR
   * doc: https://help.deepar.ai/en/articles/3545295-api-reference
   */
  useEffect(() => {
    if (!identity) return;
    if (deepAR.current) return;

    const side = identity.side === 0 ? 'left' : 'right';

    const AR = DeepAR({
      licenseKey: process.env.DEEPAR_LICENSE_KEY,
      canvas: canvas.current,
      canvasWidth: window.innerWidth,
      canvasHeight: window.outerHeight,
      numberOfFaces: 1,
      libPath: './assets/deepar/',
      segmentationInfoZip: 'segmentation.zip',
      onInitialize: () => {
        AR.startVideo(true);
        AR.switchEffect(0, side, `./assets/deepar/effects/${side}`);
      },
      onVideoStarted: () => ready(true),
    });
    AR.downloadFaceTrackingModel('./assets/deepar/models-68-extreme.bin');
    deepAR.current = AR;
  }, [deepAR, canvas, identity, exercise]);

  /**
   * Resize browser event
   * Destroy DeepAR
   */
  useEffect(() => {
    const onResize = () => {
      if (deepAR.current) {
        deepAR.current.setCanvasSize(window.innerWidth, window.outerHeight);
      }
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);

      if (deepAR.current) {
        deepAR.current.shutdown();
        deepAR.current = null;
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
  height: 100vh;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

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
