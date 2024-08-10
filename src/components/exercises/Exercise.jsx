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
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import IconThumbup from '@assets/icons/thumbup.svg';

import { media } from '@styles/configs/breakpoints';
import { spacings } from '@styles/configs/spacings';
import {
  FlexAlignCenter,
  FlexAlignMiddle,
  FlexDisplay,
} from '@styles/tools/index';
import { rem } from '@styles/utils/rem';

import { useLocale } from '@hooks/locale/useLocale';

import { LoadingCircle } from '@components/generics/LoadingCircle';
import { P, H2 } from '@components/generics/basics';
import {
  SpacerHorizontal,
  SpacerVertical,
} from '@components/generics/basics/Spacer';
import Button from '@components/generics/buttons/Button';

import { ExerciseStep, ExerciseContext } from './ExerciseProvider';
import { Timer } from './Timer';

/**
 * Exercise steps
 */
const Exercise = () => {
  const { exerciseStep, exerciseLoading, exerciseReady } =
    useContext(ExerciseContext);

  return (
    <Container>
      <Background
        show={
          exerciseStep !== ExerciseStep.STARTED &&
          exerciseStep !== ExerciseStep.INITIATED
        }
        opaque={exerciseStep === ExerciseStep.EMPTY}
      />
      <ExerciseWrapper>
        <ExerciseInner
          alignBottom={
            exerciseStep === ExerciseStep.STARTED ||
            exerciseStep === ExerciseStep.INITIATED
          }
          type={exerciseStep}
        >
          {exerciseReady &&
            (exerciseStep === ExerciseStep.INITIATED ? (
              <InitExercise />
            ) : exerciseStep === ExerciseStep.STARTED ? (
              <StartExercise />
            ) : exerciseStep === ExerciseStep.TIMER ? (
              <TimerExercise />
            ) : exerciseStep === ExerciseStep.PAUSED ? (
              <PauseExercise />
            ) : exerciseStep === ExerciseStep.WAITED ? (
              <WaitingExercise />
            ) : exerciseStep === ExerciseStep.COMPLETED ? (
              <CompletingExercise />
            ) : exerciseStep === ExerciseStep.EMPTY ? (
              <EmptyExercise />
            ) : (
              <EndingExercise />
            ))}
        </ExerciseInner>
        {(exerciseLoading || !exerciseReady) && <LoadingCircle />}
      </ExerciseWrapper>
    </Container>
  );
};

/**
 * Init Exercise (first exercise)
 */
const InitExercise = () => {
  const { t } = useTranslation();
  const { start, skip, exercise, exerciseStep } = useContext(ExerciseContext);
  const { locale } = useLocale();

  const video = exercise.videoUrl && (
    <Video src={exercise.videoUrl} cognitive={exercise.cognitive} />
  );

  const text = (
    <Text type={exerciseStep} cognitive={exercise.cognitive}>
      {exercise.text[locale]}
    </Text>
  );

  const progress = (
    <Progress cognitive={exercise.cognitive}>
      {t('exercise:name')}&nbsp;{exercise.number}
      &nbsp;/&nbsp;
      {exercise.length}
    </Progress>
  );

  const buttons = (
    <ButtonsWrapper type={exerciseStep} cognitive={exercise.cognitive}>
      <Button.Outline label={t('cta:skip_exercise')} onClick={skip} />
      <SpacerHorizontal />
      <Button.Default label={t('cta:start_exercise')} onClick={start} />
    </ButtonsWrapper>
  );

  return (
    <>
      {exercise.cognitive && exercise.videoUrl ? (
        <TextExercise type={exerciseStep}>
          {video}
          <InitExerciseWrapper cognitive={exercise.cognitive}>
            {progress}
            {buttons}
          </InitExerciseWrapper>
        </TextExercise>
      ) : (
        <>
          <TextExercise type={exerciseStep}>
            {video}
            <InitExerciseWrapper cognitive={exercise.cognitive}>
              <TextWrapper type={exerciseStep} cognitive={exercise.cognitive}>
                {progress}
                {text}
              </TextWrapper>
              {buttons}
            </InitExerciseWrapper>
          </TextExercise>
        </>
      )}
    </>
  );
};

/**
 * Timer at the beginning
 */
const TimerExercise = () => {
  const { start } = useContext(ExerciseContext);

  return (
    <TimerWrapper>
      <Timer value={5} showvalue start done={start} />
    </TimerWrapper>
  );
};

/**
 * Start Exercise
 */
