import { FC, MouseEvent, useState } from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import editIcon from 'common/assets/icons/edit.png';
import learnIcon from 'common/assets/icons/teach.svg';
import deleteIcon from 'common/assets/icons/trash.svg';
import {
  selectCardsPackDeckCover,
  selectCardsPackName,
  selectCardsTotalCount,
} from 'common/selectors';
import { Nullable } from 'common/types';
import { appPath } from 'components/routes/path';
import { DeletePackModal, EditPackModal } from 'features/packs/packs-modals';
import { useAppDispatch } from 'store/hooks';
import { getCards } from 'store/reducers/cards-reducer';
import { deletePack, updatePack } from 'store/reducers/packs-reducer';

export const BurgerMenu: FC<BurgerMenuPropsType> = ({ _id, status }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const packName = useSelector(selectCardsPackName);
  const packDeckCover = useSelector(selectCardsPackDeckCover);
  const cardsCount = useSelector(selectCardsTotalCount);

  const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null);
  const isOpenMenu = Boolean(anchorEl);

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const [updatedPack, setUpdatedPack] = useState<{
    packName: string;
    deckCover: Nullable<string>;
  }>({
    packName: '',
    deckCover: null,
  });

  const handleOpenMenuClick = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (): void => {
    setAnchorEl(null);
  };

  const handleMenuLearnClick = (): void => {
    setAnchorEl(null);
    navigate(appPath.LEARNING_DEFAULT + _id);
  };

  const handleOpenDeletePackModal = (): void => {
    setIsOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = (): void => {
    setIsOpenDeleteModal(false);
  };

  const handleDeletePackClick = async (): Promise<void> => {
    const action = await dispatch(deletePack(_id));

    if (deletePack.fulfilled.match(action)) {
      navigate(appPath.PACKS);
    }
  };

  const handleUpdatePack = (value: EditedPackValueType): void => {
    setUpdatedPack(pack => ({ ...pack, ...value }));
  };

  const handleOpenPackEditModal = (): void => {
    handleUpdatePack({ packName, deckCover: packDeckCover });
    setIsOpenEditModal(true);
  };

  const handleCloseEditModal = (): void => {
    setIsOpenEditModal(false);
  };
  const handleSetEditedPackClick = async (isPrivate: boolean): Promise<void> => {
    const { packName, deckCover } = updatedPack;

    setAnchorEl(null);
    const action = await dispatch(
      updatePack({ name: packName, _id, private: isPrivate, deckCover }),
    );

    if (updatePack.fulfilled.match(action)) {
      handleCloseEditModal();
      dispatch(getCards({ cardsPack_id: _id }));
    }
  };

  return (
    <div>
      <IconButton onClick={handleOpenMenuClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={isOpenMenu} onClose={handleCloseMenu}>
        <MenuItem onClick={handleOpenPackEditModal}>
          <img src={editIcon} alt="edit icon" style={{ marginRight: '10px' }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleOpenDeletePackModal}>
          <img src={deleteIcon} alt="delete icon" style={{ marginRight: '10px' }} />
          Delete
        </MenuItem>
        <MenuItem onClick={handleMenuLearnClick} disabled={cardsCount === 0}>
          <img src={learnIcon} alt="learn icon" style={{ marginRight: '10px' }} />
          Learn
        </MenuItem>
      </Menu>
      <DeletePackModal
        cover={packDeckCover}
        isLoading={status}
        packName={packName}
        isOpen={isOpenDeleteModal}
        onClose={handleCloseDeleteModal}
        onDeletePack={handleDeletePackClick}
      />
      <EditPackModal
        cover={updatedPack.deckCover}
        onUpdatePack={handleUpdatePack}
        isLoading={status}
        packName={updatedPack.packName}
        isOpen={isOpenEditModal}
        onCloseHandler={handleCloseEditModal}
        setEditedPackHandler={handleSetEditedPackClick}
      />
    </div>
  );
};

type BurgerMenuPropsType = {
  _id: string;
  status: boolean;
};

type EditedPackValueType = {
  packName?: string;
  deckCover?: Nullable<string>;
};
