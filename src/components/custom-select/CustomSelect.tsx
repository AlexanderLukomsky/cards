import { FC } from 'react';

import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import './customSelect.scss';

export const CustomSelect: FC<SelectPacksCountPropsType> = ({
  defaultValue,
  onChange,
  title,
}) => {
  const portions = {
    fivePacks: 5,
    tenPacks: 10,
    fifteenPacks: 15,
  };
  const value =
    defaultValue === portions.fivePacks ||
    defaultValue === portions.tenPacks ||
    defaultValue === portions.fifteenPacks
      ? defaultValue
      : portions.fivePacks;
  const onChangeHandler = (value: string): void => {
    const valueAsNumber = +value;

    onChange(valueAsNumber);
  };

  return (
    <div className="custom-select">
      <div className="custom-select__text">Show</div>
      <FormControl variant="standard">
        <Select
          onChange={(event: SelectChangeEvent): void => {
            onChangeHandler(event.target.value);
          }}
          value={value.toString()}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
        </Select>
      </FormControl>
      <div className="custom-select__title">{title}</div>
    </div>
  );
};
type SelectPacksCountPropsType = {
  defaultValue: number;
  onChange: (value: number) => void;
  title: string;
};
