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
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import Circle from '@assets/graphics/circle.svg';

import { media } from '@styles/configs/breakpoints';
import { FlexAlignMiddle } from '@styles/tools/index';
import { VisibleHidden } from '@styles/utils/VisibleHidden';
import { rem } from '@styles/utils/rem';

import { ExerciseStep, ExerciseContext } from './ExerciseProvider';

const Timer = ({ value, showvalue, start, done, hidden }) => {
  const [time, setTime] = useState(value);
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const { exerciseStep } = useContext(ExerciseContext);

  const circumference = 53 * 2 * Math.PI; // 53 = radius from svg circle

  /**
   * Called when Ticker has done
   */
  const onDone = () => {
    setTime(0);
    setProgress(1);
    setStarted(false);
    setTimeout(() => {
      done && done();
    }, 100);
  };

  /**
   * Mounting Tick timer
   */
  useEffect(() => {
    if (!started || !time) return;

    const onTime = () => {
      const newtime = time - 1;
      const newprogress = 1 - (newtime - 1) / value;

      if (newtime <= 0) onDone();
      else {
        setTime(newtime);
        setProgress(newprogress);
      }
    };

    const timer = setTimeout(onTime, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [started, time]);

  /**
   * Mounting init / start
   */
  useEffect(() => {
    if (!start) {
      if (
        exerciseStep !== ExerciseStep.PAUSED &&
        exerciseStep !== ExerciseStep.STARTED
      ) {
        setProgress(0);
      }
      setStarted(false);
    } else {
      if (!progress) setProgress(1 / value);
      else if (
        exerciseStep !== ExerciseStep.PAUSED &&
        exerciseStep !== ExerciseStep.STARTED
      ) {
        setProgress(0);
      }
      setTimeout(() => {
        setStarted(true);
      }, 1);
    }
  }, [start, exerciseStep]);

  /**
   * Mounting new value timer
   */
  useEffect(() => {
    setTime(value);
    setProgress(0);
  }, [value]);

  return (
    <>
      {!hidden && (
        <Container>
          {!showvalue && <Center />}
          {showvalue && <Value>{time}</Value>}
          <Bar aria-hidden progress={progress ?? 0} circ={circumference} />
          <VisibleHidden as="div">
            <meter
              value={Math.floor((progress ?? 0) * 100)}
              min="0"
              max="100"
            />
          </VisibleHidden>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Center = styled.div`
  position: absolute;
  top: calc(50% - 7px);
  left: calc(50% - 7px);

  width: 14px;
  height: 14px;

  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;

  ${media.xsOnly`
    top: calc(50% - 4px);
    left: calc(50% - 4px);
    width: 8px;
    height: 8px;
  `}
`;

const Value = styled.h4`
  ${FlexAlignMiddle.CSS}

  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  font-weight: 700;
  font-size: ${rem(50)};

  color: ${({ theme }) => theme.colors.white};
`;

const Bar = styled(Circle)`
  height: 100%;

  .circle_svg__bg {
    stroke-width: 6px;
    stroke: #686868;
  }

  .circle_svg__progress {
    transition: 1s stroke-dashoffset linear;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    stroke-width: 6px;
    stroke: ${({ theme }) => theme.colors.primary};
    stroke-dasharray: ${({ circ }) => `${circ}px ${circ}px`};
    stroke-dashoffset: ${({ circ, progress }) => `${circ - progress * circ}px`};
  }
`;

export { Timer };
