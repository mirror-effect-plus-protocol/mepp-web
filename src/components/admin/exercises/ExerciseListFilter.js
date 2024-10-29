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

const ExerciseListFilter = ({ categories, level, onSelect, storekey }) => {
  // store key name byu levels - default is an unique key
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
        <ExerciseListFilter
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

const ExerciseListFilterHandle = ({ onSelect, storekey }) => {
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
          <ExerciseListFilter
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

const ExerciseListFilterModal = ({
  buttonLabel,
  buttonIcon,
  onSelect,
  storekey,
}) => {
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
          <ExerciseListFilterHandle
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
            {storekey && (
              <ExerciseListFilterCancelButton onClick={handleClose} />
            )}
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

const ExerciseListFilterCancelButton = ({ onClick }) => {
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

    onClick && onClick();
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
      {t('admin.shared.labels.cancelButton')}
    </Button>
  );
};

export {
  ExerciseListFilter,
  ExerciseListFilterHandle,
  ExerciseListFilterCancelButton,
};
export { ExerciseListFilterModal };
