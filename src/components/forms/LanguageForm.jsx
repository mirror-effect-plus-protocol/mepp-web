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
import React, { useContext, useState, useCallback } from 'react';
import { useGetIdentity } from 'react-admin';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { spacings } from '@styles/configs/spacings';
import { FlexAlignCenter, FlexDirectionColumn } from '@styles/tools';

import { useLocale } from '@hooks/locale/useLocale';

import { Language, RequestEndpoint, RequestMethod } from '@utils/constants';
import { fetchData } from '@utils/fetch';

import { SpacerHorizontal } from '@components/generics/basics/Spacer';
import Button from '@components/generics/buttons/Button';
import Input from '@components/generics/forms/Input';
import { OverlayContext } from '@components/overlays/OverlayProvider';

/**
 * Language Form
 */
const LanguageForm = () => {
  const { t } = useTranslation();
  const { locale, setLocale } = useLocale();
  const [language, setLanguage] = useState(locale);
  const { identity } = useGetIdentity();
  const { close } = useContext(OverlayContext);

  const submit = useCallback(() => {
    setLocale(language);
    close();

    const save = async () => {
      const { data } = await fetchData(
        RequestEndpoint.PROFILE,
        { language },
        RequestMethod.PATCH,
      );

      if (data) {
        // Update token since e-mail and/or password have been changed.
        if (data.token) {
          localStorage.setItem('token', data.token);
        }

        // Update current profile
        if (data.profile) {
          localStorage.setItem(
            'profile',
            JSON.stringify({ ...identity, ...data.profile }),
          );
        }
      }
    };

    save();
  }, [language, setLocale, close]);

  return (
    <Container>
      <InputsWrapper>
        <InputsInner>
          <Input.Radio
            name="language"
            label="Français"
            value={Language.FR}
            onChange={(e) => setLanguage(e.target.value)}
            defaultChecked={locale === Language.FR}
          />
          <Input.Radio
            name="language"
            label="English"
            value={Language.EN}
            onChange={(e) => setLanguage(e.target.value)}
            defaultChecked={locale === Language.EN}
          />
          <Input.Radio
            name="language"
            label="Italiano"
            value={Language.IT}
            onChange={(e) => setLanguage(e.target.value)}
            defaultChecked={locale === Language.IT}
          />
        </InputsInner>
        <SpacerHorizontal size={`${spacings.default * 2}px`} />
        <InputsInner>
          <Input.Radio
            name="language"
            label="Español"
            value={Language.ES}
            onChange={(e) => setLanguage(e.target.value)}
            defaultChecked={locale === Language.ES}
          />
          <Input.Radio
            name="language"
            label="Deutsch"
            value={Language.DE}
            onChange={(e) => setLanguage(e.target.value)}
            defaultChecked={locale === Language.DE}
          />
          <Input.Radio
            name="language"
            label="Português"
            value={Language.PT}
            onChange={(e) => setLanguage(e.target.value)}
            defaultChecked={locale === Language.PT}
          />
        </InputsInner>
      </InputsWrapper>

      <ButtonsWrapper>
        <Button.Outline label={t('cta:cancel')} onClick={close} />
        <SpacerHorizontal />
        <Button.Default label={t('cta:save')} onClick={submit} />
      </ButtonsWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const InputsWrapper = styled(FlexAlignCenter.Component)``;
const InputsInner = styled(FlexDirectionColumn.Component)``;

const ButtonsWrapper = styled(FlexAlignCenter.Component)`
  margin-top: ${spacings.default * 3}px;
`;

export default LanguageForm;
