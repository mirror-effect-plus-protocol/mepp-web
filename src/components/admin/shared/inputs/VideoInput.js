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
import { FileInput, useInput } from 'react-admin';

const VideoInput = (props) => {
  const handleFileChange = (files) => {
    if (files && files[0]) {
      setUploadedFile(files[0]);
    }
  };
  const [uploadedFile, setUploadedFile] = useState(null);

  return (
    <FileInput
      {...props}
      accept="video/mp4"
      multiple={false}
      options={{ onDrop: handleFileChange }}
      sx={{
        '& .RaFileInput-removeButton': {
          display: 'flex',
        },
      }}
    >
      <VideoPreview source="src" uploadedFile={uploadedFile} />
    </FileInput>
  );
};

// Aperçu pour les vidéos et les images
const VideoPreview = ({ source, uploadedFile }) => {
  const { field } = useInput({ source });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [key, setKey] = useState(0); // force video re-render

  useEffect(() => {
    if (uploadedFile) {
      const objectUrl = URL.createObjectURL(uploadedFile);
      setPreviewUrl(objectUrl);
      setKey((prevKey) => prevKey + 1);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else if (field.value && typeof field.value === 'string') {
      setPreviewUrl(field.value);
      setKey((prevKey) => prevKey + 1);
    }
  }, [uploadedFile, field.value]);

  if (!previewUrl) {
    return null;
  }

  return (
    <div>
      <video key={key} width="240" height="240" controls>
        <source src={previewUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoInput;
