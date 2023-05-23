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

import React, { createContext, useEffect, useState } from 'react';

import { useApi } from '@hooks/useApi';

import { RequestEndpoint, RequestMethod } from '@utils/constants';
import { fetchData } from '@utils/fetch';
import { log } from '@utils/log';

/**
 * EXERCISE STEP TYPE
 */
const ExerciseStep = {
  'INITIATED': 'INIT',
  'STARTED': 'START',
  'PAUSED': 'PAUSE',
  'SKIPPED': 'SKIP',
  'RESUMED': 'RESUME',
  'WAITED': 'WAIT',
  'COMPLETED': 'DONE',
  'ENDED': 'END',
  'EMPTY': 'EMPTY',
};

/**
 * EXERCISE CONTEXT
 */
const ExerciseContext = createContext({
  ready: () => {},
  start: () => {},
  pause: () => {},
  skip: () => {},
  wait: () => {},
  repeat: () => {},
  complete: () => {},
  next: () => {},
  restart: () => {},
  exercise: null,
  exerciseStep: ExerciseStep.INITIATED,
  exerciseLoading: true,
  exerciseReady: false,
});

/**
 * EXERCISE PROVIDER
 */
const ExerciseProvider = ({ children }) => {
  const [exercise, setExercise] = useState({
    index: 0,
    number: 1,
    next: 1,
    length: 0,
    durationTime: null,
    pauseTime: null,
    repeatTime: null,
    text: null,
  });
  const [exerciseCurrent, setExerciseCurrent] = useState(0);
  const [exerciseStep, setExerciseStep] = useState(ExerciseStep.INITIATED);
  const [exerciseRepeat, setExerciseRepeat] = useState(0);
  const [exerciseReady, setReady] = useState(false);
  const {
    data: exercisesData,
    loading: exerciseLoading,
    get,
  } = useApi(RequestEndpoint.SESSION);

  /**
   * Log Step  - API call
   */
  const logs = (type) => {
    if (!exercisesData) return;
    if (!exercisesData.id) return;

    const path = RequestEndpoint.LOGS.replace('{uid}', exercisesData.id);
    const payload = {
      'action': type,
    };
    const typesWithoutExercises = [
      'START_SESSION',
      'START_SESSIONS',
      'LOGIN',
      'LOGOUT',
    ];
    // include exercise index only when `type` is related to exercises
    if (!typesWithoutExercises.includes(type)) {
      payload['exercise_index'] = exerciseCurrent;
    }

    fetchData(path, payload, RequestMethod.POST);
  };

  /**
   * Action Ready
   */
  const ready = (state) => setReady(state);

  /**
   * Action Start
   */
  const start = () => {
    if (exerciseStep === ExerciseStep.INITIATED) logs(ExerciseStep.STARTED);
    else logs(ExerciseStep.RESUMED);
    setExerciseStep(ExerciseStep.STARTED);
  };

  /**
   * Action Pause
   */
  const pause = () => {
    if (exerciseStep === ExerciseStep.PAUSED) return;
    logs(ExerciseStep.PAUSED);
    setExerciseStep(ExerciseStep.PAUSED);
  };

  /**
   * Action Skip
   */
  const skip = () => {
    logs(ExerciseStep.SKIPPED);
    next();
  };

  /**
   * Action Wait
   */
  const wait = () => {
    if (!exercise) return;
    if (exerciseRepeat < exercise.repeatTime)
      setExerciseStep(ExerciseStep.WAITED);
    else {
      logs(ExerciseStep.COMPLETED);
      setExerciseStep(ExerciseStep.COMPLETED);
    }
  };

  /**
   * Action Repeat
   */
  const repeat = () => {
    if (!exercise) return;
    if (exerciseRepeat >= exercise.repeatTime) {
      logs(ExerciseStep.COMPLETED);
      setExerciseStep(ExerciseStep.COMPLETED);
    } else {
      setExerciseRepeat(exerciseRepeat + 1);
      setExerciseStep(ExerciseStep.STARTED);
    }
  };

  /**
   * Action Complete
   */
  const complete = () => {
    if (exerciseStep === ExerciseStep.COMPLETED) return;
    logs(ExerciseStep.COMPLETED);
    setExerciseRepeat(0);
    setExerciseStep(ExerciseStep.COMPLETED);
  };

  /**
   * Action Next
   */
  const next = () => {
    if (!exercise) return;
    if (!exercisesData && !exercisesData.exercises) return;

    const { next } = exercise;

    if (!next || next >= exercisesData.exercises.length) {
      return setExerciseStep(ExerciseStep.ENDED);
    }

    setExerciseRepeat(0);
    setExerciseStep(ExerciseStep.INITIATED);
    setExerciseCurrent(next);
  };

  /**
   * Action Restart
   */
  const restart = () => {
    logs('RESTART_SESSION');
    // timeout to prevent logs request cancel
    // logs will be canceled if taken more than .5s
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  };

  /**
   * Set Current Exercise data
   */
  useEffect(() => {
    if (!exercisesData) return;
    if (exercisesData.detail === 'Not found.' || !exercisesData.exercises) {
      setExerciseStep(ExerciseStep.EMPTY);
      return;
    }

    const current = exercisesData.exercises[exerciseCurrent];

    if (current) {
      setExercise({
        index: exerciseCurrent,
        number: exerciseCurrent + 1,
        next: exerciseCurrent + 1,
        length: exercisesData.exercises.length,
        durationTime: current.movement_duration || 10,
        pauseTime: current.pause || 5,
        repeatTime: current.repeat || 3,
        text: current.i18n,
      });
    } else {
      log('Exercise not found: ', exerciseCurrent);
    }
  }, [exerciseCurrent, exercisesData]);

  /**
   * Log start session
   */
  useEffect(() => {
    if (exercisesData && exercisesData.id) {
      logs('START_SESSION');
    }
  }, [exercisesData]);

  /**
   * Get Exercises data from API
   */
  useEffect(get, []);

  return (
    <ExerciseContext.Provider
      value={{
        ready,
        start,
        pause,
        skip,
        wait,
        repeat,
        complete,
        next,
        restart,
        logs,
        exercise,
        exerciseStep,
        exerciseLoading,
        exerciseReady,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};

export { ExerciseContext, ExerciseStep };
export default ExerciseProvider;
