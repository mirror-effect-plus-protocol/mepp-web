import {
  useTranslate,
  useLocale,
} from 'react-admin';
import { getPlaceHolder } from '@admin/utils/placeholder';

const CardTitle = ({ resource, record }) => {
  const t = useTranslate();
  const locale = useLocale();

  if (!record.hasOwnProperty('id')) {
    return t(`resources.${resource}.card.title.create`);
  } else {
    let placeholder = getPlaceHolder(record, locale);

    return t(`resources.${resource}.card.title.default`, {
      placeholder: placeholder,
    });
  }

};

export default CardTitle;
