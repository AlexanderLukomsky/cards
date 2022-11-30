import { Navigate, Route, Routes } from 'react-router-dom';

import { CardsPage } from '../CardsPage/CardsPage';
import { Forms } from '../Forms/Forms';
import { Main } from '../Main/Main';
import { PacksPage } from '../PacksPage/PacksPage';
import { Profile } from '../ProfilePage/ProfilePage';

import { _pagesPath } from './_path/pagesPath';

export const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path={_pagesPath.MAIN} element={<Main />} />
      <Route path="/" element={<Navigate to={_pagesPath.MAIN} />} />
      <Route path={_pagesPath.FORM} element={<Forms />} />
      <Route path={_pagesPath.PROFILE} element={<Profile />} />
      <Route path={_pagesPath.PACKS} element={<PacksPage />} />
      <Route path={_pagesPath.CARDS} element={<CardsPage />} />
    </Routes>
  );
};
