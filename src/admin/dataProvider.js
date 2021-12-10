import djangoRestFrameworkProvider, {
  fetchJsonWithAuthToken,
} from 'ra-data-django-rest-framework';

const dataProvider = djangoRestFrameworkProvider(
  process.env.API_ENDPOINT,
  fetchJsonWithAuthToken,
);

export default dataProvider;
