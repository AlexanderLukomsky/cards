import { FC } from 'react';

import style from './packsFooter.module.scss';

import { CustomPagination } from 'components/custom-pagination';
import { CustomSelect } from 'components/custom-select';

export const PacksFooter: FC<PacksFooterPropsType> = ({
  onPageChangeHandler,
  onChangePageCount,
  page,
  cardPacksTotalCount,
  pageCount,
}) => {
  return (
    <div className={style.footer}>
      <CustomPagination
        onPageChangeHandler={onPageChangeHandler}
        page={page}
        totalCount={cardPacksTotalCount}
        pageCount={pageCount}
      />
      <CustomSelect
        title="Packs per Page"
        onChange={onChangePageCount}
        defaultValue={pageCount}
      />
    </div>
  );
};
type PacksFooterPropsType = {
  onPageChangeHandler: (page: number) => void;
  onChangePageCount: (pageCount: number) => void;
  page: number;
  cardPacksTotalCount: number;
  pageCount: number;
};
