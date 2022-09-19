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

import React, { useContext, useState } from 'react';
import { useGetIdentity } from 'react-admin';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { spacings } from '../../styles/configs/spacings';
import { FlexAlignCenter } from '../../styles/tools';

import { useLocale } from '../../hooks/locale/useLocale';

import {
  Language,
  RequestEndpoint,
  RequestMethod,
} from '../../utils/constants';
import { fetchData } from '../../utils/fetch';

import { SpacerHorizontal } from '../../components/generics/basics/Spacer';
import Button from '../../components/generics/buttons/Button';
import Input from '../../components/generics/forms/Input';
import { OverlayContext } from '../../components/overlays/OverlayProvider';

/**
 * Language Form
 */
const LanguageForm = () => {
  const { t } = useTranslation();
  const { locale, setLocale } = useLocale();
  const [language, setLanguage] = useState(locale);
  const { identity } = useGetIdentity();
  const { close } = useContext(OverlayContext);

  const submit = async () => {
    setLocale(language);
    close();

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

  return (
    <Container>
      <InputsWrapper>
        <Input.Radio
          name="language"
          label="Français"
          value={Language.FR}
          onChange={(e) => setLanguage(e.target.value)}
          defaultChecked={locale === Language.FR}
        />
        <SpacerHorizontal size={`${spacings.default * 2}px`} />
        <Input.Radio
          name="language"
          label="English"
          value={Language.EN}
          onChange={(e) => setLanguage(e.target.value)}
          defaultChecked={locale === Language.EN}
        />
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

const ButtonsWrapper = styled(FlexAlignCenter.Component)`
  margin-top: ${spacings.default * 3}px;
`;

export default LanguageForm;
