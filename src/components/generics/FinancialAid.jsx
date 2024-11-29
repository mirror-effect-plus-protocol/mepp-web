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
import styled from 'styled-components';

import { spacings } from '@styles/configs/spacings';
import { Cell, Grid } from '@styles/tools';
import { FlexAlignLeft } from '@styles/tools/index';
import { HoverOrActive } from '@styles/utils/HoverOrActive';

import { Href } from '@components/generics/basics';

/**
 * FinancialAid
 */
const FinancialAid = () => {
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
  );
};

const CellLogo = styled(Cell)`
  ${FlexAlignLeft.CSS}
  opacity: 0.6;

  img {
    max-width: 170px;
  }

  body.light & img {
    -webkit-filter: invert(1);
    filter: invert(1);
  }

  ${HoverOrActive`
    opacity: 1;
    transition: opacity 0.2s ease;
  `}
`;
export { FinancialAid };
