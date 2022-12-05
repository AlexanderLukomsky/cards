import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { LearningWindow } from './learning-window';
import style from './learning.module.scss';

import backIcon from 'common/assets/icons/back.png';
import {
  selectLearningIsInitialized,
  selectLearningNotice,
  selectLearningStatus,
} from 'common/selectors';
import { CustomizedSnackbar } from 'components/customized-snackbar';
import { LoaderFullSize } from 'components/loader-full-size';
import { ParticlesContainer } from 'components/particles-container';
import { appPath } from 'components/routes/path';
import { useAppDispatch } from 'store/hooks';
import {
  getAllCards,
  setIsInitialized,
  setNotice,
} from 'store/reducers/learning-reducer';

export const Learning = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const isInitialized = useSelector(selectLearningIsInitialized);
  const status = useSelector(selectLearningStatus);
  const notice = useSelector(selectLearningNotice);
  const param = useParams<{ id: string }>();

  const handleCloseSnackbar = (): void => {
    dispatch(setNotice({ notice: '' }));
  };

  useEffect(() => {
    if (param.id) {
      dispatch(getAllCards(param.id));
    }

    return () => {
      dispatch(setIsInitialized(false));
    };
  }, [dispatch, param]);

  if (!isInitialized) {
    return <LoaderFullSize />;
  }

  return (
    <div className={style.learning_page}>
      <ParticlesContainer />
      <NavLink to={appPath.PACKS} className={style.back_link}>
        <img src={backIcon} alt="back" />
        <span>Back to Packs list</span>
      </NavLink>
      <LearningWindow />
      <CustomizedSnackbar
        message={notice}
        isOpen={!!notice}
        onClose={handleCloseSnackbar}
        isError
      />
      {status === 'pending' && <LoaderFullSize />}
    </div>
  );
};
