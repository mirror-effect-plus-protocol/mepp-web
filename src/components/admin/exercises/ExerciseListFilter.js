import React, { useEffect, useState } from 'react';
import { useListContext, useGetList, Button } from 'react-admin';

import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import {
  Modal,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';

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

  const handleResetFilters = () => {
    setFilters({}, null);
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
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleResetFilters}
          >
            Reset
          </Button>
        </>
      )}
    </>
  );
};

const ExerciseListFilterModal = () => {
  const { filterValues } = useListContext();
  const [open, setOpen] = useState(false);

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
          <ExerciseListFilterVertical />
        </Box>
      </Modal>

      <IconButton onClick={handleOpen}>
        <FilterListIcon />
      </IconButton>
    </>
  );
};

export {
  ExerciseListFilter,
  ExerciseListFilterVertical,
  ExerciseListFilterHandle,
};
export { ExerciseListFilterModal };
