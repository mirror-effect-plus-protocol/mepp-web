import React, { useEffect, useState } from 'react';
import { useListContext, useGetList, useTranslate } from 'react-admin';

import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  Modal,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button,
} from '@mui/material';
import Divider from '@mui/material/Divider';

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
  },
};

const ExerciseListFilter = ({
  idsAutoFill,
  vertical,
  categories,
  onSelect,
}) => {
  const { locale } = useLocale();
  const [activeIndex, setActiveIndex] = useState(null);
  const [autoFill] = useState(idsAutoFill);

  const Sublist = ({ category }) => {
    return (
      <div
        style={{
          paddingLeft: vertical ? 10 : 0,
          backgroundColor: 'rgba(0,0,0,.035)',
        }}
      >
        <ExerciseListFilter
          idsAutoFill={autoFill}
          vertical={vertical}
          categories={category.children}
          onSelect={onSelect}
        />
      </div>
    );
  };

  useEffect(() => {
    if (!autoFill) return;
    categories.map((category, index) => {
      if (autoFill.includes(category.id)) {
        setActiveIndex(index);
      }
    });
  }, [autoFill]);

  return (
    <List sx={styles.list}>
      {categories.map((category, index) => {
        return (
          <div key={category.id}>
            <ListItem
              sx={{
                '&.Mui-selected  .MuiListItemText-primary': {
                  fontWeight: vertical ? 'bold' : 'none',
                },
                padding: 0,
              }}
              selected={index === activeIndex}
            >
              <ListItemButton
                onClick={() => {
                  setActiveIndex(activeIndex === index ? null : index);
                  if (category.children.length === 0) onSelect(category, index);
                }}
              >
                {activeIndex === index && category.children.length > 0 && (
                  <KeyboardArrowDownRoundedIcon />
                )}
                {activeIndex !== index && category.children.length > 0 && (
                  <KeyboardArrowRightRoundedIcon />
                )}
                {activeIndex === index && category.children.length === 0 && (
                  <div style={styles.selected}></div>
                )}
                <ListItemText primary={category.i18n.name[locale]} />
              </ListItemButton>
              {!vertical &&
                activeIndex === index &&
                category.children.length > 0 && <Sublist category={category} />}
            </ListItem>
            {vertical &&
              activeIndex === index &&
              category.children.length > 0 && <Sublist category={category} />}
          </div>
        );
      })}
    </List>
  );
};
const ExerciseListFilterVertical = ({ idsAutoFill, onSelect }) => {
  return (
    <ExerciseListFilterHandle
      vertical
      idsAutoFill={idsAutoFill}
      onSelect={onSelect}
    />
  );
};

const ExerciseListFilterHandle = ({ idsAutoFill, vertical, onSelect }) => {
  const { filterValues, setFilters } = useListContext();
  const { locale } = useLocale();
  const { data: categories, isLoading } = useGetList('categories', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: `i18n.name.${locale}`, order: 'ASC' },
    filter: { language: locale },
  });

  const defaultSelect = (category, level) => {
    const filterKey = `category${level}__uid`;
    setFilters({ ...filterValues, [filterKey]: category.id }, null);
    setFilters(
      {
        ...filterValues,
        [filterKey]: category.id,
        category__uid: category.children.length ? false : category.id,
      },
      null,
    );
  };

  return (
    <>
      {!isLoading && (
        <>
          <ExerciseListFilter
            idsAutoFill={idsAutoFill}
            vertical={vertical}
            categories={categories}
            onSelect={onSelect ? onSelect : defaultSelect}
          />
        </>
      )}
    </>
  );
};

const ExerciseListFilterModal = () => {
  const { filterValues } = useListContext();
  const [open, setOpen] = useState(false);
  const t = useTranslate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (filterValues?.category__uid) {
      setOpen(false);
    }
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
              <CloseIcon />
            </IconButton>
          </div>
          <Divider />
          <ExerciseListFilterVertical />
          <Divider />
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 30,
            }}
          >
            <ExerciseListFilterCancel onClick={() => handleClose} />
          </div>
        </Box>
      </Modal>

      <Button
        onClick={handleOpen}
        size="small"
        variant="outlined"
        color="primary"
        startIcon={<FilterListIcon />}
      >
        {t('admin.shared.labels.filterButton')}
      </Button>
    </>
  );
};

const ExerciseListFilterCancel = () => {
  const { filterValues, setFilters } = useListContext();
  const [visible, setVisible] = useState(false);
  const t = useTranslate();

  const handleReset = () => {
    setFilters(
      {
        ['category0__uid']: 0,
        category__uid: false,
      },
      null,
    );
  };

  useEffect(() => {
    if (filterValues?.category__uid) {
      setVisible(true);
    } else setVisible(false);
  }, [filterValues, visible]);

  if (!visible) return <></>;
  return (
    <Button
      onClick={handleReset}
      autoFocus
      size="small"
      variant="outlined"
      color="primary"
      startIcon={<RestartAltIcon />}
    >
      {t('admin.shared.labels.cancelButton')}
    </Button>
  );
};

export {
  ExerciseListFilter,
  ExerciseListFilterCancel,
  ExerciseListFilterVertical,
  ExerciseListFilterHandle,
};
export { ExerciseListFilterModal };
