import { FC, useState } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { DeletePackModal, EditPackModal } from '../packs-modals';

import { ActionTableCell } from './action-table-cell';
import { PacksTableHead } from './packs-table-head';
import style from './packsTable.module.scss';

import { selectAuthUserId } from 'common/selectors';
import { StatusType } from 'common/types';
import { dateFormat, validationImage } from 'common/utils';
import { appPath } from 'components/routes/path';
import { useAppDispatch } from 'store/hooks';
import { deletePack, editPackName, PackType } from 'store/reducers/packs-reducer';

export const PacksTable: FC<PacksTablePropsType> = ({ packs, status }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authUserID = useSelector(selectAuthUserId);

  const [selectedPack, setSelectedPack] = useState<SelectedPackType>({
    packName: '',
    id: '',
    deckCover: null,
  });
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const openDeleteModal = (data: SelectedPackType): void => {
    setSelectedPack(data);
    setIsOpenDeleteModal(true);
  };

  const learnPackHandler = (id: string): void => {
    navigate(appPath.LEARNING_DEFAULT + id);
  };

  const onDeletePack = async (): Promise<void> => {
    const action = await dispatch(deletePack(selectedPack.id));

    if (deletePack.fulfilled.match(action)) {
      setIsOpenDeleteModal(false);
    }
    setSelectedPack({ packName: '', id: '', deckCover: null });
  };
  // edit pack name

  const openEditModal = (data: SelectedPackType): void => {
    setSelectedPack(data);
    setIsOpenEditModal(true);
  };
  const onCloseEditModal = (): void => {
    setIsOpenEditModal(false);
  };
  const onUpdatePackHandler = (value: { [key: string]: string | null }): void => {
    setSelectedPack(data => ({ ...data, ...value }));
  };
  const setEditPack = async (isPrivate: boolean): Promise<void> => {
    const { packName, id, deckCover } = selectedPack;
    const action = await dispatch(
      editPackName({ name: packName.trim(), _id: id, private: isPrivate, deckCover }),
    );

    if (editPackName.fulfilled.match(action)) {
      onCloseEditModal();
    }
  };
  const navigateToCards = (id: string): void => {
    navigate(`${appPath.CARDS_DEFAULT}${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <PacksTableHead />
        <TableBody>
          {packs.map(pack => (
            <TableRow
              key={pack._id}
              sx={{ 'height:48px ,&:last-child td, &:last-child th': { border: 0 } }}
              style={{ height: '48px' }}
            >
              <TableCell
                className={style.pack_cover}
                align="center"
                onClick={() => {
                  navigateToCards(pack._id);
                }}
              >
                <img src={validationImage(pack.deckCover)} alt="" />
              </TableCell>
              <TableCell
                onClick={() => {
                  navigateToCards(pack._id);
                }}
                className={style.pack_name}
                component="th"
                scope="row"
              >
                {pack.name}
              </TableCell>
              <TableCell align="center">{pack.cardsCount}</TableCell>
              <TableCell align="center">{dateFormat(pack.updated)}</TableCell>
              <TableCell className={style.pack_created} align="center">
                {pack.user_name}
              </TableCell>
              <ActionTableCell
                learnPack={() => {
                  learnPackHandler(pack._id);
                }}
                cardsCount={pack.cardsCount}
                openDeleteModal={() => {
                  openDeleteModal({
                    packName: pack.name,
                    id: pack._id,
                    deckCover: pack.deckCover,
                  });
                }}
                openEditModal={() => {
                  openEditModal({
                    packName: pack.name,
                    id: pack._id,
                    deckCover: pack.deckCover,
                  });
                }}
                packUserID={pack.user_id}
                authUserID={authUserID}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeletePackModal
        cover={selectedPack.deckCover}
        isLoading={status === 'pending'}
        packName={selectedPack.packName}
        isOpen={isOpenDeleteModal}
        onClose={() => {
          setIsOpenDeleteModal(false);
        }}
        onDeletePack={onDeletePack}
      />
      <EditPackModal
        cover={selectedPack.deckCover ? selectedPack.deckCover : null}
        isLoading={status === 'pending'}
        packName={selectedPack.packName}
        onCloseHandler={onCloseEditModal}
        onUpdatePack={onUpdatePackHandler}
        isOpen={isOpenEditModal}
        setEditedPackHandler={setEditPack}
      />
    </TableContainer>
  );
};
type PacksTablePropsType = {
  status: StatusType;
  packs: PackType[];
};
type SelectedPackType = {
  packName: string;
  id: string;
  deckCover: null | string;
};
