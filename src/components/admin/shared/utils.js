import axios from 'axios';

const decodeHtmlEntities = (text) => {
  const element = document.createElement('div');
  if (text) {
    element.innerHTML = text;
    return element.textContent;
  }
  return '';
};

export const google_translate = async (text, language) => {
  let res = await axios.post(
  `https://translation.googleapis.com/language/translate/v2?key=${process.env['GOOGLE_TRANSLATE_API_KEY']}`,
  { q: text, target: language }
  );
  let translation = res.data.data.translations[0].translatedText;
  return decodeHtmlEntities(translation);
};
