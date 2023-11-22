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
  useContext,
  useCallback,
  createContext,
} from 'react';
import { useNotify, useGetIdentity } from 'react-admin';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { spacings } from '@styles/configs/spacings';

import { useApi } from '@hooks/useApi';

import { RequestEndpoint } from '@utils/constants';

import { LoadingCircle } from '@components/generics/LoadingCircle';
import Button from '@components/generics/buttons/Button';
import { OverlayContext, ConfirmOverlay } from '@components/overlays';

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
  position: { ...defaultPosition },
  rotation: { ...defaultRotation },
  scale: { ...defaultScale },
});

/**
 * GUI PROVIDER
 */
const GUIProvider = ({ children }) => {
  const { t } = useTranslation();
  const notify = useNotify();
  const navigate = useNavigate();
  const { open, close } = useContext(OverlayContext);
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const { patch, loading } = useApi(RequestEndpoint.SETTINGS);
  const [position, setPosition] = useState({ ...defaultPosition });
  const [rotation, setRotation] = useState({ ...defaultRotation });
  const [scale, setScale] = useState({ ...defaultScale });
  const [ready, setReady] = useState(false);
  const guiRef = useRef(null);

  const onChangePosition = useCallback(
    (obj) => {
      setPosition({ ...obj });
    },
    [setPosition, identity],
  );

  const onChangeRotation = useCallback(
    (obj) => {
      setRotation({ ...obj });
    },
    [setRotation],
  );

  const onChangeScale = useCallback(
    (obj) => {
      setScale({ ...obj });
    },
    [setScale],
  );

  const onApplyProfile = useCallback(() => {
    if (!identity) return;
    const clone = guiRef.current.save();
    if (identity.mirror_settings) {
      // prettier-ignore
      clone.folders[t('GUI:folders:position')].controllers = {...identity.mirror_settings.position};
      // prettier-ignore
      clone.folders[t('GUI:folders:rotation')].controllers = {...identity.mirror_settings.rotation};
      // prettier-ignore
      clone.folders[t('GUI:folders:scale')].controllers = {...identity.mirror_settings.scale};
    } else {
      // prettier-ignore
      clone.folders[t('GUI:folders:position')].controllers = {...defaultPosition};
      // prettier-ignore
      clone.folders[t('GUI:folders:rotation')].controllers = {...defaultRotation};
      // prettier-ignore
      clone.folders[t('GUI:folders:scale')].controllers = {...defaultScale};
    }
    guiRef.current.load(clone);
  }, [identity]);

  const onApplyDefault = () => {
    const clone = guiRef.current.save();
    // prettier-ignore
    clone.folders[t('GUI:folders:position')].controllers = {...defaultPosition};
    // prettier-ignore
    clone.folders[t('GUI:folders:rotation')].controllers = {...defaultRotation};
    // prettier-ignore
    clone.folders[t('GUI:folders:scale')].controllers = { ...defaultScale };
    guiRef.current.load(clone);
  };

  const closeWithoutSaveConfirm = () => {
    guiRef.current.hide();
    open(
      <ConfirmOverlay
        close={() => {
          guiRef.current.show();
          close();
        }}
        confirm={() => {
          navigate('/intro');
        }}
      />,
    );
  };

  const onSave = useCallback(() => {
    const data = guiRef.current.save();
    const position = data.folders[t('GUI:folders:position')].controllers;
    const rotation = data.folders[t('GUI:folders:rotation')].controllers;
    const scale = data.folders[t('GUI:folders:scale')].controllers;

    const send = async () => {
      const { response } = await patch({
        position,
        rotation,
        scale,
      });
      if (response.status === 200) {
        notify('api.success.settings_update', { type: 'success' });
        identity.mirror_settings = {
          position,
          rotation,
          scale,
        };
      } else {
        notify('api.error.generic', { type: 'error' });
      }
    };

    send();
  }, [patch, notify, t]);

  const valuesAreEqual = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const formUnchanged = () => {
    if (identity?.mirror_settings && guiRef?.current) {
      const data = guiRef.current.save();
      return (
        valuesAreEqual(
          data.folders[t('GUI:folders:position')].controllers,
          identity.mirror_settings.position,
        ) &&
        valuesAreEqual(
          data.folders[t('GUI:folders:rotation')].controllers,
          identity.mirror_settings.rotation,
        ) &&
        valuesAreEqual(
          data.folders[t('GUI:folders:scale')].controllers,
          identity.mirror_settings.scale,
        )
      );
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (ready) return;
    if (!identity) return;

    if (identity.mirror_settings) {
      if (identity.mirror_settings.position) {
        setPosition({ ...identity.mirror_settings.position });
      }
      if (identity.mirror_settings.rotation) {
        setRotation({ ...identity.mirror_settings.rotation });
      }
      if (identity.mirror_settings.scale) {
        setScale({ ...identity.mirror_settings.scale });
      }
    }
    setReady(true);
  }, [identity, ready]);

  useEffect(() => {
    if (!ready) return;
    if (!identity) return;
    if (guiRef.current) return;

    const gui = new GUI({
      title: t('GUI:title'),
      closeFolders: true,
    });

    const positionFolder = gui.addFolder(t('GUI:folders:position'));
    positionFolder.add(position, 'x', -4, 4).onChange(() => {
      onChangePosition(position);
    });
    positionFolder.add(position, 'y', -4, 4).onChange(() => {
      onChangePosition(position);
    });
    positionFolder.add(position, 'z', -10, 10).onChange(() => {
      onChangePosition(position);
    });

    const rotationFolder = gui.addFolder(t('GUI:folders:rotation'));
    rotationFolder
      .add(rotation, 'x', -2, 2)
      .onChange(() => {
        onChangeRotation(rotation);
      })
      .hide();
    rotationFolder
      .add(rotation, 'y', -2, 2)
      .onChange(() => {
        onChangeRotation(rotation);
      })
      .hide();
    rotationFolder.add(rotation, 'z', -10, 10).onChange(() => {
      onChangeRotation(rotation);
    });

    const scaleFolder = gui.addFolder(t('GUI:folders:scale'));
    scaleFolder.add(scale, 'x', 0.5, 1.5).onChange(() => {
      onChangeScale(scale);
    });
    scaleFolder.add(scale, 'y', 0.5, 1.5).onChange(() => {
      onChangeScale(scale);
    });
    scaleFolder
      .add(scale, 'z', 0.5, 1.5)
      .onChange(() => {
        onChangeScale(scale);
      })
      .hide();

    guiRef.current = gui;

    return () => {
      gui.destroy();
    };
  }, [identity, ready]);

  return (
    <GUIContext.Provider value={{ position, rotation, scale }}>
      {children}
      <ButtonWrapper>
        <Button.Outline label={t('GUI:cta:profile')} onClick={onApplyProfile} />
        <Button.Outline label={t('GUI:cta:default')} onClick={onApplyDefault} />
        <Button.Secondary
          label={t('cta:close')}
          onClick={() => {
            formUnchanged() ? navigate('/intro') : closeWithoutSaveConfirm();
          }}
        />
        <Button.Default
          disabled={formUnchanged() ? true : false}
          label={t('cta:save')}
          onClick={onSave}
        />
      </ButtonWrapper>
      {(loading || identityLoading) && <LoadingCircle opaque />}
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
  z-index: 1;
`;

export { GUIContext };
export default GUIProvider;
