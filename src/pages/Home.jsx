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
import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import IconArrow from '@assets/icons/arrow.svg';

import { media } from '@styles/configs/breakpoints';
import { spacings } from '@styles/configs/spacings';
import { Cell, FlexDisplay, Grid, WrapperFull } from '@styles/tools';
import { HoverOrActive } from '@styles/utils/HoverOrActive';
import { rem } from '@styles/utils/rem';

import { theme } from '@themes/index';

import { useLocale } from '@hooks/locale/useLocale';
import { useInView } from '@hooks/useInView';
import { useTrackingView } from '@hooks/useTrackingView';

import HomeLayout from '@layouts/Home';

import { FinancialAid } from '@components/generics/FinancialAid';
import { H1, H2, H3, LI, P, UL, Href } from '@components/generics/basics/index';
import Button from '@components/generics/buttons/Button';
// import DonationWidget from '@components/home/DonationWidget';
import { FooterHome } from '@components/home/FooterHome';
import { HeaderHome } from '@components/home/HeaderHome';
import ImageRounded from '@components/home/ImageRounded';

/**
 * HomePage with HomeLayout
 */
const HomePage = () => {
  useTrackingView('/home');
  const showDonate = process.env.SHOW_DONATE || false;

  return (
    <HomeLayout
      header={<HeaderHome showDonate={showDonate} />}
      content={
        <WrapperFull>
          <GridIntroInner id="intro">
            <GridTwoColumn
              left={<IntroLeft showDonate={showDonate} />}
              right={<IntroRight />}
              fullHeight
            />
          </GridIntroInner>
          <GridInner id="financial">
            <GridOneColumn content={<IntroFinancial />} />
          </GridInner>
          <Liner />
          <GridInner id="description">
            <GridTwoColumn
              left={<DescriptionLeft showDonate={showDonate} />}
              right={<DescriptionRight />}
            />
          </GridInner>
          <Liner />
          <GridInner id="history">
            <GridTwoColumn left={<HistoryLeft />} right={<HistoryRight />} />
          </GridInner>
          {showDonate && (
            <GridInner background={theme.colors.bluelight} id="donate">
              <GridOneColumn content={<DonateLeft />} />
            </GridInner>
          )}
        </WrapperFull>
      }
      footer={<FooterHome showDonate={showDonate} />}
    />
  );
};

/**
 * INTRO SECTION
 * Intro Left side (text)
 */
const IntroLeft = ({ showDonate }) => {
  const { t } = useTranslation();
  return (
    <IntroLeftWrapper>
      <TitleH1>{t('home:intro:title')}</TitleH1>
      <Text>{t('home:intro:text')}</Text>
      <ButtonDonate
        hide={!showDonate}
        label={t('cta:donate')}
        onClick={() => {
          var elem = document.getElementById('donate');
          if (elem) window.scrollTo(elem.offsetLeft, elem.offsetTop - 105);
        }}
      />
    </IntroLeftWrapper>
  );
};
/**
 * Intro Right side (image)
 */
const IntroRight = () => {
  return <IntroVideoRounded />;
};
/**
 * Intro Financial section (logos)
 */
const IntroFinancial = () => {
  const { t } = useTranslation();
  return (
    <>
      <TitleH2Financial>{t('home:intro:financialTitle')}</TitleH2Financial>
      <FinancialAid />
    </>
  );
};
/**
 * Intro Grid
 */
const GridIntroInner = styled(WrapperFull)`
  padding: 0 0 ${spacings.default * 2}px ${spacings.default * 2}px;

  ${media.xsOnly`
    padding: 0 ${spacings.default}px;
  `}

  ${media.smOnly`
    padding: 0 ${spacings.default}px;
  `}
`;
/**
 * Intro Wrapper (left)
 */
const IntroLeftWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  height: 100%;
`;
/**
 * Intro Video (right)
 */
const IntroVideoRounded = () => {
  const ref = useRef(null);
  const videoView = useInView(ref, {
    root: document,
    rootMargin: '-150px 0px 0px 0px',
  });

  useEffect(() => {
    if (videoView && ref.current) {
      ref.current.play();
    } else if (ref.current) {
      ref.current.pause();
    }
  }, [videoView]);

  return (
    <IntroVideoWrapper>
      <video muted loop ref={ref} playsInline>
        <source src="/assets/mirror-effect.mp4" type="video/mp4" />
      </video>
    </IntroVideoWrapper>
  );
};
/**
 * Intro Video Wrapper
 */
const IntroVideoWrapper = styled.div`
  border-radius: ${spacings.default * 1.5}px 0 0 ${spacings.default * 1.5}px;
  width: 100%;
  height: 100%;
  min-height: 500px;
  max-height: calc(100vh - 150px);
  overflow: hidden;

  video {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 700;
  }

  ${media.xsOnly`
    border-radius: ${spacings.default}px;
    min-height: 400px;
  `}

  ${media.smOnly`
    border-radius: ${spacings.default}px;
    min-height: 400px;
  `}
