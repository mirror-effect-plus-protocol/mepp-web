import React, { useEffect, useState } from 'react';
import { useListContext, useGetList, useStore } from 'react-admin';

import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Modal,
  Box,
  IconButton,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

import { useLocale } from '@hooks/locale/useLocale';

const styles = {
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
  },
  modalHeader: {
    marginBottom: '1rem',
  },
  levelContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    marginBottom: '1rem',
    alignItems: 'stretch', // Pour étirer les conteneurs à la même hauteur
  },
  categoryList: {
    flex: 1,
    height: '400px', // Hauteur fixe pour uniformiser les conteneurs
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    padding: '0.5rem',
    overflowY: 'auto',
  },
  categoryListItem: {
    cursor: 'pointer',
  },
};

const DynamicCategoryFilterModal = ({
  categories,
  locale,
  level,
  onCategoryClick,
  activePath,
}) => {
  const handleCategoryClick = (category) => {
    onCategoryClick(category, level);
  };

  const isActiveLevel = activePath[level] !== undefined;

  return (
    <div style={styles.levelContainer}>
      <Paper elevation={3} style={styles.categoryList}>
        <List>
          {categories.map((category) => (
            <ListItem
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              style={styles.categoryListItem}
              selected={activePath[level]?.id === category.id}
            >
              <ListItemText primary={category.i18n.name[locale]} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Afficher les sous-catégories si la catégorie actuelle est active */}
      {isActiveLevel && activePath[level]?.children?.length > 0 && (
        <DynamicCategoryFilterModal
          categories={activePath[level].children}
          locale={locale}
          level={level + 1}
          onCategoryClick={onCategoryClick}
          activePath={activePath}
        />
      )}
    </div>
  );
};

const ExerciseListModalFilter = () => {
  const { filterValues, setFilters } = useListContext();
  const { locale } = useLocale();
  const { data: categories, isLoading } = useGetList('categories', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: `i18n.name.${locale}`, order: 'ASC' },
    filter: { language: locale },
  });
  const [open, setOpen] = useState(false);
  const [activePath, setActivePath] = useStore('categoriesActivePath', []);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleCategorySelect = (category, level) => {
    const filterKey = `category${level}__uid`;

    // Apply filter and update path to category
    setFilters({ ...filterValues, [filterKey]: category.id }, null);
    setFilters(
      {
        ...filterValues,
        [filterKey]: category.id,
        category__uid: category.children.length ? false : category.id,
      },
      null,
    );

    // Update the active path up to current level
    setActivePath((prev) => {
      const newPath = [...prev.slice(0, level), category];
      return newPath;
    });
  };

  const handleResetFilters = () => {
    setFilters({}, null);
    setActivePath([]);
    handleClose();
  };

  useEffect(() => {
    if (filterValues?.category__uid) {
      setOpen(false);
    }
  }, [filterValues]);

  return (
    <>
      {/* Modal pour la sélection de catégories */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="category-filter-modal"
        aria-describedby="category-filter-modal-description"
      >
        <Box sx={styles.modalContainer}>
          <Typography variant="h6" sx={styles.modalHeader}>
            Select Category Filters
          </Typography>

          {!isLoading && (
            <DynamicCategoryFilterModal
              categories={categories}
              locale={locale}
              level={0}
              onCategoryClick={handleCategorySelect}
              activePath={activePath}
            />
          )}
        </Box>
      </Modal>

      {/* Bouton pour ouvrir la modal */}
      <IconButton onClick={handleOpen} aria-label="Filter categories">
        <FilterListIcon />
      </IconButton>
    </>
  );
};

export default ExerciseListModalFilter;
