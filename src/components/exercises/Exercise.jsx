import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

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
import { P } from '@components/generics/basics';
import { SpacerHorizontal } from '@components/generics/basics/Spacer';
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
        show={exerciseStep !== ExerciseStep.STARTED}
        opaque={exerciseStep === ExerciseStep.EMPTY}
      />
      <ExerciseWrapper>
        <ExerciseInner
          alignBottom={exerciseStep === ExerciseStep.STARTED}
          type={exerciseStep}
        >
          {exerciseReady ? (
            exerciseStep === ExerciseStep.INITIATED ||
            exerciseStep === ExerciseStep.STARTED ||
            exerciseStep === ExerciseStep.PAUSED ? (
              <CurrentExercise />
            ) : exerciseStep === ExerciseStep.WAITED ? (
              <WaitingExercise />
            ) : exerciseStep === ExerciseStep.COMPLETED ? (
              <CompletingExercise />
            ) : exerciseStep === ExerciseStep.EMPTY ? (
              <EmptyExercise />
            ) : (
              <EndingExercise />
            )
          ) : (
            (exerciseLoading || !exerciseReady) && <LoadingCircle />
          )}
        </ExerciseInner>
      </ExerciseWrapper>
    </Container>
  );
};

/**
 * Current Exercise (active exercise)
 */
const CurrentExercise = () => {
  const { t } = useTranslation();
  const { start, pause, skip, wait, exercise, exerciseStep } =
    useContext(ExerciseContext);
  const { locale } = useLocale();

  return (
    <>
      <TextExercise type={exerciseStep}>
        <TimerWrapper>
          <Timer
            value={exercise.durationTime}
            start={exerciseStep === ExerciseStep.STARTED}
            done={wait}
          />
        </TimerWrapper>

        <TextWrapper>
          <Progress>
            {t('exercise:name')}&nbsp;{exercise.number}
            &nbsp;/&nbsp;
            {exercise.length}
          </Progress>
          <Text>{exercise.text[locale]}</Text>
        </TextWrapper>

        <ButtonsWrapper>
          <Button.Outline label={t('cta:skip_exercise')} onClick={skip} />
          <SpacerHorizontal />
          {exerciseStep === ExerciseStep.INITIATED && (
            <Button.Default label={t('cta:start_exercise')} onClick={start} />
          )}
          {exerciseStep === ExerciseStep.PAUSED && (
            <Button.Default label={t('cta:restart_exercise')} onClick={start} />
          )}
          {exerciseStep === ExerciseStep.STARTED && (
            <Button.Outline label={t('cta:pause_exercise')} onClick={pause} />
          )}
        </ButtonsWrapper>
      </TextExercise>
    </>
  );
};

/**
 * Waiting Exercise (pause exercise)
 */
const WaitingExercise = () => {
  const { t } = useTranslation();
  const { exercise, exerciseStep, repeat } = useContext(ExerciseContext);

  return (
    <>
      <TextExercise type={exerciseStep}>
        <TimerWrapper>
          <Timer value={exercise.pauseTime} showvalue start done={repeat} />
        </TimerWrapper>

        <TextWrapper>
          <Progress>
            {t('exercise:name')}&nbsp;{exercise.number}
            &nbsp;/&nbsp;
            {exercise.length}
          </Progress>
          <Text>{t('exercise:rest')}</Text>
        </TextWrapper>
      </TextExercise>
    </>
  );
};

/**
 * Completing Exercice (complete exercise)
 */
const CompletingExercise = () => {
  const { t } = useTranslation();
  const { next, exercise, exerciseStep } = useContext(ExerciseContext);

  return (
    <>
      <TextExercise type={exerciseStep}>
        <TimerWrapper>
          <Timer showvalue={false} />
        </TimerWrapper>

        <TextWrapper>
          <Progress>
            {t('exercise:name')}&nbsp;{exercise.number}
            &nbsp;/&nbsp;
            {exercise.length}
          </Progress>
          <Text>{t('exercise:complete')}</Text>
        </TextWrapper>

        <ButtonsWrapper>
          <Button.Outline label={t('cta:next_exercise')} onClick={next} />
        </ButtonsWrapper>
      </TextExercise>
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

const Container = styled.div`
  position: absolute;
  top: 0;

  width: 100vw;
  height: 100vh;
`;

const Background = styled.div`
  position: absolute;
  top: 0;

  width: 100%;
  height: 100%;

  transition: background-color 0.5s linear;
  background-color: ${({ theme, show }) =>
    !show ? `${theme.colors.background}00` : `${theme.colors.background}f5`};
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
  max-width: 1200px;

  ${({ type }) =>
    type !== ExerciseStep.ENDED &&
    type !== ExerciseStep.EMPTY &&
    type !== ExerciseStep.WAITED &&
    `width: 100%;`}

  ${({ type }) =>
    (type === ExerciseStep.ENDED ||
      type === ExerciseStep.EMPTY ||
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

const TextExercise = styled(FlexDisplay.Component)`
  width: 100%;

  ${media.xsOnly`
    flex-wrap: wrap;
    ${({ type }) => type === ExerciseStep.WAITED && `flex-wrap: nowrap;`}
  `}
`;

const TimerWrapper = styled.div`
  width: 100px;
  height: 100px;
  align-self: center;

  ${media.xsOnly`
    width: 67px;
    height: 67px;
  `}
`;

const TextWrapper = styled.div`
  align-self: center;
  margin: 0 ${spacings.default * 2}px;

  ${media.xsOnly`
    margin: 0 0 0 20px;
    width: 70%;
  `}
`;

const TextCentredWrapper = styled(TextWrapper)`
  margin: 0 auto;

  ${media.xsOnly`
    width: 100%;
  `}
`;

const Progress = styled.h3`
  font-weight: 700;
  font-size: ${rem(14)};
  letter-spacing: ${rem(2)};
  text-transform: uppercase;

  margin: 0;
  margin-bottom: ${spacings.default}px;
`;

const Text = styled.p`
  font-weight: 700;
  font-size: ${rem(24)};
  max-width: 600px;

  ${media.xsOnly`
    font-size: ${rem(15)};
  `}
`;

const ButtonsWrapper = styled(FlexAlignCenter.Component)`
  align-self: center;
  margin: 0 0 0 auto;

  ${media.xsOnly`
    justify-content: flex-start;
    margin: 20px 0 0 0;
    width:100%;
  `}
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

export default Exercise;
