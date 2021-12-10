import React from 'react';
import { BooleanInput, Filter } from 'react-admin';

const ArchivableFilter = (props) => (
  <Filter {...props}>
    <BooleanInput source="archived" alwaysOn />
  </Filter>
);

export default ArchivableFilter;
