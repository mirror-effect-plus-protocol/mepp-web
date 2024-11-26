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
import React, { useState } from 'react';
import { useGetList, useTranslate } from 'react-admin';

import {
  Close,
  FilterList,
  KeyboardArrowRightRounded,
  KeyboardArrowDownRounded,
} from '@mui/icons-material';
import {
  Modal,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button,
  Divider,
  Typography,
} from '@mui/material';
import { keyframes } from '@mui/system';

import { useLocale } from '@hooks/locale/useLocale';

const styles = {
  list: {
    padding: 0,
    '& .MuiListItemText-root': {
      zIndex: 0,
    },
  },

  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    maxHeight: '90vh',
    overflowY: 'auto',
    padding: 2,
    boxShadow: 24,
    borderRadius: 4,
    animation: `${keyframes`
      from { opacity: 0; transform: translate(-50%, -40%); }
      to { opacity: 1; transform: translate(-50%, -50%); }
    `} 0.5s ease`,
  },
};

const CategoryFilter = ({ categories, level, onSelect }) => {
  const { locale } = useLocale();
  const [activeIndex, setActiveIndex] = useState(null);

  const CategorySublist = ({ category, level }) => {
    return (
      <div
        style={{
          paddingLeft: 10,
          backgroundColor: 'rgba(0,0,0,.035)',
        }}
      >
        <CategoryFilter
          level={level}
          categories={category.children}
          onSelect={onSelect}
        />
      </div>
    );
  };

  return (
    <List sx={{ ...styles.list }}>
      {categories.map((category, index) => {
        return (
          <div key={category.id}>
            <ListItem
              sx={{
                '&.Mui-selected  .MuiListItemText-primary': {
                  fontWeight: 'bold',
                },
                padding: 0,
              }}
              selected={index === activeIndex}
            >
              <ListItemButton
                onClick={() => {
                  setActiveIndex(activeIndex === index ? null : index);
                }}
              >
                {activeIndex === index && <KeyboardArrowDownRounded />}
                {activeIndex !== index && <KeyboardArrowRightRounded />}
                <ListItemText primary={category.i18n.name[locale]} />
              </ListItemButton>
            </ListItem>
            {activeIndex === index && category.children.length > 0 && (
              <CategorySublist category={category} level={level + 1} />
            )}
            {activeIndex === index && category.children.length === 0 && (
              <ExerciceFilterHandle
                category={category}
                level={level}
                onSelect={onSelect}
              />
            )}
          </div>
        );
      })}
    </List>
  );
};

const CategoryFilterHandle = ({ onSelect }) => {
  const { locale } = useLocale();
  const { data: categories, isLoading } = useGetList('categories', {
    pagination: { page: 1, perPage: 9999 },
    sort: { field: `i18n.name.${locale}`, order: 'ASC' },
    filter: { language: locale },
  });

  return (
    <>
      {!isLoading && (
        <>
          <CategoryFilter
            level={0}
            categories={categories}
            onSelect={onSelect}
          />
        </>
      )}
    </>
  );
};

const ExerciceFilterHandle = ({ category, level, onSelect }) => {
  const { locale } = useLocale();
  const t = useTranslate();
  const { data: exercices, isLoading } = useGetList('exercises', {
    pagination: { page: 1, perPage: 9999 },
    filter: {
      language: locale,
      archived: false,
      [`category${level}__uid`]: category.id,
      category__uid: category.children.length ? false : category.id,
    },
  });

  return (
    <List sx={{ ...styles.list }}>
      {isLoading && (
        <ListItem sx={{ paddingLeft: 2 }}>
          <ListItemText
            primary={t('admin.shared.text.exerciseFilter.loading')}
          />
        </ListItem>
      )}
      {!isLoading && exercices.length === 0 && (
        <ListItem sx={{ paddingLeft: 2 }}>
          <ListItemText
            primary={t('admin.shared.text.exerciseFilter.notfound')}
          />
        </ListItem>
      )}
      {!isLoading &&
        exercices.map((exercice) => {
          return (
            <div key={exercice.id}>
              <ListItem
                key={exercice.id}
                sx={{ padding: 0, backgroundColor: '#fff' }}
              >
                <ListItemButton
                  onClick={() => {
                    onSelect(exercice);
                  }}
                >
                  <ListItemText primary={exercice.i18n.description[locale]} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          );
        })}
    </List>
  );
};

const ExerciceFilterModal = ({ buttonLabel, buttonIcon, onSelect }) => {
  const [open, setOpen] = useState(false);
  const t = useTranslate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.modal}>
          <div
            style={{
              display: 'flex',
              marginBottom: 20,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6" component="h2">
              {t('admin.shared.labels.modal.title.exercise_filter')}
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </div>
          <Divider />
          <CategoryFilterHandle
            onSelect={
              onSelect
                ? (exercice) => {
                    handleClose();
                    onSelect(exercice);
                  }
                : null
            }
          />
          <Divider />
        </Box>
      </Modal>

      <Button
        onClick={handleOpen}
        size="small"
        variant="outlined"
        color="primary"
        startIcon={buttonIcon ? buttonIcon : <FilterList />}
      >
        {buttonLabel ? buttonLabel : t('admin.shared.labels.filterButton')}
      </Button>
    </>
  );
};

export { ExerciceFilterModal };
