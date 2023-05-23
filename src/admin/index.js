/*
 * MEPP - A web application to guide patients and clinicians in the process of
 * facial palsy rehabilitation, with the help of the mirror effect and principles
 * of motor learning
 * Copyright (C) 2021 MEPP <info@mirroreffectplus.org>
 *
 * This file is part of MEPP.
 *
 * MEPP is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * MEPP is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with MEPP.  If not, see <http://www.gnu.org/licenses/>.
 */
import React from 'react';
import { Admin, CustomRoutes, Resource } from 'react-admin';
import { Navigate } from 'react-router';
import { Route } from 'react-router-dom';

import UserIcon from '@mui/icons-material/People';

import Help from '@pages/Help';
import Intro from '@pages/Intro';
import Login from '@pages/Login';
import Mirror from '@pages/Mirror';
import PlayerStandalonePage from '@pages/PlayerStandAlone';
import Privacy from '@pages/Privacy';
import ResetPassword from '@pages/ResetPassword';
import Terms from '@pages/Terms';

import withPage from '@hocs/withPage';

import { CategoryList } from '@components/admin/categories';
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
import {
  CategoryIcon,
  ClinicianIcon,
  ExerciseIcon,
  TreatmentPlanIcon,
} from '@components/admin/shared/icons';
import { MeppTheme } from '@components/admin/shared/styles/theme';

import AuthProvider from './authProvider';
import DataProvider from './dataProvider';
import i18nProvider from './i18nProvider';

export default () => {
  // with auth pages
  const IntroPage = withPage(Intro);
  const MirrorPage = withPage(Mirror);

  // without auth pages
  const LoginPage = withPage(Login);
  const PrivacyPage = withPage(Privacy);
  const TermsPage = withPage(Terms);
  const HelpPage = withPage(Help);
  const ResetPasswordPage = withPage(ResetPassword);
  const PlayerAlone = withPage(PlayerStandalonePage);

  return (
    <Admin
      theme={MeppTheme}
      layout={MeppAdminLayout}
      disableTelemetry
      dataProvider={DataProvider}
      authProvider={AuthProvider}
      i18nProvider={i18nProvider}
      loginPage={LoginPage}
      dashboard={Dashboard}
    >
      <CustomRoutes noLayout>
        <Route exact path="/privacy" element={<PrivacyPage />} />
        <Route exact path="/termsofuse" element={<TermsPage />} />
        <Route exact path="/support" element={<HelpPage />} />
        <Route exact path="/reset-password" element={<ResetPasswordPage />} />
        <Route exact path="/intro" element={<IntroPage />} />
        <Route exact path="/mirror" element={<MirrorPage />} />
        {process.env.ENVIRONMENT !== 'production' ? (
          <Route exact path="/playerstandalone" component={<PlayerAlone />} />
        ) : null}
      </CustomRoutes>
      {(permissions) => (
        <>
          {['admin', 'staff'].includes(permissions) && (
            <Resource
              name="patients"
              create={PatientCreate}
              edit={PatientEdit}
              list={PatientList}
              show={PatientShow}
              icon={UserIcon}
            />
          )}
          ,
          {['admin', 'staff'].includes(permissions) && (
            <Resource
              name="exercises"
              create={ExerciseCreate}
              edit={ExerciseEdit}
              list={ExerciseList}
              show={ExerciseShow}
              icon={ExerciseIcon}
            />
          )}
          ,
          {['admin', 'staff'].includes(permissions) && (
            <Resource
              name="plans"
              create={PlanCreate}
              edit={PlanEdit}
              list={PlanList}
              show={PlanShow}
              icon={TreatmentPlanIcon}
            />
          )}
          ,
          {['admin', 'staff'].includes(permissions) && (
            <Resource
              name="clinicians"
              create={permissions === 'admin' && ClinicianCreate}
              edit={ClinicianEdit}
              list={permissions === 'admin' && ClinicianList}
              show={ClinicianShow}
              icon={ClinicianIcon}
            />
          )}
          ,
          {permissions !== 'user' && (
            <Resource
              name="categories"
              list={CategoryList}
              icon={CategoryIcon}
            />
          )}
          ,{permissions === 'user' && <Navigate to="/intro" />}
        </>
      )}
    </Admin>
  );
};
