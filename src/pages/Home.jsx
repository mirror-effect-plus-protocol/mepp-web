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
import { rem } from '@styles/utils/rem';

import { theme } from '@themes/index';

import HomeLayout from '@layouts/Home';

import { FooterHome } from '@components/footer/FooterHome';
import { FinancialAid } from '@components/generics/FinancialAid';
import ImageRounded from '@components/generics/ImageRounded';
import { H1, H2, H3, LI, P, UL, Href } from '@components/generics/basics/index';
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
          <GridHeroInner id="intro">
            <GridTwoColumn left={<IntroLeft />} right={<IntroRight />} />
          </GridHeroInner>
          <GridInner id="financial">
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

const IntroLeft = () => {
  const { t } = useTranslation();
  return (
    <IntroLeftWrapper>
      <TitleH1>{t('home:intro:title')}</TitleH1>
      <TextP>{t('home:intro:text')}</TextP>
      <ButtonDonate
        label={t('cta:donate')}
        onClick={() => {
          var elem = document.getElementById('donate');
          if (elem) {
            window.scrollTo(elem.offsetLeft, elem.offsetTop - 150);
          }
        }}
      />
    </IntroLeftWrapper>
  );
};
const IntroRight = () => {
  return <ImageRounded src="/assets/home-intro.jpg" height="100%" />;
};
const IntroFinancial = () => {
  const { t } = useTranslation();
  return (
    <>
      <TitleH2Financial>{t('home:intro:financialTitle')}</TitleH2Financial>
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

const GridHeroInner = styled(WrapperFull)`
  padding: 0 0 ${spacings.default * 2}px ${spacings.default * 2}px;

  ${media.xsOnly`
    padding: 0 ${spacings.default}px;
  `}

  ${media.smOnly`
    padding: 0 ${spacings.default}px;
  `}
`;

const GridInner = styled.div`
  padding: ${spacings.default * 2}px;
  ${({ background }) => `background-color: ${background}`};

  ${media.xsOnly`
    padding: ${spacings.default * 2}px ${spacings.default}px;
  `}

  ${media.smOnly`
    padding: ${spacings.default * 2}px ${spacings.default}px;
  `}
`;

const IntroLeftWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  height: 100%;
`;

const Liner = styled.div`
  width: 100%;
  height: 1px;
  background: #d2d2d2;
`;

const TitleH1 = styled(H1)`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 300;
  line-height: 1.2;
  font-size: ${rem(60)};

  ${media.xxsOnly`
    font-size: ${rem(32)};
  `}
`;
const TitleH2Financial = styled(H2)`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 300;
  line-height: 1.2;
  font-size: ${rem(32)};

  ${media.xxsOnly`
    font-size: ${rem(24)};
    margin: 0 0 ${rem(spacings.default)} 0;
  `}
`;

const TextP = styled(P)`
  color: ${() => '#595959'};
  font-weight: 400;
  line-height: 1.5;
  font-size: ${rem(20)};

  ${media.xxsOnly`
    font-size: ${rem(15)};
  `}
`;

const ButtonDonate = styled(Button.Default)`
  width: 100%;
  margin: ${spacings.default}px 0 0 0;
  display: none;

  @media screen and (max-width: 520px) {
    display: block;
  }
`;

export default HomePage;
