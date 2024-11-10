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

import { Href } from '@components/generics/basics';

/**
 * Copyright
 */
const Copyright = () => {
  const { t } = useTranslation();

  return (
    <>
      <Href href="https://github.com/mirror-effect-plus-protocol/mepp-web/">
        MEPP v{process.env.PROJECT_VERSION}
      </Href>
      &nbsp;©&nbsp;2024&nbsp;
      <Href
        href="https://github.com/mirror-effect-plus-protocol/mepp-web/blob/main/LICENSE"
        target="_blank"
        rel="license noopener noreferrer"
        style={{
          display: 'inline-block',
          verticalAlign: 'middle',
          marginTop: '2px',
        }}
      >
        <svg width="100" height="20">
          <linearGradient id="b" x2="0" y2="100%">
            <stop offset="0" stopColor="#bbb" stopOpacity=".1" />
            <stop offset="1" stopOpacity=".1" />
          </linearGradient>
          <clipPath id="a">
            <rect width="100" height="20" rx="3" fill="#fff" />
          </clipPath>
          <g clipPath="url(#a)">
            <path fill="#555" d="M0 0h51v20H0z" />
            <path fill="#007ec6" d="M51 0h49v20H51z" />
            <path fill="url(#b)" d="M0 0h100v20H0z" />
          </g>
          <g
            fill="#fff"
            textAnchor="middle"
            fontFamily="DejaVu Sans,Verdana,Geneva,sans-serif"
            fontSize="11"
          >
            <text x="25.5" y="15" fill="#010101" fillOpacity=".3">
              {t('footer:license')}
            </text>
            <text x="25.5" y="14">
              {t('footer:license')}
            </text>
            <text x="74.5" y="15" fill="#010101" fillOpacity=".3">
              GPL v3
            </text>
            <text x="74.5" y="14">
              GPL v3
            </text>
          </g>
        </svg>
      </Href>
    </>
  );
};

export { Copyright };
