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
import SvgIcon from '@mui/material/SvgIcon';

export const ClinicianIcon = (props) => {
  return (
    <SvgIcon viewBox="0 0 24 24">
      <path d="M23.002 6.49904C23.002 4.67929 21.5211 3.19841 19.7014 3.19841C17.8816 3.19841 16.4007 4.67929 16.4007 6.49904C16.4007 7.93151 17.3227 9.14064 18.6012 9.59613V19.7005C18.6012 20.3078 18.1072 20.8007 17.501 20.8007C16.8947 20.8007 16.4007 20.3078 16.4007 19.7005C16.4007 17.8807 14.9199 16.3998 13.1001 16.3998C11.2804 16.3998 9.79948 17.8807 9.79948 19.7005C9.79948 20.0041 9.55194 20.2506 9.24938 20.2506C8.94682 20.2506 8.69927 20.0041 8.69927 19.7005V16.3019C11.8162 15.776 14.2003 13.0651 14.2003 9.79857V3.19841C14.2003 2.59109 13.7085 2.0982 13.1001 2.0982H10.8997V0.997986H8.69927V5.39883H10.8997V4.29862H11.9999V9.79747C11.9999 12.2256 10.025 14.1983 7.59906 14.1983C5.1731 14.1983 3.19822 12.2256 3.19822 9.79747V4.29862H4.29843V5.39883H6.49885V0.997986H4.29843V2.0982H2.09801C1.4896 2.0982 0.997803 2.59109 0.997803 3.19841V9.79747C0.997803 13.0629 3.38196 15.7749 6.49885 16.3008V19.6994C6.49885 21.2165 7.73219 22.4499 9.24938 22.4499C10.7666 22.4499 11.9999 21.2165 11.9999 19.6994C11.9999 19.0942 12.4939 18.5991 13.1001 18.5991C13.7063 18.5991 14.2003 19.0942 14.2003 19.6994C14.2003 21.5202 15.6812 23 17.501 23C19.3207 23 20.8016 21.5202 20.8016 19.6994V9.59613C22.08 9.14064 23.002 7.93151 23.002 6.49904ZM19.7014 7.59705C19.0952 7.59705 18.6012 7.10415 18.6012 6.49904C18.6012 5.89392 19.0952 5.39883 19.7014 5.39883C20.3076 5.39883 20.8016 5.89282 20.8016 6.49904C20.8016 7.10525 20.3076 7.59705 19.7014 7.59705Z"/>
    </SvgIcon>
  );
};
