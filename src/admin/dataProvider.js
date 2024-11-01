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
import djangoRestFrameworkProvider, {
  fetchJsonWithAuthToken,
} from 'ra-data-django-rest-framework';
import { withLifecycleCallbacks } from 'react-admin';

const preparePayload = async (params) => {
   // Freshly dropped pictures are File objects and must be converted to base64 strings
  const newMedia = [];
  const formerMedia = [];
  const newMediaKeys = [];
  const formerMediaKeys = [];
  Object.keys(params.data).forEach((key) => {
    const rawFile = params.data[key]?.rawFile;
    if (rawFile && rawFile instanceof File) {
      newMedia.push(params.data[key]);
      newMediaKeys.push(key);
    }

    if (rawFile && !(rawFile instanceof File)) {
      formerMedia.push(params.data[key]);
      formerMediaKeys.push(key);
    }
  });

  for (let index = 0; index < newMediaKeys.length; index++) {
    const key = newMediaKeys[index];
    // Wait for the base64 conversion to complete
    const base64Result = await convertFileToBase64(newMedia[index]);
    // Assign the result to the params.data object
    params.data[key] = {
      'base64': base64Result,
      'filename': newMedia[index].title,
    };
  }
  return params;
};

const convertFileToBase64 = async (file) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file.rawFile);
  });
};

const dataProvider = withLifecycleCallbacks(
  djangoRestFrameworkProvider(process.env.API_ENDPOINT, fetchJsonWithAuthToken),
  [
    {
      /**
       * For posts update only, convert uploaded images to base 64 and attach them to
       * the `picture` sent property, with `src` and `title` attributes.
       */
      resource: 'exercises',
      beforeCreate: async (params) => {
        const payload = await preparePayload(params);
        return payload;
      },
      beforeUpdate: async (params) => {
        const payload = await preparePayload(params);
        return payload;
      },
    },
  ],
);

export default dataProvider;
