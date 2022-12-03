import { useState } from 'react';

import { Button } from '@mui/material';

import { AddNewPackModal } from 'features/packs/packs-modals';

export const AddNewPack = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const onCloseHandler = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        style={{ borderRadius: '30px', minWidth: '175px' }}
        color="primary"
        variant="contained"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Add new pack
      </Button>
      <AddNewPackModal onCloseHandler={onCloseHandler} isOpen={isOpen} />
    </>
  );
};
