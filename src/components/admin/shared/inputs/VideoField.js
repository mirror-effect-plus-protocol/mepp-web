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
import React, { useEffect, useState } from 'react';
import { useRecordContext, useTranslate } from 'react-admin';

const VideoField = ({ source }) => {
  const record = useRecordContext();
  const t = useTranslate();
  const [videoSrc, setVideoSrc] = useState(null);
  useEffect(() => {
    if (!record || !record[source]?.src) return;
    setVideoSrc(record[source].src);
  }, [record]);

  return (
    <div>
      {videoSrc ? (
        <video width="240" height="240" controls>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <span style={{ fontSize: '0.7em' }}>
          {t('resources.exercises.card.text.no_video_available')}
        </span>
      )}
    </div>
  );
};

export default VideoField;