`;
/***********/

/**
 * DESCRIPTION SECTION
 * Description Left side (text)
 */
const DescriptionLeft = ({ showDonate }) => {
  const { t } = useTranslation();

  const logos = [
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
      <TitleH2>{t('home:description:title')}</TitleH2>
      <Text>{t('home:description:text')}</Text>
      <ButtonDonate
        label={t('cta:donate')}
        hide={!showDonate}
        onClick={() => {
          var elem = document.getElementById('donate');
          if (elem) window.scrollTo(elem.offsetLeft, elem.offsetTop - 105);
        }}
      />
      <DescriptionLogosWrapper
        columns="repeat(auto-fit, minmax(0px, 1fr));"
        responsiveTemplate={{ xxsOnly: 'repeat(2, minmax(0px, 1fr));' }}
        gap={`${spacings.default / 2}px`}
        as="ul"
      >
        {logos.map((item, key) => (
          <DescriptionLogo key={key} as="li">
            <Href href={item.link} target="_blank">
              <img src={item.img} width="100%" />
            </Href>
          </DescriptionLogo>
        ))}
      </DescriptionLogosWrapper>
    </>
  );
};
/**
 * Description Right side (links)
 */
const DescriptionRight = () => {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch('/api/v1/public/articles/');
        if (!response.ok) {
          throw new Error('Failed to fetch links');
        }
        const data = await response.json();
        setLinks(
          data.map((article) => {
            return {
              'text': article.i18n.description[locale],
              'link': article.i18n.external_url[locale],
            };
          }),
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  return (
    <>
      <TitleH3Case>{t('home:description:list:title')}</TitleH3Case>
      <Liner />
      <DescriptionLinksWrapper>
        {error && <Text>{t('home:description:list:error')}</Text>}
        {loading && <Text>{t('home:description:list:loading')}</Text>}
        {!loading &&
          links.map((item, key) => (
            <div key={key}>
              <DescriptionLink key={key} as="li">
                <Href href={item.link} target="_blank">
                  {item.text}
                </Href>
                <IconArrowLink />
              </DescriptionLink>
              {key !== links.length - 1 && <Liner />}
            </div>
          ))}
      </DescriptionLinksWrapper>
    </>
  );
};
/**
 * Description Logo Wrapper
 */
const DescriptionLogosWrapper = styled(Grid)`
  margin: ${spacings.default}px 0 0 0;
  max-width: 600px;

  ${media.xxsOnly`
    max-width: 300px;
  `}
`;
/**
 * Description Logo
 */
const DescriptionLogo = styled(Cell)`
  list-style: none;
  padding: 0;
  opacity: 0.6;
  align-content: center;
  margin: 0 ${spacings.default / 2}px 0 0;

  img {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
  }

  ${HoverOrActive`
    opacity: 1;
    transition: opacity 0.2s ease;
  `}
`;
/**
 * Description Links Wrapper
 */
const DescriptionLinksWrapper = styled(UL)`
  margin: 0;
`;
/**
 * Description Links
 */
const DescriptionLink = styled(LI)`
  position: relative;
  list-style: none;
  padding: ${spacings.default}px ${spacings.default}px ${spacings.default}px 0;

  a {
    display: block;
    width: 90%;
    color ${theme.colors.primary};

    ${HoverOrActive`
      color: ${theme.colors.black};
    `}
  }
`;
/***********/

/**
 * HISTORY SECTION
 * Left side (persons)
 */
const HistoryLeft = () => {
  const { t } = useTranslation();

  const persons = [
    {
      img: './assets/photo-sarah.jpg',
      name: t('home:history:persons:person1:name'),
      title: t('home:history:persons:person1:title'),
    },
    {
      img: './assets/photo-karine.jpg',
      name: t('home:history:persons:person2:name'),
      title: t('home:history:persons:person2:title'),
    },
    {
      img: './assets/photo-akram.jpg',
      name: t('home:history:persons:person3:name'),
      title: t('home:history:persons:person3:title'),
    },
  ];

  return (
    <>
      <TitleH2
        dangerouslySetInnerHTML={{
          __html: t('home:history:title'),
        }}
      ></TitleH2>
      <HistoryPersonWrapper>
        {persons.map((item, key) => (
          <HistoryPerson key={key}>
            <HistoryPersonImage>
              <ImageRounded src={item.img} />
            </HistoryPersonImage>
            <HistoryPersonText>
              <TitleH3Person>{item.name}</TitleH3Person>
              <TextPerson>{item.title}</TextPerson>
            </HistoryPersonText>
          </HistoryPerson>
        ))}
      </HistoryPersonWrapper>
    </>
  );
};
/**
 * Right side (text)
 */
const HistoryRight = () => {
  const { t } = useTranslation();

  return (
    <>
      <Text>{t('home:history:text1')}</Text>
      <Text>{t('home:history:text2')}</Text>
    </>
  );
};
/**
 * History Left Wrapper
 */
const HistoryPersonWrapper = styled(UL)`
  margin: ${spacings.default * 3}px 0 ${spacings.default}px 0;

  ${media.xxsOnly`
    margin: ${spacings.default * 2}px 0 ${spacings.default}px 0;
  `}
