import { useEffect } from 'react';

import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { LearningWindow } from './learning-window';
import styles from './learning.module.scss';

import backIcon from 'common/assets/icons/back.png';
import {
  selectLearningIsInitialized,
  selectLearningNotice,
  selectLearningStatus,
} from 'common/selectors';
import { CustomizedSnackbar } from 'components/customized-snackbar';
import { appPath } from 'components/routes/path';
import { useAppDispatch } from 'store/hooks';
import { getAllCards, setNotice } from 'store/reducers/learning-reducer';

export const Learning = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const initialized = useSelector(selectLearningIsInitialized);
  const status = useSelector(selectLearningStatus);
  const notice = useSelector(selectLearningNotice);
  const param = useParams<{ id: string }>();

  const onCloseSnackbar = (): void => {
    dispatch(setNotice({ notice: '' }));
  };

  useEffect(() => {
    if (param.id) {
      dispatch(getAllCards(param.id));
    }
  }, [dispatch, param]);

  if (!initialized) {
    return (
      <CircularProgress
        style={{ zIndex: '3', position: 'absolute', left: '50vw', top: '50vh' }}
      />
    );
  }

  return (
    <div className={styles.container}>
      {status === 'pending' && (
        <CircularProgress
          style={{ zIndex: '3', position: 'absolute', left: '50vw', top: '50vh' }}
        />
      )}
      <NavLink to={appPath.PACKS} className={styles.link}>
        <img src={backIcon} alt="back" /> Back to Packs list
      </NavLink>
      <LearningWindow />
      <CustomizedSnackbar
        message={notice}
        isOpen={!!notice}
        onClose={onCloseSnackbar}
        isError
      />
    </div>
  );
};
