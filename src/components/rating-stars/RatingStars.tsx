/* eslint-disable no-magic-numbers */
import { FC } from 'react';

import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

type RatingStarsType = {
  stars: number;
};

export const RatingStars: FC<RatingStarsType> = ({ stars }) => {
  const starsValues = [0, 1, 2, 3, 4];

  return (
    <div>
      {starsValues.map(s =>
        s < stars ? (
          <StarIcon key={s} color="warning" />
        ) : (
          <StarOutlineIcon key={s} color="disabled" />
        ),
      )}
    </div>
  );
};
