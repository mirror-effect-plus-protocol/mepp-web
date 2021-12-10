import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import {
  CloneButton,
  DeleteButton,
  useTranslate,
  useLocale,
} from 'react-admin';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Queue from '@material-ui/icons/Queue';

import ToggleArchiveButton from '../buttons/ToggleArchiveButton';
import ToggleActiveButton from '../buttons/ToggleActiveButton';
import CRUDButton from '@components/admin/shared/buttons/CRUDButton';
import { getPlaceHolder } from '@admin/utils/placeholder';

const useRowActionToolbarStyles = makeStyles({
  toolbar: {
    textAlign: 'right',
    whiteSpace: 'nowrap',
  },
  icon_action_button: {
    minWidth: '40px;',
    '& svg': { fontSize: '1.35rem' },
  },
});

const RowActionToolbar = ({clonable, activable, permissions, ...props}) => {
  const t = useTranslate();
  const locale = useLocale();
  const classes = useRowActionToolbarStyles();
  const confirmTitle = t('resources.' + props.resource + '.delete.confirmTitle', {
    placeholder: getPlaceHolder(props.record, locale),
  });
  const archiveTitle = props.record.archived
    ? 'admin.shared.labels.unarchiveButton'
    : 'admin.shared.labels.archiveButton';
  const activeTitle = props.record.active
    ? 'admin.shared.labels.deactivateButton'
    : 'admin.shared.labels.activateButton';

  // Row is editable by default
  const isSystem = props.record.hasOwnProperty('is_system') && props.record.is_system;
  const editable = !isSystem || permissions === 'admin';
  const context = props.hasOwnProperty('context') && props.context;

  return (
    <div className={classes.toolbar}>
      <Tooltip title={t('ra.action.show')} arrow>
        <span>
          <CRUDButton
            basePath={props.basePath}
            record={props.record}
            className={classes.icon_action_button}
            type="show"
            size="small"
            context={context}
            color="secondary"
          />
        </span>
      </Tooltip>
      {editable &&
        <Tooltip title={t(archiveTitle)} arrow>
          <span>
            <ToggleArchiveButton
              resource={props.rowResource || props.resource}
              basePath={props.basePath}
              record={props.record}
              className={classes.icon_action_button}
              showLabel={false}
              redirectToBasePath={false}
              size="small"
              color="secondary"
            />
          </span>
        </Tooltip>
      }
      {editable && !props.record.archived && (
        <Tooltip title={t('ra.action.edit')} arrow>
          <span>
            <CRUDButton
              basePath={props.basePath}
              resource={props.rowResource || props.resource}
              record={props.record}
              className={classes.icon_action_button}
              type="edit"
              context={context}
              size="small"
              color="secondary"
            />
          </span>
        </Tooltip>
      )}
      {clonable &&
        <Tooltip
          title={
            context
              ? t('resources.patients.card.actions.copy')
              : t('ra.action.clone')
          }
          arrow
        >
          <span>
            <CloneButton
              label=""
              basePath={props.basePath}
              record={props.record}
              resource={props.rowResource || props.resource}
              className={classes.icon_action_button}
              size="small"
              icon={
                context
                  ? <FileCopyIcon />
                  : <Queue />
              }
              color="secondary"
            />
          </span>
        </Tooltip>
      }
      {activable && !props.record.archived && (
        <Tooltip title={t(activeTitle)} arrow>
          <span>
            <ToggleActiveButton
              resource={props.rowResource || props.resource}
              basePath={props.basePath}
              record={props.record}
              className={classes.icon_action_button}
              showLabel={false}
              redirectToBasePath={false}
              size="small"
              color="secondary"
            />
          </span>
        </Tooltip>
      )}
      {permissions === 'admin' && props.record.archived && (
        <Tooltip title={t('ra.action.delete')} arrow>
          <span>
            <DeleteButton
              confirmTitle={confirmTitle}
              undoable={false}
              basePath={props.basePath}
              resource={props.rowResource || props.resource}
              label=""
              record={props.record}
              className={classes.icon_action_button}
              color="secondary"
            />
          </span>
        </Tooltip>
      )}
    </div>
  );
};

export default RowActionToolbar;
