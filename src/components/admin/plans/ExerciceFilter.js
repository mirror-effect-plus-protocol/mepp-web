import { fetchJsonWithAuthToken } from 'ra-data-django-rest-framework';
import React, { useEffect, useState } from 'react';
import { useListContext, useGetList, useTranslate } from 'react-admin';

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
  selected: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(7, 142, 228, .5)',
  },
  modal: {
    position: 'absolute',
    right: '0',
    height: '100%',
    minWidth: 400,
    bgcolor: 'background.paper',
    overflowY: 'auto',
    padding: 2,
    animation: `${keyframes`
      from { transform: translateX(450px); }
      to { transform: translateY(0); }
    `} .5s ease`,
  },
};

const ExerciceFilter = ({ categories, level, onSelect }) => {
  const { locale } = useLocale();
  const [activeIndex, setActiveIndex] = useState(null);

  const Sublist = ({ category, level }) => {
    return (
      <div
        style={{
          paddingLeft: 10,
          backgroundColor: 'rgba(0,0,0,.035)',
        }}
      >
        <ExerciceFilter
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
                  if (category.children.length === 0) onSelect(category);
                }}
              >
                {activeIndex === index && <KeyboardArrowDownRounded />}
                {activeIndex !== index && <KeyboardArrowRightRounded />}
                <ListItemText primary={category.i18n.name[locale]} />
              </ListItemButton>
            </ListItem>
            {activeIndex === index && category.children.length > 0 && (
              <Sublist category={category} level={level + 1} />
            )}
            {activeIndex === index && category.children.length < 0 && (
              <div>EXERCICES LIST HERE</div>
            )}
          </div>
        );
      })}
    </List>
  );
};

const ExerciceFilterHandle = () => {
  const { locale } = useLocale();
  const { data: categories, isLoading } = useGetList('categories', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: `i18n.name.${locale}`, order: 'ASC' },
    filter: { language: locale },
  });

  // get exercices from selected category
  const getExercices = async (category, level) => {
    let url = `${process.env.API_ENDPOINT}/exercises/?page=1&page_size=9999&archived=false&language=${locale}&ordering=i18n__name`;
    url += `&category${level}__uid=${category.id}`;
    url += `&category__uid=${category.children.length ? false : category.id}`;
    const response = await fetchJsonWithAuthToken(url, {});
    console.log(response.json.results);
    // onSelect('test');
    // setExerciseOptions(response.json.results);
    // setLoadingExercises(false);
  };

  return (
    <>
      {!isLoading && (
        <>
          <ExerciceFilter
            level={0}
            categories={categories}
            onSelect={getExercices}
          />
        </>
      )}
    </>
  );
};

const ExerciceFilterModal = ({ buttonLabel, buttonIcon, onSelect }) => {
  const { filterValues } = useListContext();
  const [open, setOpen] = useState(false);
  const t = useTranslate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // close after setting filter
  useEffect(() => {
    if (filterValues?.category__uid) setOpen(false);
  }, [filterValues]);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.modal}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: 20,
            }}
          >
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </div>
          <Divider />
          <ExerciceFilterHandle
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
