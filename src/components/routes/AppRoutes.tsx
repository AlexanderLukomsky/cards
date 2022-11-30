import { Navigate, Route, Routes } from 'react-router-dom';

import { appPath } from './path';

import { Login } from 'features/auth/login';
import { NewPassword } from 'features/auth/new-password';
import { Registration } from 'features/auth/registration';
import { RestorePassword } from 'features/auth/restore-password';
import { Main } from 'features/main';

export const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path={appPath.MAIN} element={<Main />} />
      <Route path="/" element={<Navigate to={appPath.MAIN} />} />

      <Route path={appPath.LOGIN} element={<Login />} />
      <Route path={appPath.REGISTRATION} element={<Registration />} />
      <Route path={appPath.RESTORE_PASSWORD} element={<RestorePassword />} />
      <Route path={appPath.NEW_PASSWORD} element={<NewPassword />} />
    </Routes>
  );
};
