import { Navigate, Route, Routes } from 'react-router-dom';

import { appPath } from './path';

import { Login } from 'features/auth/login';
import { Main } from 'features/main';

export const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path={appPath.MAIN} element={<Main />} />
      <Route path="/" element={<Navigate to={appPath.MAIN} />} />
      <Route path={appPath.LOGIN} element={<Login />} />
    </Routes>
  );
};
