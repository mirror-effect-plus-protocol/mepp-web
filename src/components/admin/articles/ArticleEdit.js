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
import {
  FormDataConsumer,
  SimpleForm,
  TextInput,
  TranslatableInputs,
  useTranslate,
} from 'react-admin';

import GTranslateIcon from '@mui/icons-material/GTranslate';

import { useLocale } from '@hooks/locale/useLocale';

import { preSave } from '@components/admin/articles/callbacks';
import { Typography } from '@components/admin/shared/dom/sanitize';
import AutoTranslate from '@components/admin/shared/inputs/AutoTranslate';
import ResourceEdit from '@components/admin/shared/resources/ResourceEdit';
import { translatorInputStyle } from '@components/admin/shared/styles/shared';
import SimpleFormToolBar from '@components/admin/shared/toolbars/SimpleFormToolbar';
import { requiredLocalizedField } from '@components/admin/shared/validators';

import { LANGUAGES } from '../../../locales';

export const ArticleEdit = () => {
  const t = useTranslate();
  const { locale } = useLocale();

  const validateI18nTitle = (value, record) => {
    return requiredLocalizedField(value, record, locale, 'title');
  };
  const validateI18nDescription = (value, record) => {
    return requiredLocalizedField(value, record, locale, 'description');
  };
  const validateI18nExternalUrl = (value, record) => {
    return requiredLocalizedField(value, record, locale, 'external_url');
  };

  /* Update description translations if empty */
  const transform = (record) => {
    return preSave(record, locale);
  };

  return (
    <ResourceEdit redirect="/" transform={transform}>
      <SimpleForm toolbar={<SimpleFormToolBar identity={false} />}>
        <Typography variant="h6" gutterBottom>
          {t('resources.articles.card.labels.title')}
        </Typography>
        <TranslatableInputs
          locales={LANGUAGES}
          defaultLocale={locale}
          sx={translatorInputStyle}
        >
          <TextInput
            source="i18n.title"
            fullWidth
            validate={validateI18nTitle}
          />
          <div
            style={{
              fontSize: '0.7em',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gridGap:
                '10px' /* Adjust the value to add space between the image and text */,
              alignItems: 'center',
            }}
          >
            <GTranslateIcon/> {t('resources.shared.labels.translate_on_save')}
          </div>
          <div
            style={{
              fontSize: '0.7em',
            }}
          >
            <FormDataConsumer>
              {({formData}) => (
                <AutoTranslate source="auto_translate_title" data={formData}/>
              )}
            </FormDataConsumer>
          </div>
        </TranslatableInputs>
        <Typography variant="h6" gutterBottom>
          {t('resources.articles.card.labels.description')}
        </Typography>
        <TranslatableInputs
          locales={LANGUAGES}
          defaultLocale={locale}
          sx={translatorInputStyle}
        >
          <TextInput
            source="i18n.description"
            multiline
            fullWidth
            validate={validateI18nDescription}
          />
          <div
            style={{
              fontSize: '0.7em',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gridGap:
                '10px' /* Adjust the value to add space between the image and text */,
              alignItems: 'center',
            }}
          >
            <GTranslateIcon /> {t('resources.shared.labels.translate_on_save')}
          </div>
          <div
            style={{
              fontSize: '0.7em',
            }}
          >
            <FormDataConsumer>
              {({ formData }) => (
                <AutoTranslate source="auto_translate_description" data={formData} />
              )}
            </FormDataConsumer>
          </div>
        </TranslatableInputs>
        <Typography variant="h6" gutterBottom>
          {t('resources.articles.card.labels.external_url')}
        </Typography>
        <TranslatableInputs
          locales={LANGUAGES}
          defaultLocale={locale}
          sx={translatorInputStyle}
        >
          <TextInput
            source="i18n.external_url"
            fullWidth
            validate={validateI18nExternalUrl}
          />
          <div
            style={{
              fontSize: '0.7em',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gridGap:
                '10px' /* Adjust the value to add space between the image and text */,
              alignItems: 'center',
            }}
          >
            {t('resources.shared.labels.copy_on_save')}
          </div>
        </TranslatableInputs>
      </SimpleForm>
    </ResourceEdit>
  );
};