`;
/**
 * History Person Wrapper
 */
const HistoryPerson = styled(LI)`
  ${FlexDisplay.CSS}
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0 0 ${spacings.default * 2}px 0;

  &:last-child {
    margin: 0;
  }

  ${media.xxsOnly`
    flex-wrap: wrap;
  `}
`;
/**
 * History Person Image Wrapper
 */
const HistoryPersonImage = styled.div`
  width: 100%;
  height: 220px;
  max-width: 220px;
  margin: 0 ${spacings.default * 2}px 0 0;

  ${media.xxsOnly`
    width: 100%;
    height: calc(100vw - ${spacings.default * 2}px);;
    max-width: 100%;
    margin: 0px 0px ${spacings.default}px 0px;
  `}
`;
/**
 * History Person Text Wrapper
 */
const HistoryPersonText = styled.div`
  width: 100%;
`;
/***********/

/**
 * DONATE SECTION
 * Left side (text)
 */
const DonateLeft = () => {
  const { t } = useTranslation();

  return (
    <DonateLeftWrapper>
      <TitleH2>{t('home:donate:title')}</TitleH2>
      <Text>{t('home:donate:text')}</Text>
      <ButtonDonate
        label={t('cta:donate')}
        onClick={() => {
          window.open('https://secureca.reseau.umontreal.ca/s/1857/bp18/interior.aspx?sid=1857&gid=2&pgid=418&cid=1063&dids=1076&bledit=1&sort=1');
        }}/>
    </DonateLeftWrapper>
  );
};
/**
 * Right side (widget)
 * #TODO add widget script
 */
// const DonateRight = () => {
//   return (
//     <DonateRightWrapper>
//       <DonationWidget />
//     </DonateRightWrapper>
//   );
// };
/**
 * Donate Left Wrapper
 */
const DonateLeftWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  height: 100%;
`;
/**
 * Donate Right Wrapper
 */
// const DonateRightWrapper = styled.div`
//   display: flex;
//   align-content: center;
//   justify-content: center;
//   height: 100%;
// `;

/***********/

/**
 * GENERIC HOME GRIDS AND INNERS
 * Home generic Layout Grip / Inner
 */
const GridOneColumn = ({ content, background }) => {
  return (
    <Grid
      as="section"
      columns="repeat(auto-fit, minmax(0px, 1fr));"
      background={background}
    >
      <Cell>{content}</Cell>
    </Grid>
  );
};

const GridTwoColumn = ({ left, right, background, fullHeight }) => {
  return (
    <GridWrapper
      as="section"
      columns="repeat(auto-fit, minmax(0px, 1fr));"
      responsiveTemplate={{ smOnly: '1fr', xsOnly: '1fr' }}
      background={background}
      gap={`${spacings.default}px`}
      fullHeight={fullHeight}
    >
      <Cell>{left}</Cell>
      <Cell>{right}</Cell>
    </GridWrapper>
  );
};

const GridWrapper = styled(Grid)`
  ${({ fullHeight }) => fullHeight && `  min-height: calc(100vh - 200px);`}
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

const Liner = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.greyLight};
`;
/***********/

/**
 * GENERIC HOME TITLE / TEXT / BUTTONS / ICONS
 */
const TitleH1 = styled(H1)`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 300;
  line-height: 1.2;
  font-size: ${rem(60)};

  ${media.xxsOnly`
    font-size: ${rem(32)};
  `}
`;

const TitleH2 = styled(H2)`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 300;
  line-height: 1.2;
  font-size: ${rem(48)};
  margin: 0 0 ${rem(spacings.default)} 0;

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

const TitleH3Case = styled(H3)`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 700;
  line-height: 1.6;
  font-size: ${rem(18)};
  margin: 0 0 ${rem(spacings.default)} 0;
`;

const TitleH3Person = styled(H3)`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 300;
  line-height: 1;
  font-size: ${rem(48)};
  margin: 0 0 ${rem(spacings.default)} 0;
  max-width: 250px;

  ${media.xxsOnly`
    max-width: 100%;
    font-size: ${rem(24)};
    margin: 0 0 ${rem(spacings.default / 2)} 0;
  `}
`;

const Text = styled(P)`
  color: ${({ theme }) => theme.colors.greyMedium};
  font-weight: 400;
  line-height: 1.5;
  font-size: ${rem(20)};

  ${media.xxsOnly`
    font-size: ${rem(18)};
  `}
`;

const TextPerson = styled(Text)`
  max-width: 90%;
`;

const IconArrowLink = styled(IconArrow)`
  position: absolute;
  right: 0;
  top: ${spacings.default}px;
`;

const ButtonDonate = styled(Button.Default)`
  margin: ${spacings.default}px 0 0 0;
  ${({ hide }) => hide && `display: none;`};

  @media screen and (max-width: 520px) {
    width: 100%;
    display: ${({ hide }) => (hide ? `none` : 'block')};
  }
`;
/***********/

export default HomePage;
