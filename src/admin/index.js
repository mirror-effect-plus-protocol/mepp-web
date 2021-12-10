import React from 'react';
import { Admin, Resource } from 'react-admin';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

import UserIcon from '@material-ui/icons/People';

import Intro from '@pages/Intro';
import Login from '@pages/Login';
import Mirror from '@pages/Mirror';
import Privacy from '@pages/Privacy';
import ResetPassword from '@pages/ResetPassword';
import Terms from '@pages/Terms';

import withPage from '@hocs/withPage';

import {
  CategoryList,
} from '@components/admin/categories';
import {
  ClinicianCreate,
  ClinicianEdit,
  ClinicianList,
  ClinicianShow,
} from '@components/admin/clinicians';
import Dashboard from '@components/admin/dashboard';
import {
  ExerciseCreate,
  ExerciseEdit,
  ExerciseList,
  ExerciseShow,
} from '@components/admin/exercises';
import {
  PatientCreate,
  PatientEdit,
  PatientList,
  PatientShow,
} from '@components/admin/patients';
import {
  PlanCreate,
  PlanEdit,
  PlanList,
  PlanShow,
} from '@components/admin/plans';
import { MeppAdminLayout } from '@components/admin/shared';
import { MeppTheme } from '@components/admin/shared/styles/theme';

import AuthProvider from './authProvider';
import DataProvider from './dataProvider';
import i18nProvider from './i18nProvider';

import {
  CategoryIcon,
  ClinicianIcon,
  ExerciseIcon,
  TreatmentPlanIcon,
} from '@components/admin/shared/icons';


export default () => {
  // with auth pages
  const IntroPage = withPage(Intro);
  const MirrorPage = withPage(Mirror);

  // without auth pages
  const LoginPage = withPage(Login);
  const PrivacyPage = withPage(Privacy);
  const TermsPage = withPage(Terms);
  const ResetPasswordPage = withPage(ResetPassword);

  return (
    <Admin
      theme={MeppTheme}
      layout={MeppAdminLayout}
      disableTelemetry
      dataProvider={DataProvider}
      authProvider={AuthProvider}
      i18nProvider={i18nProvider}
      loginPage={LoginPage}
      customRoutes={[
        <Route
          exact
          path="/privacy"
          component={(props) => <PrivacyPage {...props} />}
          noLayout
        />,
        <Route
          exact
          path="/termsofuse"
          component={(props) => <TermsPage {...props} />}
          noLayout
        />,
        <Route
          exact
          path="/reset-password"
          component={(props) => <ResetPasswordPage {...props} />}
          noLayout
        />,
        <Route
          exact
          path="/intro"
          component={(props) => <IntroPage {...props} />}
          noLayout
        />,
        <Route
          exact
          path="/mirror"
          component={(props) => <MirrorPage {...props} />}
          noLayout
        />,
      ]}
      dashboard={Dashboard}
    >
      {(permissions) => [
        // Admin panel for users
        ['admin', 'staff'].includes(permissions) && (
          <Resource
            name="patients"
            create={PatientCreate}
            edit={PatientEdit}
            list={PatientList}
            show={PatientShow}
            icon={UserIcon}
          />
        ),
        // Admin panel for exercises
        ['admin', 'staff'].includes(permissions) && (
          <Resource
            name="exercises"
            create={ExerciseCreate}
            edit={ExerciseEdit}
            list={ExerciseList}
            show={ExerciseShow}
            icon={ExerciseIcon}
          />
        ),
        // Admin panel for treatment plans
        ['admin', 'staff'].includes(permissions) && (
          <Resource
            name="plans"
            create={PlanCreate}
            edit={PlanEdit}
            list={PlanList}
            show={PlanShow}
            icon={TreatmentPlanIcon} />
        ),
        // Admin panel for clinicians
        ['admin', 'staff'].includes(permissions) && (
          <Resource
            name="clinicians"
            create={permissions === 'admin' && ClinicianCreate}
            edit={ClinicianEdit}
            list={permissions === 'admin' && ClinicianList}
            show={ClinicianShow}
            icon={ClinicianIcon}
          />
        ),
        // Admin panel for categories
        permissions !== 'user' && (
          <Resource
            name="categories"
            list={CategoryList}
            icon={CategoryIcon}
          />
        ),
        // Mirror app for patients
        permissions === 'user' && <Redirect to="/intro" />,
      ]}
    </Admin>
  );
};
