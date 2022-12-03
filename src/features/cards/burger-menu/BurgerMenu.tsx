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
import { appPath } from 'components/routes/path';
import { DeletePackModal, EditPackModal } from 'features/packs/packs-modals';
import { useAppDispatch } from 'store/hooks';
import { getCards } from 'store/reducers/cards-reducer';
import { deletePack, updatePack } from 'store/reducers/packs-reducer';

const ITEM_HEIGHT = 36;

type BurgerMenuPropsType = {
  _id: string;
  status: boolean;
};

export const BurgerMenu: FC<BurgerMenuPropsType> = ({ _id, status }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const packName = useSelector(selectCardsPackName);
  const packDeckCover = useSelector(selectCardsPackDeckCover);
  const cardsCount = useSelector(selectCardsTotalCount);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };
  const learnHandler = (): void => {
    setAnchorEl(null);
    navigate(appPath.LEARNING_DEFAULT + _id);
  };
  // delete pack
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const openDeleteModal = (): void => {
    setIsOpenDeleteModal(true);
  };
  const closeDeleteModal = (): void => {
    setIsOpenDeleteModal(false);
  };
  const deleteHandler = async (): Promise<void> => {
    setAnchorEl(null);
    const action = await dispatch(deletePack(_id));

    if (deletePack.fulfilled.match(action)) {
      navigate(appPath.PACKS);
    }
  };
  // edit pack
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [updatedPack, setUpdatedPack] = useState<{ packName: ''; deckCover: null }>({
    packName: '',
    deckCover: null,
  });
  const onUpdatePackHandler = (value: { [key: string]: string | null }): void => {
    setUpdatedPack(data => ({ ...data, ...value }));
  };
  const openEditModal = (): void => {
    onUpdatePackHandler({ packName });
    setIsOpenEditModal(true);
  };

  const closeEditModal = (): void => {
    setIsOpenEditModal(false);
  };
  const editHandler = async (isPrivate: boolean): Promise<void> => {
    const { packName, deckCover } = updatedPack;

    setAnchorEl(null);
    const action = await dispatch(
      updatePack({ name: packName, _id, private: isPrivate, deckCover }),
    );

    if (updatePack.fulfilled.match(action)) {
      closeEditModal();
      dispatch(getCards({ cardsPack_id: _id }));
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            // eslint-disable-next-line no-magic-numbers
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={openEditModal}>
          <img src={editIcon} alt="0" style={{ marginRight: '10px' }} />
          Edit
        </MenuItem>
        <MenuItem onClick={openDeleteModal}>
          <img src={deleteIcon} alt="0" style={{ marginRight: '10px' }} />
          Delete
        </MenuItem>
        <MenuItem onClick={learnHandler} disabled={cardsCount === 0}>
          <img src={learnIcon} alt="0" style={{ marginRight: '10px' }} />
          Learn
        </MenuItem>
      </Menu>
      <DeletePackModal
        cover={packDeckCover}
        isLoading={status}
        packName={packName}
        isOpen={isOpenDeleteModal}
        onClose={closeDeleteModal}
        onDeletePack={deleteHandler}
      />
      <EditPackModal
        cover={updatedPack.deckCover}
        onUpdatePack={onUpdatePackHandler}
        isLoading={status}
        packName={updatedPack.packName}
        isOpen={isOpenEditModal}
        onCloseHandler={closeEditModal}
        setEditedPackHandler={editHandler}
      />
    </div>
  );
};
