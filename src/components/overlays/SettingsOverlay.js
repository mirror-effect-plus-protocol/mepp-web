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
