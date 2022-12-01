import { FC } from 'react';

import style from './packsFooter.module.scss';

import { CustomPagination } from 'components/custom-pagination';
import { CustomSelect } from 'components/custom-select';

export const PacksFooter: FC<PacksFooterPropsType> = ({
  onChangePage,
  onChangePageCount,
  page,
  cardPacksTotalCount,
  pageCount,
}) => {
  return (
    <div className={style.footer}>
      <CustomPagination
        onClick={onChangePage}
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
  onChangePage: (page: number) => void;
  onChangePageCount: (pageCount: number) => void;
  page: number;
  cardPacksTotalCount: number;
  pageCount: number;
};
