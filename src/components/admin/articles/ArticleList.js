import React from 'react';
import {
  CreateButton,
  DeleteWithConfirmButton,
  List,
  useListContext,
  usePermissions,
  useTranslate,
} from 'react-admin';
import { Card, CardContent, CardHeader, Typography, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import Spinner from '@components/admin/shared/Spinner';
import {useLocale} from "@hooks/locale/useLocale";
import {getPlaceHolder} from "@admin/utils/placeholder";


const CardGrid = () => {
  const t = useTranslate();
  const { locale } = useLocale();
  const { data, isLoading } = useListContext();
  const { permissions } = usePermissions();

  if (isLoading) return <Spinner />;

  return (
    <Grid container spacing={2} sx={{ boxShadow: 'none', backgroundColor: 'background.default' }}>
      {data.map(record => {
        const confirmTitle = t('resources.articles.delete.confirmTitle', {
          placeholder: getPlaceHolder(record, locale),
        });
        return (
          <Grid item key={record.id} xs={12}>
          <Card>
            <CardHeader
              title={`${record.i18n.title[locale]}`}
              action={
                permissions === 'admin' && (
                  <>
                    <IconButton
                      component={Link}
                      to={`/articles/${record.id}`}
                      title={t('ra.action.edit')}
                      size="small"

                    >
                      <EditIcon />
                    </IconButton>
                    <DeleteWithConfirmButton
                      record={record}
                      resource="articles"
                      label=""
                      size="medium"
                      confirmTitle={confirmTitle}
                      redirect="/"
                      mutationMode="pessimistic"
                      sx={{
                        '&.ra-delete-button': {
                          minWidth: 0,
                          padding: '8px',
                        },
                        color: 'error.main',
                        '& .MuiButton-startIcon': {
                          margin: '0 !important'
                        }
                      }}
                    />
                  </>
                )
              }
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                {`${record.i18n.description[locale]}`}
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                component="a"
                href={`${record.i18n.external_url[locale]}`}
                target="_blank"
              >
                {t('resources.articles.card.labels.more_details')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        );
      })}
    </Grid>
  );
};

export const ArticleList = props => {
  const t = useTranslate();
  const {locale} = useLocale();

  return (
    <List
      filterDefaultValues={{
        language: locale,
      }}
      resource="articles"
      perPage={25}
      {...props}
      actions={<CreateButton label={t('resources.articles.card.labels.add')} />}
      sx={{ '& .MuiPaper-root.RaList-content': {
          marginTop: '1em',
          boxShadow: 'none',
          backgroundColor: 'background.default'
        },
        '& .RaList-main': {
          marginTop: '1em',
        }
      }}
    >
      <CardGrid/>
    </List>
  );
};
