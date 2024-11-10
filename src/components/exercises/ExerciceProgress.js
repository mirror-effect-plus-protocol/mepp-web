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
import styled, { keyframes } from 'styled-components';

import { ExerciseContext } from './ExerciseProvider';

/**
 * Exercise Progress Bars
 */
const ExerciseProgress = () => {
  const { exercise, exerciseRepeat } = useContext(ExerciseContext);

  const progessBars = () => {
    const items = [];
    for (let i = 0; i < exercise.repeatTime; i++) {
      let progress = 1;
      let active = false;
      if (i >= exerciseRepeat) progress = 0;
      if (i === exerciseRepeat) active = true;
      items.push(
        <ProgressBarWrapper key={i}>
          <ProgressBar
            progress={progress * 100}
            active={active}
            time={exercise.durationTime}
          />
          <ProgressBarBackground />
        </ProgressBarWrapper>,
      );
    }
    return items;
  };

  return <ProgressBarsWrapper>{progessBars()}</ProgressBarsWrapper>;
};

const ProgressBarsWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 18px;
`;

const ProgressBarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ProgressBar = styled.div`
  position: absolute;
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  animation-name: ${keyframes`
    0% {
      width: 0%;
    }
    100% {
      width: calc(100% - 2px);
    }
  `};
  ${({ active }) => active && `animation-fill-mode: forwards;`}
  ${({ active }) => active && `animation-timing-function: linear;`}
  ${({ active, time }) => active && time && `animation-duration: ${time}s;`}
  ${({ progress }) => progress && `width: calc(${progress}% - 2px);`};
  z-index: 1;
`;

const ProgressBarBackground = styled.div`
  width: calc(100% - 2px);
  height: 100%;
  opacity: 0.3;
  background: ${({ theme }) => theme.colors.white};
`;

export default ExerciseProgress;
