import { FC } from 'react';

import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

import { selectUsersPageCount, selectUsersTotalCount } from 'common/selectors';
import { StatusType } from 'common/types';
import { useAppDispatch } from 'store/hooks';
import { setUserPage } from 'store/reducers/users-reducer';

export const UsersShowNext: FC<UsersShowNextPropsType> = ({ page, status }) => {
  const dispatch = useAppDispatch();

  const pageCount = useSelector(selectUsersPageCount);

  const usersTotalCount = useSelector(selectUsersTotalCount);

  const isDisabled = page * pageCount >= usersTotalCount;

  const handleButtonClick = (): void => {
    dispatch(setUserPage(page + 1));
  };

  return (
    <Button
      disabled={isDisabled || status === 'pending'}
      onClick={handleButtonClick}
      variant="contained"
      size="large"
    >
      SHOW NEXT
    </Button>
  );
};

type UsersShowNextPropsType = {
  page: number;
  status: StatusType;
};
