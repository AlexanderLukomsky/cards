import { ChangeEvent, FC } from 'react';

import Pagination from '@mui/material/Pagination';
import './customPagination.scss';

export const CustomPagination: FC<CustomPaginationPropsType> = ({
  page,
  totalCount,
  pageCount,
  onPageChangeHandler,
}) => {
  const pageTotalCount = Math.ceil(totalCount / pageCount);

  const handlePageChange = (event: ChangeEvent<unknown>, page: number): void => {
    onPageChangeHandler(page);
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
        onChange={handlePageChange}
      />
    </div>
  );
};
type CustomPaginationPropsType = {
  page: number;
  totalCount: number;
  pageCount: number;
  onPageChangeHandler: (page: number) => void;
};
