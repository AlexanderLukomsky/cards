import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';

import { Checkbox, TextField } from '@mui/material';

import { PacksModalCover } from '../packs-modal-cover';

import style from './editPackModal.module.scss';

import { convertImageToBase64 } from 'common/utils';
import { BasicModal } from 'components/basic-modal';

export const EditPackModal: FC<EditPackModalPropsType> = ({
  isOpen,
  onCloseHandler,
  isLoading,
  setEditedPackHandler,
  packName,
  cover,
  onUpdatePack,
}) => {
  const [errorCover, setErrorCover] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const onChangePackName = (e: ChangeEvent<HTMLInputElement>): void => {
    setErrorMessage('');
    onUpdatePack({ packName: e.currentTarget.value });
  };
  const onChangeCheckbox = (
    _: SyntheticEvent<Element, Event>,
    isPrivate: boolean,
  ): void => {
    setIsPrivate(isPrivate);
  };
  const onClose = (): void => {
    setErrorMessage('');
    setIsPrivate(false);
    onCloseHandler();
  };
  const setEditedPack = (): void => {
    if (packName.trim()) {
      setEditedPackHandler(isPrivate);
      setIsPrivate(false);
    } else {
      onUpdatePack({ packName: '' });
      setErrorMessage('enter a pack name');
    }
  };
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.currentTarget;

    if (files && files.length) {
      convertImageToBase64(files[0], {
        errorHandler: coverErrorHandler,
        successHandler: coverSuccessHandler,
      });
    }
  };
  const coverErrorHandler = (error: string): void => {
    setErrorCover(error);
  };
  const coverSuccessHandler = (deckCover: string): void => {
    onUpdatePack({ deckCover });
    setErrorCover(null);
  };
  const onDeleteCoverClickHandler = (): void => {
    onUpdatePack({ deckCover: null });
    setErrorCover(null);
  };

  return (
    <BasicModal
      className={style.editPack}
      open={isOpen}
      title="Edit pack"
      onClose={onClose}
      cancelButton={{
        title: 'Cancel',
        buttonProps: { onClick: onClose, disabled: isLoading },
      }}
      confirmButton={{
        title: 'Save',
        buttonProps: { onClick: setEditedPack, disabled: isLoading || !!errorMessage },
      }}
      isLoading={isLoading}
    >
      <PacksModalCover
        cover={cover}
        error={errorCover}
        onDeleteClick={onDeleteCoverClickHandler}
        uploadHandler={uploadHandler}
      />
      <div className={style.input}>
        <TextField
          className={style.input__value}
          error={!!errorMessage}
          color={errorMessage ? 'error' : 'info'}
          value={packName}
          onChange={onChangePackName}
          id="outlined-basic"
          label="Name pack"
          variant="standard"
        />
        {!!errorMessage && <div className={style.input__error}>{errorMessage}</div>}
      </div>
      <div className={style.control}>
        <Checkbox
          onChange={onChangeCheckbox}
          id="private"
          className={style.control__checkbox}
          checked={isPrivate}
        />
        <label
          className={`${style.control__label}${isPrivate ? ` ${style.checked}` : ''}`}
          htmlFor="private"
        >
          Private pack
        </label>
      </div>
    </BasicModal>
  );
};
type EditPackModalPropsType = {
  isLoading: boolean;
  isOpen: boolean;
  onCloseHandler: () => void;
  packName: string;
  setEditedPackHandler: (isPrivate: boolean) => void;
  cover: string | null;
  onUpdatePack: (value: { [key: string]: string | null }) => void;
};
