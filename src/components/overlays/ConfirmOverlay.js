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
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { spacings } from '@styles/configs/spacings';
import { FlexAlignCenter, FlexAlignMiddle } from '@styles/tools/index';

import { H2 } from '@components/generics/basics/Heading';
import Button from '@components/generics/buttons/Button';

/**
 * Confirm Overlay
 */
const ConfirmOverlay = (props) => {
  const { t } = useTranslation();
  const close = props.close ? props.close : () => {};
  const confirm = props.confirm ? props.confirm : () => {};

  return (
    <ContainerWrapper>
      <Container>
        <Title
          dangerouslySetInnerHTML={{ __html: t('GUI:confirm:title') }}
        ></Title>
        <NavWrapper>
          <Button.Default label={t('cta:cancel')} onClick={close} />
          <Button.Outline label={t('cta:confirm')} onClick={confirm} />
        </NavWrapper>
      </Container>
    </ContainerWrapper>
  );
};

const ContainerWrapper = styled(FlexAlignMiddle.Component)`
  width: 100%;
  height: calc(100vh - 200px);
  background-color: ${({ theme }) => `${theme.colors.background}`};
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled(H2)`
  text-align: center;
`;

const NavWrapper = styled(FlexAlignCenter.Component)`
  gap: ${spacings.default}px;
`;

export { ConfirmOverlay };
