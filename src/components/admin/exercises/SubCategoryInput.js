import React from 'react';
import { SelectInput } from 'react-admin';


const SubCategoryInput = ({updatedSubCategoryInputs, subCategories, ...props}) => {
  let choices = [];
  if (updatedSubCategoryInputs.hasOwnProperty(props.source)) {
    choices = subCategories[updatedSubCategoryInputs[props.source]];
  } else if (props.hasOwnProperty('record') && props.record.hasOwnProperty('category__uid')) {
    choices = subCategories[props.record['category__uid']];
  }
  return (
    <SelectInput
        choices={choices}
        {...props}
    />
  );
};

export default SubCategoryInput;