const StartExercise = () => {
  const { t } = useTranslation();
  const { pause, skip, wait, exercise, exerciseStep } =
    useContext(ExerciseContext);

  return (
    <>
      <TextExercise type={exerciseStep}>
        <Timer
          value={exercise.durationTime}
          start={exerciseStep === ExerciseStep.STARTED}
          done={wait}
          hidden
        />

        <ButtonsWrapper type={exerciseStep}>
          <Button.Outline label={t('cta:skip_exercise')} onClick={skip} />
          <SpacerHorizontal />
          <Button.Default label={t('cta:pause_exercise')} onClick={pause} />
        </ButtonsWrapper>
      </TextExercise>

      <ProgressBars />
    </>
  );
};

/**
 * Pause Exercise
 */
const PauseExercise = () => {
  const { t } = useTranslation();
  const { start } = useContext(ExerciseContext);

  return (
    <TextCentredWrapper>
      <Title>{t('exercise:pause')}</Title>
      <PauseMessage>{t('exercise:pauseMessage')}</PauseMessage>
      <Button.Default label={t('cta:restart_exercise')} onClick={start} />
    </TextCentredWrapper>
  );
};

/**
 * Waiting Exercise (rest step)
 */
const WaitingExercise = () => {
  const { t } = useTranslation();
  const { exercise, exerciseStep, repeat } = useContext(ExerciseContext);

  return (
    <>
      <TextExercise type={exerciseStep}>
        <TextWrapper>
          <Progress>
            {t('exercise:name')}&nbsp;{exercise.number}
            &nbsp;/&nbsp;
            {exercise.length}
          </Progress>
          <Title>{t('exercise:rest')}</Title>
        </TextWrapper>
      </TextExercise>
      <TimerWrapper>
        <Timer value={exercise.pauseTime} showvalue start done={repeat} />
      </TimerWrapper>
    </>
  );
};

/**
 * Completing Exercice (complete exercise)
 */
const CompletingExercise = () => {
  const { t } = useTranslation();
  const { next, exercise } = useContext(ExerciseContext);

  return (
    <>
      <TextCentredWrapper>
        <Thumbup></Thumbup>
        <SpacerVertical size={`${spacings.default}px`}></SpacerVertical>
        <Progress>
          {t('exercise:name')}&nbsp;{exercise.number}
          &nbsp;/&nbsp;
          {exercise.length}
        </Progress>
        <Title>{t('exercise:complete')}</Title>
        <Button.Outline label={t('cta:next_exercise')} onClick={next} />
      </TextCentredWrapper>
    </>
  );
};

/**
 * Done Exercice (ending)
 */
const EndingExercise = () => {
  const { t } = useTranslation();
  const { restart } = useContext(ExerciseContext);

  // click handler
  const handleClick = () => restart();

  return (
    <TextCentredWrapper>
      <EndingMessage xlarge>{t('exercise:end')}</EndingMessage>
      <ButtonExit label={t('cta:restart')} onClick={handleClick} />
    </TextCentredWrapper>
  );
};

/**
 * Empty Exercice (empty)
 */
const EmptyExercise = () => {
  const { t } = useTranslation();

  return (
    <TextCentredWrapper>
      <EndingMessage xlarge>{t('exercise:empty')}</EndingMessage>
    </TextCentredWrapper>
  );
};

