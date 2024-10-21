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
import { fetchJsonWithAuthToken } from 'ra-data-django-rest-framework';
import React, { Fragment, useEffect, useState } from 'react';
import {
  FormDataConsumer,
  NumberInput,
  TextInput,
  useRecordContext,
  useTranslate,
} from 'react-admin';
import { useFormContext } from 'react-hook-form';

import CheckCircle from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField as TextFieldMui,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import { useLocale } from '@hooks/locale/useLocale';

import {
  useAutocompleteStyles,
  useNumberStyles,
} from '@components/admin/plans/styles';
import DropDown from '@components/admin/shared/inputs/Dropdown';
import { validateNumber } from '@components/admin/shared/validators';

const ExerciseRow = (props) => {
  const t = useTranslate();
  const { locale } = useLocale();
  const numberClasses = useNumberStyles();
  const autocompleteClasses = useAutocompleteStyles();
  const [uid, setUid] = useState('');
  const [movementDuration, setMovementDuration] = useState(5);
  const [pause, setPause] = useState(5);
  const [repetition, setRepetition] = useState(10);
  const [description, setDescription] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [loadingExercises, setLoadingExercises] = useState(undefined);
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const form = useFormContext();
  const record = useRecordContext();
  const exercises = form.watch('exercises', []);

  useEffect(() => {
    const sourceIndex = props.source.split('.')[1];
    exercises.forEach((exercise, index) => {
      if (index == sourceIndex && exercise === '') {
        form.setValue(`${props.source}.i18n.description.${locale}`, '');
        form.setValue(`${props.source}.movement_duration`, 18);
        form.setValue(`${props.source}.pause`, 70);
        form.setValue(`${props.source}.repetition`, 230);
        form.setValue(`${props.source}.id`, '');
      }
    });
  }, [exercises]);

  const getExercises = async (categoryUid, subCategoryUid) => {
    let url = `${process.env.API_ENDPOINT}/exercises/?page=1&page_size=9999&archived=false&language=${locale}&ordering=i18n__name`;
    if (categoryUid) {
      url += `&category__uid=${categoryUid}`;
    }
    if (subCategoryUid) {
      url += `&sub_category__uid=${subCategoryUid}`;
    }
    setLoadingExercises(true);
    const response = await fetchJsonWithAuthToken(url, {});
    setExerciseOptions(response.json.results);
    setLoadingExercises(false);
  };

  useEffect(() => {
    const index = props.source.split('.')[1];

    if (record && record.exercises[index]) {
      const exerciseUid = record.exercises[index].id;
      setUid(exerciseUid);
    }
  }, [record]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleCategoryChange = (event) => {
    const categoryUid = event.target.value;
    setCategory(categoryUid);
    setSubCategories(props.subCategories[categoryUid]);
    getExercises(categoryUid);
  };
  const handleSubCategoryChange = (event) => {
    const subCategoryUid = event.target.value;
    if (subCategoryUid) {
      getExercises(null, subCategoryUid);
    } else {
      getExercises(category);
    }
  };
  const handleExerciseChange = (event, exercise) => {
    setDescription(exercise.i18n.description[locale]);
    setUid(exercise.id);
    setMovementDuration(exercise.movement_duration);
    setPause(exercise.pause);
    setRepetition(exercise.repetition);
  };
  const handleSelectExercise = () => {
    form.setValue(`${props.source}.i18n.description.${locale}`, description);
    form.setValue(`${props.source}.movement_duration`, movementDuration);
    form.setValue(`${props.source}.pause`, pause);
    form.setValue(`${props.source}.repetition`, repetition);
    form.setValue(`${props.source}.id`, uid);
    setOpenDialog(false);
  };

  return (
    <div>
      <FormDataConsumer>
        {({ formData }) => {
          return (
            <input type="hidden" name={`${props.source}.id`} value={uid} />
          );
        }}
      </FormDataConsumer>
      <TextInput
        source={`${props.source}.i18n.description.${locale}`}
        label={t('resources.plans.fields.exercise.description')}
        onClick={handleOpenDialog}
        multiline
        fullWidth
        sx={{ minWidth: '500px' }}
      />
      <div className={numberClasses.numbers}>
        <NumberInput
          source={`${props.source}.movement_duration`}
          validate={validateNumber}
          label={t('resources.plans.fields.exercise.movement_duration')}
          defaultValue="10"
        />
        <NumberInput
          source={`${props.source}.pause`}
          validate={validateNumber}
          label={t('resources.plans.fields.exercise.pause')}
          defaultValue="5"
        />
        <NumberInput
          source={`${props.source}.repetition`}
          validate={validateNumber}
          label={t('resources.plans.fields.exercise.repetition')}
          defaultValue="10"
        />
      </div>
      <Dialog open={openDialog}>
        <DialogTitle>
          {t('resources.plans.card.exercise_dialog.title')}
        </DialogTitle>
        <DialogContent>
          <div>
            <DropDown
              choices={props.categories}
              onChange={handleCategoryChange}
              label={t(
                'resources.plans.card.exercise_dialog.labels.autocomplete.category',
              )}
            />
            <DropDown
              choices={subCategories}
              onChange={handleSubCategoryChange}
              label={t(
                'resources.plans.card.exercise_dialog.labels.autocomplete.sub_category',
              )}
              emptyLabel={t(
                'resources.plans.card.exercise_dialog.labels.autocomplete.sub_category_empty_label',
              )}
            />
            <Autocomplete
              classes={autocompleteClasses}
              options={exerciseOptions}
              autoHighlight
              loading={loadingExercises}
              onChange={handleExerciseChange}
              getOptionLabel={(option) => option.i18n.description[locale]}
              renderInput={(params) => (
                <TextFieldMui
                  {...params}
                  label={t(
                    'resources.plans.card.exercise_dialog.labels.autocomplete.exercise',
                  )}
                  variant="filled"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Fragment>
                        {loadingExercises ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </Fragment>
                    ),
                  }}
                />
              )}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            autoFocus
            size="small"
            color="secondary"
            variant="contained"
            startIcon={<ErrorOutlineIcon />}
          >
            {t('admin.shared.labels.cancelButton')}
          </Button>
          <Button
            onClick={handleSelectExercise}
            color="primary"
            size="small"
            variant="contained"
            startIcon={<CheckCircle />}
          >
            {t('admin.shared.labels.confirmButton')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ExerciseRow;
