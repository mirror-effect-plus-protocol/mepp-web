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
import GUI from 'lil-gui';
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  createContext,
} from 'react';
import styled from 'styled-components';

import { spacings } from '@styles/configs/spacings';

import { useApi } from '@hooks/useApi';

import { RequestEndpoint } from '@utils/constants';

import { LoadingCircle } from '@components/generics/LoadingCircle';
import Button from '@components/generics/buttons/Button';

/**
 * GUI DEFAULTS
 */
const defaultPosition = { x: 0, y: 0, z: 0 };
const defaultRotation = { x: 0, y: 0, z: 0 };
const defaultScale = { x: 1, y: 1, z: 1 };

/**
 * GUI CONTEXT
 */
const GUIContext = createContext({
  position: defaultPosition,
  rotation: defaultRotation,
  scale: defaultScale,
});

/**
 * GUI PROVIDER
 */
const GUIProvider = ({ children }) => {
  const { post, loading } = useApi(RequestEndpoint.SETTINGS);
  const [position, setPosition] = useState(defaultPosition);
  const [rotation, setRotation] = useState(defaultRotation);
  const [scale, setScale] = useState(defaultScale);
  const guiRef = useRef(null);

  const onChange = useCallback(
    (obj, type) => {
      if (type === 'position') setPosition({ ...obj });
      if (type === 'rotation') setRotation({ ...obj });
      if (type === 'scale') setScale({ ...obj });
    },
    [setPosition, setRotation, setScale],
  );

  const onApplyProfile = useCallback(() => {
    // TODO -  get profil values
    guiRef.current.reset(true);
  }, []);

  const onApplyDefault = useCallback(() => {
    guiRef.current.reset(true);
  }, []);

  const onSave = useCallback(() => {
    const data = guiRef.current.save();
    const position = data.folders.Position.controllers;
    const rotation = data.folders.Rotation.controllers;
    const scale = data.folders.Scale.controllers;
    const payload = {
      position,
      rotation,
      scale,
    };
    post(payload);
  }, []);

  useEffect(() => {
    if (guiRef.current) return;

    const gui = new GUI();

    const positionFolder = gui.addFolder('Position');
    positionFolder.add(position, 'x', -4, 4).onChange(() => {
      onChange(position, 'position');
    });
    positionFolder.add(position, 'y', -4, 4).onChange(() => {
      onChange(position, 'position');
    });
    positionFolder.add(position, 'z', -10, 10).onChange(() => {
      onChange(position, 'position');
    });

    const rotationFolder = gui.addFolder('Rotation');
    rotationFolder.add(rotation, 'z', -10, 10).onChange(() => {
      onChange(rotation, 'rotation');
    });

    const scaleFolder = gui.addFolder('Scale');
    scaleFolder.add(scale, 'x', 0.5, 1.5).onChange(() => {
      onChange(scale, 'scale');
    });
    scaleFolder.add(scale, 'y', 0.8, 1.2).onChange(() => {
      onChange(scale, 'scale');
    });
    scaleFolder.add(scale, 'z', 0.8, 1.2).onChange(() => {
      onChange(scale, 'scale');
    });

    guiRef.current = gui;

    return () => {
      gui.destroy();
    };
  }, []);

  return (
    <GUIContext.Provider value={{ position, rotation, scale }}>
      {children}
      <ButtonWrapper>
        <Button.Outline label="Valeurs du profil" onClick={onApplyProfile} />
        <Button.Outline label="Valeurs par défaut" onClick={onApplyDefault} />
        <Button.Default label="Enregister" onClick={onSave} />
      </ButtonWrapper>
      {loading && <LoadingCircle opaque />}
    </GUIContext.Provider>
  );
};

const ButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: right;
  padding: ${spacings.default}px;
  gap: ${spacings.default}px;
  width: 100%;
  bottom: 0;
  z-index: 3000;
`;

export { GUIContext };
export default GUIProvider;
