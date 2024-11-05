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
} from '@mui/material';
import { alpha } from '@mui/material';
import { blue } from '@mui/material/colors';
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
    position: 'absolute',
    right: '0',
    height: '100%',
    width: '50%',
    bgcolor: 'background.paper',
    overflowY: 'auto',
    padding: 2,
    animation: `${keyframes`
      from { transform: translateX(450px); }
      to { transform: translateY(0); }
    `} .5s ease`,
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
          <ListItemText primary="Chargement en cours..." />
        </ListItem>
      )}
      {!isLoading && exercices.length === 0 && (
        <ListItem sx={{ paddingLeft: 2 }}>
          <ListItemText primary="Aucun exercices trouvés dans cette catégorie!" />
        </ListItem>
      )}
      {!isLoading &&
        exercices.map((exercice) => {
          return (
            <>
              <ListItem
                key={exercice.id}
                sx={{ padding: 0, backgroundColor: alpha(blue[50], 0.35) }}
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
            </>
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
              justifyContent: 'flex-end',
              marginBottom: 20,
            }}
          >
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
