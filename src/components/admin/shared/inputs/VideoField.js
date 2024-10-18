import React, { useEffect, useState } from 'react';
import {useRecordContext, useTranslate} from 'react-admin';

const VideoField = ({source}) => {
  const record = useRecordContext();
  const t = useTranslate();
  const [videoSrc, setVideoSrc] = useState(null);
  useEffect(() => {
    if (!record || !record[source]?.src) return;
    setVideoSrc(record[source].src);
  }, [record]);

  return (
    <div>
      { videoSrc ? (
          <video width="240" height="240" controls>
            <source src={videoSrc}  type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
        ) : (
          <span style={{ fontSize: '0.7em'}}>{t('resources.exercises.card.text.no_video_available')}</span>
        )
      }
    </div>
  );
};

export default VideoField;
