import { FC } from 'react';

import { Table, TableContainer } from '@mui/material';

import styles from './cardsTable.module.scss';
import { TableCardBody } from './table-card-body';
import { TableCardHead } from './table-card-head';

export const CardsTable: FC<CardsTablePropsType> = ({ packId, isOwner }) => {
  return (
    <div className={styles.container}>
      <TableContainer className={styles.table}>
        <Table aria-label="simple table">
          <TableCardHead packId={packId} isOwner={isOwner} />
          <TableCardBody isOwner={isOwner} />
        </Table>
      </TableContainer>
    </div>
  );
};

type CardsTablePropsType = {
  packId: string;
  isOwner: boolean;
};
