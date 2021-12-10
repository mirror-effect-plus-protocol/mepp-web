import React from 'react';
import {
  useRedirect,
  useTranslate,
} from 'react-admin';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const BackButton = ({ patientUid, basePath }) => {
  const redirect = useRedirect();
  const t = useTranslate();
  const handleBack = (e) => {
    if (patientUid) {
      redirect(`/patients/${patientUid}/show`);
    } else {
      redirect(basePath);
    }
  };

  return (
    <Button
      startIcon={<ArrowBackIosIcon/>}
      size="small"
      onClick={handleBack}
      color="secondary"
      variant="contained"
    >
      {t('admin.shared.labels.backButton')}
    </Button>
  );
};

export default BackButton;
