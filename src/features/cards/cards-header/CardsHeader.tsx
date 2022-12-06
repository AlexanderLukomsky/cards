import { FC } from 'react';

import { useSelector } from 'react-redux';

import { CardsHeaderInterface } from './cards-header-interface';
import style from './cardsHeader.module.scss';

import coverDefault from 'common/assets/images/coverDefault.jpg';
import { selectCardsPackDeckCover } from 'common/selectors';
import { BackLinkButton } from 'components/back-link-button';
import { appPath } from 'components/routes/path';

export const CardsHeader: FC<CardsHeaderPropsType> = ({ isOwner, packId }) => {
  const packCover = useSelector(selectCardsPackDeckCover);
  const isCover = packCover && packCover !== 'url or base64';

  return (
    <div className={style.cards_header}>
      <BackLinkButton path={appPath.PACKS} />

      <CardsHeaderInterface isOwner={isOwner} packId={packId} />

      <img
        src={isCover ? packCover : coverDefault}
        alt="pack cover"
        className={style.pack_cover}
      />
    </div>
  );
};
type CardsHeaderPropsType = {
  isOwner: boolean;
  packId: string;
};
