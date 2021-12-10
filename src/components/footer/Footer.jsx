import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { media } from '@styles/configs/breakpoints';
import { spacings } from '@styles/configs/spacings';
import { Cell, Grid } from '@styles/tools';
import { FlexAlignMiddle } from '@styles/tools/index';
import { HoverOrActive } from '@styles/utils/HoverOrActive';
import { rem } from '@styles/utils/rem';

import { Href, P, H5 } from '@components/generics/basics';

/**
 * Footer with Collaborators Logos
 */
const Footer = () => {
  const { t } = useTranslation();

  const items = [
    {
      img: './assets/logos/logo_ciusssnim.png',
      link: 'https://www.ciusssnordmtl.ca/',
    },
    {
      img: './assets/logos/logo_ciussseim.png',
      link: 'https://ciusss-estmtl.gouv.qc.ca/',
    },
    {
      img: './assets/logos/logo_repar.png',
      link: 'https://repar.ca/',
    },
    {
      img: './assets/logos/logo_qc2.png',
      link: 'https://frq.gouv.qc.ca/',
    },
    {
      img: './assets/logos/logo_invent.png',
      link: 'https://inven-t.umontreal.ca/accueil/',
    },
    {
      img: '/assets/logos/logo_umtl.png',
      link: 'https://www.umontreal.ca/',
    },
  ];

  return (
    <Container>
      <ContainerInter>
        <Title>{t('footer:title')}</Title>

        <Grid
          columns={`repeat(${items.length}, minmax(0px, 1fr));`}
          responsiveTemplate={{ xxsOnly: 'repeat(2, minmax(0px, 1fr));' }}
          gap={`${spacings.default * 2}px`}
          as="ul"
        >
          {items.map((item, key) => (
            <CellLogo key={key} as="li">
              <Href href={item.link} target="_blank">
                <img src={item.img} width="100%" />
              </Href>
            </CellLogo>
          ))}
        </Grid>

        <CopyrightWrapper>
          <Copyright small>
            <Href href="https://github.com/mirror-effect-plus-protocol/mepp-web/">MEPP</Href>&nbsp;©&nbsp;2021&nbsp;
            <Href href="https://github.com/mirror-effect-plus-protocol/mepp-web/blob/main/LICENSE" target="_blank" rel="license noopener noreferrer">
              <svg width="100" height="20">
                <linearGradient id="b" x2="0" y2="100%">
                  <stop offset="0" stopColor="#bbb" stopOpacity=".1"/>
                  <stop offset="1" stopOpacity=".1"/>
                </linearGradient>
                <clipPath id="a"><rect width="100" height="20" rx="3" fill="#fff"/></clipPath>
                <g clipPath="url(#a)">
                  <path fill="#555" d="M0 0h51v20H0z"/>
                  <path fill="#007ec6" d="M51 0h49v20H51z"/>
                  <path fill="url(#b)" d="M0 0h100v20H0z"/>
                </g>
                <g fill="#fff" textAnchor="middle" fontFamily="DejaVu Sans,Verdana,Geneva,sans-serif" fontSize="11">
                  <text x="25.5" y="15" fill="#010101" fillOpacity=".3">{t('footer:license')}</text>
                  <text x="25.5" y="14">{t('footer:license')}</text>
                  <text x="74.5" y="15" fill="#010101" fillOpacity=".3">GPL v3</text>
                  <text x="74.5" y="14">GPL v3</text>
                </g>
              </svg>
            </Href>
          </Copyright>

          <CopyrightLinks>
            <Href href="#privacy">{t('footer:privacy')}</Href>
            &nbsp;|&nbsp;
            <Href href="#termsofuse">{t('footer:termsofuse')}</Href>
          </CopyrightLinks>
        </CopyrightWrapper>
      </ContainerInter>
    </Container>
  );
};

const Container = styled.footer`
  padding: 0px ${spacings.default * 4}px;

  /* fix for increase fonts values for a11y */
  @media screen and (max-height: 850px) {
    padding: ${spacings.default * 2}px ${spacings.default * 4}px 0;
  }

  ${media.xxsOnly`
    padding: ${spacings.default * 2}px ${spacings.default}px 0;
  `}
`;

const ContainerInter = styled.div`
  padding: ${spacings.default * 2}px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.grey};
`;

const Title = styled(H5)`
  margin-bottom: ${spacings.default * 2}px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: ${rem(12)};
  letter-spacing: 0.2rem;
  color: ${({ theme }) => theme.colors.white};
`;

const CellLogo = styled(Cell)`
  ${FlexAlignMiddle.CSS}
  opacity: 0.6;

  img {
    max-width: 170px;
  }

  ${HoverOrActive`
    opacity: 1;
    transition: opacity 0.2s ease;
  `}
`;

const CopyrightWrapper = styled(FlexAlignMiddle.Component)`
  flex-direction: column;
  margin: ${spacings.default * 2}px 0 0;
`;

const Copyright = styled(P)`
  text-align: center;
`;

const CopyrightLinks = styled.div`
  margin-top: ${spacings.default / 2}px;
  font-size: ${rem(14)};
`;

export { Footer };
