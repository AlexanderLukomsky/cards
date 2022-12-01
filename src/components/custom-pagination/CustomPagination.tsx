import { ChangeEvent, FC } from 'react';

import Pagination from '@mui/material/Pagination';
import './customPagination.scss';

export const CustomPagination: FC<CustomPaginationPropsType> = ({
  page,
  totalCount,
  pageCount,
  onClick,
}) => {
  const pageTotalCount = Math.ceil(totalCount / pageCount);
  const onClickHandler = (event: ChangeEvent<unknown>, page: number): void => {
    onClick(page);
  };

  return (
    <div className="custom-pogination">
      <Pagination
        size="small"
        className="custom-pogination__nav"
        page={page}
        count={pageTotalCount}
        variant="outlined"
        shape="rounded"
        onChange={onClickHandler}
      />
    </div>
  );
};
type CustomPaginationPropsType = {
  page: number;
  totalCount: number;
  pageCount: number;
  onClick: (page: number) => void;
};
