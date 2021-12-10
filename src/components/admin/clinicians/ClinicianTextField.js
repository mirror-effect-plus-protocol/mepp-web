import React from 'react';
import {
  Labeled,
  ReferenceField,
  TextField,
  useTranslate,
} from 'react-admin';

const ClinicianTextField = ({ show, ...props }) => {
  const t = useTranslate();

  if (show) {
    return (
      <ReferenceField
        record={props.record}
        resource={props.resource}
        basePath={props.basePath}
        source="clinician_uid"
        reference="clinicians"
        link="show"
      >
        <Labeled
          record={props.record}
          resource={props.resource}
          basePath={props.basePath}
          label={t('resources.patients.fields.clinician_uid')}
          disabled={false}
        >
          <TextField
            record={props.record}
            resource={props.resource}
            basePath={props.basePath}
            source="full_name"
          />
        </Labeled>
      </ReferenceField>
    );
  } else {
    return <></>;
  }
};

export default ClinicianTextField;
