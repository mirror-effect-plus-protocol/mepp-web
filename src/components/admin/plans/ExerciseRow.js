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

import React, { Fragment, useState } from 'react';
import {
  NumberInput,
  TextInput,
  useLocale,
  useTranslate,
} from 'react-admin';
import {
  useAutocompleteStyles,
  useNumberStyles
} from '@components/admin/plans/styles';
import { useForm } from 'react-hook-form';
import { fetchJsonWithAuthToken } from 'ra-data-django-rest-framework';
import {
  Button,
  CircularProgress,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  TextField as TextFieldMui
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { validateNumber } from '@components/admin/shared/validators';
import DropDown from '@components/admin/shared/inputs/Dropdown';


const ExerciseRow = (props) => {

  const t = useTranslate();
  const locale = useLocale();
  const numberClasses = useNumberStyles();
  const autocompleteClasses = useAutocompleteStyles();
  const [uid, setUid] = useState('');
  const [movementDuration, setMovementDuration] = useState(5);
  const [pause, setPause] = useState(5);
  const [repeat, setRepeat] = useState(5);
  const [description, setDescription] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [loadingExercises, setLoadingExercises] = useState(undefined);
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const form = useForm();
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
    setRepeat(exercise.repeat);
  }
  const handleSelectExercise = () => {

    form.change(`${props.source}.i18n.description.${locale}`, description);
    form.change(`${props.source}.movement_duration`, movementDuration);
    form.change(`${props.source}.pause`, pause);
    form.change(`${props.source}.repeat`, repeat);
    form.change(`${props.source}.id`, uid);
    setOpenDialog(false);
  };

  return (
    <div>
      <TextInput
        type="hidden"
        label=""
        source={`${props.source}.id`}
        style={{display: 'none'}}
      />
      <TextInput
        source={`${props.source}.i18n.description.${locale}`}
        label={t('resources.plans.fields.exercise.description')}
        onClick={handleOpenDialog}
        multiline={true}
        fullWidth={true}
      />
      <div className={numberClasses.numbers}>
        <NumberInput
          source={`${props.source}.movement_duration`}
          validate={validateNumber}
          label={t('resources.plans.fields.exercise.movement_duration')}
        />
        <NumberInput
          source={`${props.source}.pause`}
          validate={validateNumber}
          label={t('resources.plans.fields.exercise.pause')}
        />
        <NumberInput
          source={`${props.source}.repeat`}
          validate={validateNumber}
          label={t('resources.plans.fields.exercise.repeat')}
        />
      </div>
      <Dialog
        open={openDialog}
      >
        <DialogTitle>{t('resources.plans.card.exercise_dialog.title')}</DialogTitle>
        <DialogContent>
          <div>
            <DropDown
              choices={props.categories}
              onChange={handleCategoryChange}
              label={t('resources.plans.card.exercise_dialog.labels.autocomplete.category')}
            />
            <DropDown
              choices={subCategories}
              onChange={handleSubCategoryChange}
              label={t('resources.plans.card.exercise_dialog.labels.autocomplete.sub_category')}
              emptyLabel={t('resources.plans.card.exercise_dialog.labels.autocomplete.sub_category_empty_label')}
            />
            <Autocomplete
              classes={autocompleteClasses}
              options={exerciseOptions}
              autoHighlight
              loading={loadingExercises}
              onChange={handleExerciseChange}
              getOptionLabel={(option) => option.i18n.description[locale]}
              renderInput={(params) => (
                <TextFieldMui {...params}
                  label={t('resources.plans.card.exercise_dialog.labels.autocomplete.exercise')}
                  variant="filled"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Fragment>
                        {loadingExercises ? <CircularProgress color="inherit" size={20} /> : null}
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
