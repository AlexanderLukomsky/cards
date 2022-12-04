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
  const handlePackNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setErrorMessage('');
    onUpdatePack({ packName: e.currentTarget.value });
  };
  const handleCheckboxChange = (
    _: SyntheticEvent<Element, Event>,
    isPrivate: boolean,
  ): void => {
    setIsPrivate(isPrivate);
  };
  const handleCloseClick = (): void => {
    setErrorMessage('');
    setIsPrivate(false);
    onCloseHandler();
  };
  const handleSetEditedPackClick = (): void => {
    if (packName.trim()) {
      setEditedPackHandler(isPrivate);
      setIsPrivate(false);
    } else {
      onUpdatePack({ packName: '' });
      setErrorMessage('enter a pack name');
    }
  };
  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.currentTarget;

    if (files && files.length) {
      convertImageToBase64(files[0], {
        errorHandler: handleCoverError,
        successHandler: handlerCoverSuccess,
      });
    }
  };
  const handleCoverError = (error: string): void => {
    setErrorCover(error);
  };
  const handlerCoverSuccess = (deckCover: string): void => {
    onUpdatePack({ deckCover });
    setErrorCover(null);
  };
  const handleDeleteCoverClick = (): void => {
    onUpdatePack({ deckCover: null });
    setErrorCover(null);
  };

  return (
    <BasicModal
      className={style.editPack}
      open={isOpen}
      title="Edit pack"
      onClose={handleCloseClick}
      cancelButton={{
        title: 'Cancel',
        buttonProps: { onClick: handleCloseClick, disabled: isLoading },
      }}
      confirmButton={{
        title: 'Save',
        buttonProps: {
          onClick: handleSetEditedPackClick,
          disabled: isLoading || !!errorMessage,
        },
      }}
      isLoading={isLoading}
    >
      <PacksModalCover
        cover={cover}
        error={errorCover}
        onDeleteClickHandler={handleDeleteCoverClick}
        onUploadImageChangeHandler={handleUploadImage}
      />
      <div className={style.input}>
        <TextField
          className={style.input__value}
          error={!!errorMessage}
          color={errorMessage ? 'error' : 'info'}
          value={packName}
          onChange={handlePackNameChange}
          id="outlined-basic"
          label="Name pack"
          variant="standard"
        />
        {!!errorMessage && <div className={style.input__error}>{errorMessage}</div>}
      </div>
      <div className={style.control}>
        <Checkbox
          onChange={handleCheckboxChange}
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
