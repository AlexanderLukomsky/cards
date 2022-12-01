import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import styles from './cards.module.scss';

import backIcon from 'common/assets/icons/back.png';
import {
  selectAuthUserId,
  selectCardsNotice,
  selectCardsPackUserId,
  selectCardsStatus,
} from 'common/selectors';
import { CustomizedSnackbar } from 'components/customized-snackbar';
import { appPath } from 'components/routes/path';
import { useAppDispatch } from 'store/hooks';
import { setNotice } from 'store/reducers/cards-reducer';

export const Cards = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();

  const status = useSelector(selectCardsStatus);
  const userId = useSelector(selectAuthUserId);
  const ownerId = useSelector(selectCardsPackUserId);
  const notice = useSelector(selectCardsNotice);

  const packId = params.id ? params.id : '';

  const onCloseSnackbar = (): void => {
    dispatch(setNotice({ notice: '' }));
  };

  return (
    <div className={styles.container}>
      {status === 'pending' && (
        <CircularProgress
          style={{ zIndex: '3', position: 'absolute', left: '50vw', top: '50vh' }}
        />
      )}
      <NavLink to={appPath.PACKS} className={styles.link}>
        <img src={backIcon} alt="" /> Back to Packs list
      </NavLink>
      <CardsTable isOwner={userId === ownerId} packId={packId} />
      <CustomizedSnackbar
        message={notice}
        isOpen={!!notice}
        onClose={onCloseSnackbar}
        isError
      />
    </div>
  );
};
