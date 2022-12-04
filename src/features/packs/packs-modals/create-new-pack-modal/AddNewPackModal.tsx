import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';

import { Checkbox, TextField } from '@mui/material';
import { useSelector } from 'react-redux';

import { PacksModalCover } from '../packs-modal-cover';

import style from './addNewPackModal.module.scss';

import { selectPacks } from 'common/selectors/selectors';
import { convertImageToBase64 } from 'common/utils';
import { BasicModal } from 'components/basic-modal';
import { useAppDispatch } from 'store/hooks';
import { createNewPack } from 'store/reducers/packs-reducer';

export const AddNewPackModal: FC<AddNewPackModalPropsType> = ({
  isOpen,
  onCloseHandler,
}) => {
  const dispatch = useAppDispatch();
  const { status } = useSelector(selectPacks);

  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [cover, setCover] = useState<null | string>(null);
  const [errorCover, setErrorCover] = useState<string | null>(null);

  const handlePackNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setErrorMessage('');
    setValue(e.currentTarget.value);
  };

  const handleCheckboxChange = (
    _: SyntheticEvent<Element, Event>,
    checked: boolean,
  ): void => {
    setIsChecked(checked);
  };

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.currentTarget;

    if (files && files.length) {
      convertImageToBase64(files[0], {
        errorHandler: handleCoverError,
        successHandler: handleCoverSuccess,
      });
    }
  };

  const handleDeleteCoverClick = (): void => {
    setErrorCover(null);
    setCover(null);
  };

  const handleCoverError = (error: string): void => {
    setErrorCover(error);
  };

  const handleCoverSuccess = (image: string): void => {
    setCover(image);
    setErrorCover(null);
  };

  const handleAddButtonClick = async (): Promise<void> => {
    if (value.trim()) {
      const action = await dispatch(
        createNewPack({ name: value.trim(), private: isChecked, deckCover: cover }),
      );

      if (createNewPack.fulfilled.match(action)) {
        handleCancelClick();
      }
    } else {
      setValue('');
      setErrorMessage('enter a pack name');
    }
  };

  const handleCloseClick = (): void => {
    setErrorMessage('');
    onCloseHandler();
  };

  const handleCancelClick = (): void => {
    setValue('');
    setErrorMessage('');
    setIsChecked(false);
    onCloseHandler();
    setErrorCover(null);
    setCover(null);
  };

  return (
    <BasicModal
      className={style.addNewPack}
      open={isOpen}
      title="Add new pack"
      onClose={handleCloseClick}
      cancelButton={{
        title: 'Cancel',
        buttonProps: { onClick: handleCancelClick, disabled: status === 'pending' },
      }}
      confirmButton={{
        title: 'Save',
        buttonProps: {
          onClick: handleAddButtonClick,
          disabled: status === 'pending' || !!errorMessage,
        },
      }}
      isLoading={status === 'pending'}
    >
      <PacksModalCover
        onUploadImageChangeHandler={handleUploadImage}
        onDeleteClickHandler={handleDeleteCoverClick}
        cover={cover}
        error={errorCover}
      />
      <div className={style.input}>
        <TextField
          className={style.input__value}
          error={!!errorMessage}
          color={errorMessage ? 'error' : 'info'}
          value={value}
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
          checked={isChecked}
        />
        <label
          className={`${style.control__label}${isChecked ? ` ${style.checked}` : ''}`}
          htmlFor="private"
        >
          Private pack
        </label>
      </div>
    </BasicModal>
  );
};
type AddNewPackModalPropsType = {
  isOpen: boolean;
  onCloseHandler: () => void;
};
