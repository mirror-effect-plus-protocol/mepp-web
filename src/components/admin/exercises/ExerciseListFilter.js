import React, { useEffect, useState } from 'react';
import {
  useListContext,
  useGetList,
  useTranslate,
  useStore,
} from 'react-admin';

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

const ExerciseListFilter = ({ categories, level, onSelect, storekey }) => {
  const { locale } = useLocale();
  const [activeIndex, setActiveIndex] = useStore(
    `${storekey}_${categories[level] ? categories[level].id : level + 'last'}`,
    null,
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
          storekey={storekey}
          onSelect={onSelect}
          categories={category.children}
          level={level}
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
          <ExerciseListFilterHandle
            storekey={storekey ? storekey : 'CategoriesActiveIndex'}
            onSelect={
              onSelect
                ? (category) => {
                    handleClose();
                    onSelect && onSelect(category);
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
          ></div>
        </Box>
      </Modal>

      <Button
        onClick={handleOpen}
        size="small"
        variant="outlined"
        color="primary"
        startIcon={buttonIcon ? buttonIcon : <FilterListIcon />}
      >
        {buttonLabel ? buttonLabel : t('admin.shared.labels.filterButton')}
      </Button>
    </>
  );
};

const ExerciseListFilterCancelButton = ({ onClick }) => {
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
    onClick && onClick();
  };

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
  ExerciseListFilterCancelButton,
  ExerciseListFilterHandle,
};
export { ExerciseListFilterModal };
