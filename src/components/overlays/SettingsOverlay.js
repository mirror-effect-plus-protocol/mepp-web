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

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { spacings } from '@styles/configs/spacings';
import { FlexAlignCenter } from '@styles/tools/index';

import LanguageForm from '@components/forms/LanguageForm';
import ProfileForm from '@components/forms/ProfileForm';
import { H2 } from '@components/generics/basics/Heading';
import Button from '@components/generics/buttons/Button';

/**
 * Settings type
 */
const SectionType = {
  LANGUAGE: 'languages',
  INFOS: 'infos',
};

/**
 * Settings overlay
 */
const SettingsOverlay = () => {
  const { t } = useTranslation();
  const [section, setSection] = useState(SectionType.LANGUAGE);

  return (
    <Container>
      <Title>{t('settings:title')}</Title>

      <NavWrapper>
        <Button.Liner
          label={t('settings:nav:languages')}
          onClick={() => setSection(SectionType.LANGUAGE)}
          selected={section === SectionType.LANGUAGE}
        />
        <Button.Liner
          label={t('settings:nav:infos')}
          onClick={() => setSection(SectionType.INFOS)}
          selected={section === SectionType.INFOS}
        />
      </NavWrapper>

      <SectionWrapper>
        {section === SectionType.LANGUAGE && <LanguageForm />}
        {section === SectionType.INFOS && <ProfileForm />}
      </SectionWrapper>
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled(H2)`
  text-align: center;
`;

const NavWrapper = styled(FlexAlignCenter.Component)`
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

const SectionWrapper = styled.div`
  width: 100%;
  padding: ${spacings.default * 3}px 0;
`;

export { SettingsOverlay };
