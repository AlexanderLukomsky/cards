import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { LearningWindow } from './learning-window';
import style from './learning.module.scss';

import {
  selectLearningIsInitialized,
  selectLearningNotice,
  selectLearningStatus,
} from 'common/selectors';
import { BackLinkButton } from 'components/back-link-button';
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
      <BackLinkButton path={appPath.PACKS} />
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