const Video = ({ src, cognitive }) => {
  return (
    <VideoWrapper cognitive={cognitive}>
      <VideoInner>
        <video autoPlay muted loop>
          <source src={src} type="video/mp4" />
        </video>
      </VideoInner>
    </VideoWrapper>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100%;
`;

const Background = styled.div`
  position: absolute;
  top: 0;

  width: 100%;
  height: 100%;

  transition: background-color 0.5s linear;
  background-color: ${({ theme, show }) =>
    !show ? `${theme.colors.background}00` : `${theme.colors.background}cc`};
  ${({ theme, opaque }) =>
    opaque && `background-color: ${theme.colors.background}`};

  z-index: 0;
`;

const ExerciseWrapper = styled(FlexAlignMiddle.Component)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const ExerciseInner = styled(FlexDisplay.Component)`
  flex-wrap: wrap;

  position: relative;
  box-sizing: border-box;
  padding: 0 ${spacings.default * 2}px;

  ${({ type }) =>
    type !== ExerciseStep.ENDED &&
    type !== ExerciseStep.EMPTY &&
    type !== ExerciseStep.TIMER &&
    type !== ExerciseStep.WAITED &&
    `width: 100%;`}

  ${({ type }) =>
    (type === ExerciseStep.ENDED ||
      type === ExerciseStep.EMPTY ||
      type === ExerciseStep.TIMER ||
      type === ExerciseStep.WAITED) &&
    `justify-content: center;`}

  ${({ alignBottom }) =>
    alignBottom
      ? `position: absolute;
      bottom:${spacings.default * 1.5}px;`
      : ``}

  ${media.xsOnly`
    padding: 0 ${spacings.default}px;
  `}
`;

const InitExerciseWrapper = styled(FlexDisplay.Component)`
  ${({ cognitive }) => cognitive && `justify-content: flex-end;`}
  ${({ cognitive }) => cognitive && `align-items: center;`}
    ${media.xsToMd`
    display: block ;
  `};
`;

const VideoWrapper = styled(FlexDisplay.Component)`
  margin: 0 0 ${spacings.default}px 0;
  ${({ cognitive }) => cognitive && `margin: 0 0 0 0;`}
  ${({ cognitive }) => cognitive && `position: absolute;`}
  ${({ cognitive }) => cognitive && `bottom: 0;`}

  ${media.xsToMd`
    margin: 0 ${spacings.default}px 0 0;
    ${({ cognitive }) => cognitive && `position: relative;`}
  `}
  ${media.xxsOnly`
    margin: 0 0 ${spacings.default}px 0;
    ${({ cognitive }) => cognitive && `position: relative;`}
  `}
`;

const VideoInner = styled(FlexDisplay.Component)`
  width: 360px;
  height: 360px;
  min-width: 360px;
  background: ${({ theme }) => theme.colors.tertiary};
  border-radius: 50%;
  overflow: hidden;

  ${media.xsToMd`
    width: 180px;
    height: 180px;
    min-width: 180px;
  `}

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TextExercise = styled('div')`
  width: 100%;
  ${({ type }) => type === ExerciseStep.WAITED && `text-align: center;`}

  ${media.xsToMd`
    display: flex ;
    ${({ type }) => type === ExerciseStep.WAITED && `flex-wrap: nowrap;`}
    ${({ type }) => type === ExerciseStep.STARTED && `justify-content: center;`}
  `}
  ${media.xxsOnly`
    display: block ;
  `}
`;

const TimerWrapper = styled(FlexDisplay.Component)`
  width: 180px;
  height: 180px;
  align-self: center;
  justify-content: center;
`;

const TextWrapper = styled.div`
  width: 100%;

  ${({ type, cognitive }) =>
    type === ExerciseStep.INITIATED && !cognitive && `max-width: 700px;`}

  ${media.xsOnly``}
`;

const TextCentredWrapper = styled(TextWrapper)`
  flex-wrap: wrap;
  text-align: center;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  max-width: 650px;

  ${media.xsOnly`
    width: 100%;
  `}
`;

const Title = styled(H2)`
  width: 100%;
`;

const Text = styled.p`
  font-weight: 700;
  font-size: ${rem(24)};

  ${media.xsOnly`
    font-size: ${rem(15)};
  `}

  ${({ type }) =>
    type === ExerciseStep.INITIATED && `margin-top: ${spacings.default}px;`}
`;

const Progress = styled.h3`
  font-weight: 700;
  font-size: ${rem(14)};
  letter-spacing: ${rem(2)};
  text-transform: uppercase;

  margin: 0;
`;

const ProgressBars = styled.div`
  width: 100%;
  height: 30px;
  background: ${({ theme }) => theme.colors.primary};
`;

const ButtonsWrapper = styled(FlexAlignCenter.Component)`
  align-self: end;
  margin: 0 0 0 auto;
  ${({ cognitive }) => cognitive && `margin: 0 0 0 ${spacings.default}px;`}

  ${({ type }) =>
    type === ExerciseStep.STARTED && `margin: 0 0 ${spacings.default}px 0;`}
  ${media.xsToMd`
  margin: 0 0 ${spacings.default}px 0;

  ${({ type }) =>
    type === ExerciseStep.INITIATED && `margin: ${spacings.default}px 0 0 0;`}
  ${({ type }) =>
    type === ExerciseStep.INITIATED && `justify-content:flex-start;`}
  `};
`;

const PauseMessage = styled(P)`
  width: 100%;
  text-align: center;
  font-weight: 400;

  margin: auto auto ${spacings.default * 2}px;
`;

const EndingMessage = styled(P)`
  text-align: center;
  font-weight: 400;

  margin: auto auto ${spacings.default * 2}px;
  max-width: 650px;
`;

const ButtonExit = styled(Button.Default)`
  margin: 0 auto;
`;

const Thumbup = styled(IconThumbup)`
  width: 136px;
  height: 136px;
`;

export default Exercise;
