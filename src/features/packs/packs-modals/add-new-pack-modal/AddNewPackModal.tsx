import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';

import { Checkbox, TextField } from '@mui/material';
import { useSelector } from 'react-redux';

import { PacksModalCover } from '../packs-modal-cover';

import style from './addNewPackModal.module.scss';

import { selectPacks } from 'common/selectors/selectors';
import { convertImageToBase64 } from 'common/utils';
import { BasicModal } from 'components/basic-modal';
import { useAppDispatch } from 'store/hooks';
import { addNewPack } from 'store/reducers/packs-reducer';

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
  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setErrorMessage('');
    setValue(e.currentTarget.value);
  };
  const onChangeCheckbox = (
    _: SyntheticEvent<Element, Event>,
    checked: boolean,
  ): void => {
    setIsChecked(checked);
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
  const onDeleteCoverClickHandler = (): void => {
    setErrorCover(null);
    setCover(null);
  };
  const coverErrorHandler = (error: string): void => {
    setErrorCover(error);
  };
  const coverSuccessHandler = (image: string): void => {
    setCover(image);
    setErrorCover(null);
  };
  const onAddNewPack = async (): Promise<void> => {
    if (value.trim()) {
      const action = await dispatch(
        addNewPack({ name: value.trim(), private: isChecked, deckCover: cover }),
      );

      if (addNewPack.fulfilled.match(action)) {
        onCancel();
      }
    } else {
      setValue('');
      setErrorMessage('enter a pack name');
    }
  };
  const onClose = (): void => {
    setErrorMessage('');
    onCloseHandler();
  };
  const onCancel = (): void => {
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
      onClose={onClose}
      cancelButton={{
        title: 'Cancel',
        buttonProps: { onClick: onCancel, disabled: status === 'pending' },
      }}
      confirmButton={{
        title: 'Save',
        buttonProps: {
          onClick: onAddNewPack,
          disabled: status === 'pending' || !!errorMessage,
        },
      }}
      isLoading={status === 'pending'}
    >
      <PacksModalCover
        uploadHandler={uploadHandler}
        onDeleteClick={onDeleteCoverClickHandler}
        cover={cover}
        error={errorCover}
      />
      <div className={style.input}>
        <TextField
          className={style.input__value}
          error={!!errorMessage}
          color={errorMessage ? 'error' : 'info'}
          value={value}
          onChange={onChange}
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
