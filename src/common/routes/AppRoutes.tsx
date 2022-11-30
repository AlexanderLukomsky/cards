import { Navigate, Route, Routes } from 'react-router-dom';

import { appPath } from './path';

import { Main } from 'features/main';

export const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path={appPath.MAIN} element={<Main />} />
      <Route path="/" element={<Navigate to={appPath.MAIN} />} />
      {/* <Route path={appPath.FORM} element={<Forms />} />
      <Route path={appPath.PROFILE} element={<Profile />} />
      <Route path={appPath.PACKS} element={<PacksPage />} />
      <Route path={appPath.CARDS} element={<CardsPage />} /> */}
    </Routes>
  );
};
