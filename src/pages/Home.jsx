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

import { media } from '@styles/configs/breakpoints';
import { spacings } from '@styles/configs/spacings';
import { FlexDisplay, WrapperFull } from '@styles/tools/index';

import { theme } from '@themes/index';

import HomeLayout from '@layouts/Home';

import { FooterHome } from '@components/footer/FooterHome';
import { FinancialAid } from '@components/generics/FinancialAid';
import { H1, H3, LI, P, UL, Href } from '@components/generics/basics/index';
import Button from '@components/generics/buttons/Button';
import { GridOneColumn } from '@components/grids/GridOneColumn';
import { GridTwoColumn } from '@components/grids/GridTwoColumn';
import { HeaderHome } from '@components/header/HeaderHome';

/**
 * HomePage with HomeLayout
 */
const HomePage = () => {
  return (
    <HomeLayout
      header={<HeaderHome />}
      content={
        <ContainerWrapper>
          <GridInner>
            <GridTwoColumn left={<IntroText />} right={<IntroImage />} />
            <GridOneColumn content={<IntroFinancial />} />
          </GridInner>
          <Liner />
          <GridInner id="description">
            <GridTwoColumn
              left={<DescriptionText />}
              right={<DescriptionList />}
            />
          </GridInner>
          <Liner />
          <GridInner id="history">
            <GridTwoColumn left={<HistoryList />} right={<HistoryText />} />
          </GridInner>
          <GridInner background={theme.colors.bluelight} id="donate">
            <GridTwoColumn left={<DonateText />} right={<DonateWidget />} />
          </GridInner>
        </ContainerWrapper>
      }
      footer={<FooterHome />}
    />
  );
};

const IntroText = () => {
  const { t } = useTranslation();
  return (
    <>
      <H1>{t('home:intro:title')}</H1>
      <P>{t('home:intro:text')}</P>
    </>
  );
};
const IntroImage = () => {
  return <img src="/assets/home-intro.jpg" width="100%" />;
};
const IntroFinancial = () => {
  const { t } = useTranslation();
  return (
    <>
      <H1 as="h2">{t('home:intro:financialTitle')}</H1>
      <FinancialAid />
    </>
  );
};

const DescriptionText = () => {
  const { t } = useTranslation();

  const items = [
    {
      img: './assets/logos/logo-nih.png',
      link: 'https://www.nih.gov/',
    },
    {
      img: './assets/logos/logo-taylor-francis.png',
      link: 'https://www.tandfonline.com/',
    },
    {
      img: './assets/logos/logo-mary-ann.png',
      link: 'https://www.liebertpub.com/',
    },
    {
      img: './assets/logos/logo-europe-pubmed.png',
      link: 'https://europepmc.org/',
    },
  ];

  return (
    <>
      <H1 as="h2">{t('home:description:title')}</H1>
      <P>{t('home:description:text')}</P>
      <Button.Default
        label={t('cta:donate')}
        onClick={() => {
          var elem = document.getElementById('donate');
          if (elem) {
            window.scrollTo(elem.offsetLeft, elem.offsetTop);
          }
        }}
      />

      <FlexDisplay.Component as="ul">
        {items.map((item, key) => (
          <LI key={key}>
            <Href href={item.link} target="_blank">
              <img src={item.img} width="100%" />
            </Href>
          </LI>
        ))}
      </FlexDisplay.Component>
    </>
  );
};
const DescriptionList = () => {
  const { t } = useTranslation();
  return (
    <>
      <H3>{t('home:description:list:title')}</H3>
      <UL>
        <LI>{t('home:description:list:item1:text')}</LI>
        <LI>{t('home:description:list:item2:text')}</LI>
        <LI>{t('home:description:list:item3:text')}</LI>
        <LI>{t('home:description:list:item4:text')}</LI>
      </UL>
    </>
  );
};

const HistoryList = () => {
  const { t } = useTranslation();
  return (
    <>
      <H1 as="h2">{t('home:history:title')}</H1>
      <UL>
        <LI>
          <img src="/assets/home-intro.jpg" width="220" />
          <H3>{t('home:history:persons:person1:name')}</H3>
          <P>{t('home:history:persons:person1:title')}</P>
        </LI>
        <LI>
          <img src="/assets/home-intro.jpg" width="220" />
          <H3>{t('home:history:persons:person2:name')}</H3>
          <P>{t('home:history:persons:person2:title')}</P>
        </LI>
        <LI>
          <img src="/assets/home-intro.jpg" width="220" />
          <H3>{t('home:history:persons:person3:name')}</H3>
          <P>{t('home:history:persons:person3:title')}</P>
        </LI>
      </UL>
    </>
  );
};
const HistoryText = () => {
  const { t } = useTranslation();
  return (
    <>
      <P>{t('home:history:text1')}</P>
      <P>{t('home:history:text2')}</P>
    </>
  );
};

const DonateText = () => {
  const { t } = useTranslation();
  return (
    <>
      <H1 as="h2">{t('home:donate:title')}</H1>
      <P>{t('home:donate:text')}</P>
    </>
  );
};
const DonateWidget = () => {
  return <>Donate Widget</>;
};

const ContainerWrapper = styled(WrapperFull)``;

const GridInner = styled.div`
  padding: ${spacings.default * 2}px;
  ${({ background }) => `background-color: ${background}`};

  ${media.xsOnly`
    padding: ${spacings.default}px;
  `}
`;

const Liner = styled.div`
  width: 100%;
  height: 1px;
  background: #000000;
`;

export default HomePage;
