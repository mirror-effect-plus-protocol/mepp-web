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
import { detect } from 'detect-browser';
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import cmp from 'semver-compare';
import styled from 'styled-components';

import { zindex } from '@styles/configs/zindex';
import { FlexAlignCenter } from '@styles/tools';
import { rem } from '@styles/utils/rem';

const browsers = {
  chrome: '111.0',
  firefox: '111.0',
  edge: '111.0',
  safari: '13.0',
};

/**
 * Browser Support Banner Detection
 */
const BrowserSupportBanner = () => {
  const { t } = useTranslation();
  const [supported, setSupported] = useState(null);
  const browserName = useRef(null);
  const browserVersion = useRef(null);

  const supportedBrowser = (browser) => {
    if (!browser) return false;
    if (!browser.name) return false;
    if (!browsers[browser.name])
      return true; // unknown browser = supported by default (like Android navigators)
    else {
      if (cmp(browser.version, browsers[browser.name]) < 0) return false;
      else return true;
    }
  };

  useEffect(() => {
    if (supported === true || supported === false) return;

    const browser = detect();
    if (browser) {
      if (browser.name && browser.version) {
        browserName.current = browser.name;
        browserVersion.current = browser.version;
        setSupported(supportedBrowser(browser));
      }
    }
  }, [setSupported]);

  return (
    <>
      {supported === false && (
        <Container>
          {t('browserSupport:label').replace(
            /{([\s\S]+?)}/g,
            (match, value) => {
              const key = value.trim();
              const data = {
                name: browserName.current,
                version: browserVersion.current,
              };
              return data[key] === undefined ? '' : data[key];
            },
          )}
        </Container>
      )}
    </>
  );
};

const Container = styled(FlexAlignCenter.Component)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 8px;
  font-weight: bold;
  font-size: ${rem(14)};
  text-align: center;
  color: ${({ theme }) => theme.colors.tertiary};
  background-color: ${({ theme }) => theme.colors.warning};
  z-index: ${zindex.max};
`;

export { BrowserSupportBanner };
