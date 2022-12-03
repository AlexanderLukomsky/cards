import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { CardsTable } from './cards-table';
import styles from './cards.module.scss';

import backIcon from 'common/assets/icons/back.png';
import {
  selectCardsIsInitialized,
  selectCardsNotice,
  selectCardsStatus,
} from 'common/selectors';
import { CustomizedSnackbar } from 'components/customized-snackbar';
import { LoaderFullSize } from 'components/loader-full-size';
import { appPath } from 'components/routes/path';
import { useAppDispatch } from 'store/hooks';
import { setNotice } from 'store/reducers/cards-reducer';

export const Cards = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const status = useSelector(selectCardsStatus);

  const notice = useSelector(selectCardsNotice);
  const isInitialized = useSelector(selectCardsIsInitialized);

  const handleCloseSnackbar = (): void => {
    dispatch(setNotice({ notice: '' }));
  };

  if (!isInitialized) {
    return <LoaderFullSize />;
  }

  return (
    <div className={styles.container}>
      <NavLink to={appPath.PACKS} className={styles.link}>
        <img src={backIcon} alt="" /> Back to Packs list
      </NavLink>
      <CardsTable />
      <CustomizedSnackbar
        message={notice}
        isOpen={!!notice}
        onClose={handleCloseSnackbar}
        isError={status === 'failed'}
      />
      {status === 'pending' && <LoaderFullSize />}
    </div>
  );
};
