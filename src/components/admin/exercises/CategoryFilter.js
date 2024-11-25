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
import {
  useListContext,
  useGetList,
  useTranslate,
  useStore,
  useRemoveFromStore,
} from 'react-admin';

import {
  Close,
  FilterList,
  FilterListOffRounded,
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

import { useLocale } from '@hooks/locale/useLocale';

let globalModalOpen = false;

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
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Centre le modal
    width: '50%',
    bgcolor: 'background.paper',
    maxHeight: '90vh',
    overflowY: 'auto',
    padding: 2,
    boxShadow: 24, // Ajoute une ombre pour le modal
    borderRadius: 4, // Ajoute des coins arrondis si désiré
  },
};

const CategoryFilter = ({ categories, level, onSelect, storekey }) => {
  // store key name by levels - default is an unique key
  const key = storekey
    ? storekey +
      '_' +
      (categories[level] ? categories[level].id : level + 'last')
    : 'Categories_' + Math.random();

  const { locale } = useLocale();
  const [activeIndex, setActiveIndex] = useStore(key, null);
  const [activeIndexKeys, setActiveIndexKeys] = useStore(
    'CategoriesAllKeys',
    [],
  );

  const Sublist = ({ category, level }) => {
    return (
      <div
        style={{
          paddingLeft: 10,
          backgroundColor: 'rgba(0,0,0,.035)',
        }}
      >
        <CategoryFilter
          level={level}
          storekey={storekey}
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
                  setActiveIndexKeys([...activeIndexKeys, key]);
                  if (category.children.length === 0) {
                    onSelect(category);
                  }
                }}
              >
                {activeIndex === index && category.children.length > 0 && (
                  <KeyboardArrowDownRounded />
                )}
                {activeIndex !== index && category.children.length > 0 && (
                  <KeyboardArrowRightRounded />
                )}
                {activeIndex === index && category.children.length === 0 && (
                  <div style={styles.selected}></div>
                )}
                <ListItemText primary={category.i18n.name[locale]} />
              </ListItemButton>
            </ListItem>
            {activeIndex === index && category.children.length > 0 && (
              <Sublist category={category} level={level + 1} />
            )}
          </div>
        );
      })}
    </List>
  );
};

const CategoryFilterHandle = ({ onSelect, storekey }) => {
  const { filterValues, setFilters } = useListContext();
  const { locale } = useLocale();
  const { data: categories, isLoading } = useGetList('categories', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: `i18n.name.${locale}`, order: 'ASC' },
    filter: { language: locale },
  });

  // apply filter values (default action)
  const defaultSelect = (category, level) => {
    const filterKey = `category${level}__uid`;
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
          <CategoryFilter
            level={0}
            storekey={storekey}
            categories={categories}
            onSelect={onSelect ? onSelect : defaultSelect}
          />
        </>
      )}
    </>
  );
};

const CategoryFilterModal = ({
  buttonLabel,
  buttonIcon,
  onSelect,
  storekey,
  autoOpen,
}) => {
  const { filterValues } = useListContext();
  const [open, setOpen] = useState(false);
  const t = useTranslate();

  const handleOpen = () => {
    globalModalOpen = true;
    setOpen(true);
  };
  const handleClose = () => {
    globalModalOpen = false;
    setOpen(false);
  };

  // close after setting filter
  useEffect(() => {
    if (filterValues?.category__uid) setOpen(false);
  }, [filterValues]);

  useEffect(() => {
    if (autoOpen && !globalModalOpen) {
      handleOpen();
    }
  }, [autoOpen]);

  useEffect(() => {
    return () => {
      globalModalOpen = false;
    };
  }, []);

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
              {t('admin.shared.labels.modal.category_filter.title')}
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </div>
          <Divider />
          <CategoryFilterHandle
            storekey={
              storekey ? storekey : 'CategoriesActiveIndex' + Math.random()
            }
            onSelect={
              onSelect
                ? (category) => {
                    handleClose();
                    onSelect(category);
                  }
                : null
            }
          />
          <Divider />
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 30,
            }}
          >
            {storekey && <CategoryFilterCancelButton onClick={handleClose} />}
          </div>
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

const CategoryFilterCancelButton = () => {
  const { filterValues, setFilters } = useListContext();
  const [activeIndexKeys, setActiveIndexKeys] = useStore(
    'CategoriesAllKeys',
    [],
  );
  const removeItem = useRemoveFromStore();
  const [visible, setVisible] = useState(false);
  const t = useTranslate();

  // set filters
  const handleReset = () => {
    // reset applied filter
    setFilters(
      {
        ['category0__uid']: 0,
        category__uid: false,
      },
      null,
    );

    // remove all key from store (filter keys only)
    activeIndexKeys.forEach((key) => removeItem(key));
    setActiveIndexKeys([]);
  };

  // show button according when filters are selecting
  useEffect(() => {
    if (filterValues?.category__uid && filterValues?.category__uid !== -1) {
      setVisible(true);
    } else setVisible(false);
  }, [filterValues, visible]);

  if (!visible) return <></>;

  return (
    <Button
      onClick={handleReset}
      size="small"
      variant="text"
      color="primary"
      startIcon={<FilterListOffRounded />}
    >
      {t('admin.shared.labels.resetFilterButton')}
    </Button>
  );
};

export { CategoryFilterCancelButton, CategoryFilterModal };
