import styles from "../cardsTable.module.scss";
import { BurgerMenu } from "../../BurgerMenu/BurgerMenu";
import { Button } from "@mui/material";
import { FC, useState } from "react";
import { useAppSelector } from "../../../../app/store";
import { useNavigate } from "react-router-dom";
import { appPath } from "../../../../common/path/appPath";
import { AddNewCardModal } from "../../CardsModals/AddNewCardModal/AddNewCardModal";
import coverDefault from "../../../../assets/image/coverDefault.jpg"

type HeaderTableType = {
    isOwner: boolean
    packId: string
}

export const TableHeader: FC<HeaderTableType> = ({ isOwner, packId }) => {

    const status = useAppSelector(state => state.cards.status)
    const packName = useAppSelector(state => state.cards.data.packName)
    const cardsTotalCount = useAppSelector(state => state.cards.data.cardsTotalCount)
    const packCover = useAppSelector(state => state.cards.data.packDeckCover)
    const navigate = useNavigate()

    const [isOpenNewCardModal, setIsOpenNewCardModal] = useState(false)
    const learnCardHandler = () => {
        navigate(appPath.LEARNINGDEFAULT + packId)
    }

    return (
        <>
            {isOwner
                ? <div>
                    <div className={styles.headerBlock}>
                        <div className={styles.title}>
                            <span>"{packName}"</span>
                            <span className={styles.owner}>My Pack</span>
                            <span><BurgerMenu status={status} _id={packId} /></span>
                        </div>
                        <Button variant='contained'
                            className={styles.button}
                            onClick={() => {
                                setIsOpenNewCardModal(true)
                            }}
                            disabled={status}
                        >Add New Card</Button>
                        <AddNewCardModal
                            isLoading={status}
                            isOpen={isOpenNewCardModal}
                            onClosehandler={() => {
                                setIsOpenNewCardModal(false)
                            }}
                            packId={packId}
                        />
                    </div>
                    <img src={packCover && packCover !== "url or base64" ? packCover : coverDefault} alt={'0'} className={styles.packCover} />
                </div>
                : <div>
                    <div className={styles.headerBlock}>
                        <div className={styles.title}>
                            <span>"{packName}"</span>
                            <span className={styles.owner}> Friend's Pack</span>
                        </div>
                        <Button variant='contained'
                            className={styles.button}
                            onClick={learnCardHandler}
                            disabled={status || cardsTotalCount === 0}
                        >Learn to pack</Button>
                    </div>
                    <img src={packCover && packCover !== "url or base64" ? packCover : coverDefault} alt={'0'} className={styles.packCover} />
                </div>
            }
        </>
    )
}