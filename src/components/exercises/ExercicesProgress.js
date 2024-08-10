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

import { ExerciseContext } from './ExerciseProvider';

/**
 * Exercises Progress Bars
 */
const ExercisesProgress = () => {
  const { exercise, exerciseRepeat } = useContext(ExerciseContext);
  console.log(exerciseRepeat);
  const progessBars = () => {
    const items = [];
    for (let i = 0; i <= exercise.repeatTime; i++) {
      let initProgress = 1;
      let activeProgress = false;
      if (i >= exerciseRepeat) initProgress = 0;
      if (i === exerciseRepeat) activeProgress = true;

      items.push(
        <ProgressBarWrapper key={i}>
          <ProgressBarShape
            initProgress={initProgress}
            initTime={exercise.durationTime}
            activeProgress={activeProgress}
          />
          <ProgressBarBackground />
        </ProgressBarWrapper>,
      );
    }
    return items;
  };

  return <ProgressBarsWrapper>{progessBars()}</ProgressBarsWrapper>;
};

const ProgressBarShape = ({ initProgress, initTime, activeProgress }) => {
  const [time, setTime] = useState(initTime);
  const [progress, setProgress] = useState(initProgress);

  useEffect(() => {
    if (!activeProgress) return;

    const onTime = () => {
      const newtime = time - 1;
      const newprogress = 1 - (newtime - 1) / initTime;

      if (newtime <= 0) console.log('done');
      else {
        setTime(newtime);
        setProgress(newprogress);
      }
    };

    const timer = setTimeout(onTime, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [time]);

  return <ProgressBar progress={progress} />;
};

const ProgressBarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ProgressBarsWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 18px;
`;

const ProgressBar = styled.div`
  position: absolute;
  ${({ progress }) => `width: ${progress * 100}%;`}
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  transition: width 1s linear;
  z-index: 1;
`;

const ProgressBarBackground = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.grey};
`;

export default ExercisesProgress;
