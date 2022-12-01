import { TableHead, TableRow } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import { useSelector } from 'react-redux';

import { SortByType, SortFrom, TableCellSort } from './table-cell-sort';

import { selectSortPacks } from 'common/selectors';
import { useAppDispatch } from 'store/hooks';
import { packsActions, SortType } from 'store/reducers/packs-reducer';

export const PacksTableHead = (): JSX.Element => {
  const { setSortPacks } = packsActions;

  const dispatch = useAppDispatch();

  const sortPacks = useSelector(selectSortPacks);

  const sortPacksHandler = (sortBy: SortByType): void => {
    if (sortPacks === null || sortPacks.slice(1, sortPacks.length) !== sortBy) {
      dispatch(setSortPacks(`${SortFrom.largest}${sortBy}`));
    } else {
      const sortValue: SortType =
        sortPacks === `${SortFrom.smallest}${sortBy}`
          ? `${SortFrom.largest}${sortBy}`
          : `${SortFrom.smallest}${sortBy}`;

      dispatch(setSortPacks(sortValue));
    }
  };

  return (
    <TableHead>
      <TableRow style={{ height: '48px' }}>
        <TableCell align="center">Cover</TableCell>
        <TableCell style={{ padding: '10px' }}>Name</TableCell>
        <TableCellSort
          onClick={() => {
            sortPacksHandler('cardsCount');
          }}
          showArrow
          currentSort={sortPacks}
          sortBy="cardsCount"
          title="Cards"
          align="center"
        />
        <TableCellSort
          onClick={() => {
            sortPacksHandler('updated');
          }}
          showArrow
          currentSort={sortPacks}
          sortBy="updated"
          title="Last Updated"
          align="center"
        />
        <TableCellSort
          onClick={() => {
            sortPacksHandler('created');
          }}
          title="Created by"
          align="center"
        />
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};
