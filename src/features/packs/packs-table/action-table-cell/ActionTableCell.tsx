import { FC } from 'react';

import TableCell from '@mui/material/TableCell';

import style from './actionTableCell.module.scss';

import edit from 'common/assets/icons/edit.svg';
import teach from 'common/assets/icons/teach.svg';
import trash from 'common/assets/icons/trash.svg';

export const ActionTableCell: FC<ActionTableCellPropsType> = ({
  authUserID,
  packUserID,
  openDeleteModal,
  openEditModal,
  cardsCount,
  learnPack,
}) => {
  return (
    <TableCell align="center" className={style.action}>
      <button
        type="button"
        onClick={learnPack}
        disabled={cardsCount === 0}
        className={style.action__button}
      >
        <img src={teach} alt="learn pack" />
      </button>
      {authUserID === packUserID && (
        <>
          <button
            type="button"
            onClick={() => {
              openEditModal();
            }}
            className={style.action__button}
          >
            <img src={edit} alt="edit pack" />
          </button>
          <button
            type="button"
            onClick={() => {
              openDeleteModal();
            }}
            className={style.action__button}
          >
            <img src={trash} alt="delete pack" />
          </button>
        </>
      )}
    </TableCell>
  );
};
type ActionTableCellPropsType = {
  learnPack: () => void;
  packUserID: string;
  authUserID: string;
  openDeleteModal: () => void;
  openEditModal: () => void;
  cardsCount: number;
};
