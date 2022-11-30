import {
  FormControlLabel,
  FormLabel,
  FormControl,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AppCircularProgress } from "../../../../../components/AppCircularProgress/AppCircularProgress";
import { ModalContainer } from "../../../../../components/ModalContainer/ModalContainer";
import {
  AppRootStateType,
  useAppDispatch,
  useAppSelector,
} from "../../../../../store/store";
import { getTrainingCards, setCardNumber } from "../../../reducer/packsReducer";
import { createSelector } from "@reduxjs/toolkit";
import { cardsAPI } from "../../../../../api/cards-api";
const cardNumber = (state: AppRootStateType) =>
  state.packs.selectedPack.cardNumber;
const packCards = (state: AppRootStateType) => state.packs.selectedPack.cards;
const getRandomNumber = (count: number) => Math.floor(Math.random() * count);
export const PacksCardsTrainingModal: React.FC<PropsType> = React.memo(
  ({ onCloseModal, isOpen }) => {
    const dispatch = useAppDispatch();
    const [selectedGrade, setSelectedGrade] = useState(0);
    const { selectedPack } = useAppSelector((state) => state.packs);
    useEffect(() => {
      if (selectedPack.params.cardsCount > 0) {
        dispatch(getTrainingCards());
      }
    }, []);
    const getCardByNumber = createSelector(
      [packCards, cardNumber],
      (card, number) => card[number]
    );
    const randomCard = useAppSelector(getCardByNumber);
    const nextCard = () => {
      setSelectedGrade(0);
      const randomNum = getRandomNumber(selectedPack.params.cardsCount);
      const cardNumber =
        randomNum !== selectedPack.cardNumber
          ? randomNum
          : getRandomNumber(selectedPack.params.cardsCount);
      dispatch(setCardNumber({ cardNumber }));
    };
    const onChangeRate = (
      event: React.ChangeEvent<HTMLInputElement>,
      value: string
    ) => {
      setSelectedGrade(+value);
    };
    const onConfirmClickHandler = () => {
      cardsAPI.setGrade({ grade: selectedGrade, card_id: randomCard._id });
      setSelectedGrade(0);
      const randomNum = getRandomNumber(selectedPack.params.cardsCount);
      const cardNumber =
        randomNum !== selectedPack.cardNumber
          ? randomNum
          : getRandomNumber(selectedPack.params.cardsCount);
      dispatch(setCardNumber({ cardNumber }));
    };
    return (
      <>
        <ModalContainer
          isOpenModal={isOpen}
          onClose={onCloseModal}
          title={{ name: "Learn:", text: `“${selectedPack.params.name}”` }}
          firstBtnProps={{
            title: "Random Card",
            onClick: nextCard,
            disabled:
              selectedPack.status === "loading" ||
              selectedPack.params.cardsCount <= 1,
            color: "error",
            variant: "contained",
          }}
          secondBtnProps={{
            title: "confirm",
            onClick: onConfirmClickHandler,
            disabled:
              selectedPack.status === "loading" ||
              selectedPack.params.cardsCount === 0 ||
              selectedGrade < 1,
            color: "success",
            variant: "contained",
          }}
        >
          {selectedPack.params.cardsCount === 0 ? (
            <div className="packs__training-modal__text">
              <p>
                <span> Question:</span>"no question"
              </p>
              <p>
                <span>Answer:</span>"no answer"
              </p>
            </div>
          ) : (
            selectedPack.isInitialized && (
              <div className="packs__training-modal">
                <div className="packs__training-modal__text modal-text">
                  <p className="modal-text__question">
                    <span className="modal-text__question-title">
                      Question:
                    </span>
                    <span className="modal-text__question-text">
                      {randomCard.question}
                    </span>
                  </p>
                  <p className="modal-text__answer">
                    <span className="modal-text__answer-title">Answer:</span>
                    <span className="modal-text__answer-text">
                      {randomCard.answer}
                    </span>
                  </p>
                </div>
                <div className="packs__training-modal__form">
                  <FormControl>
                    <FormLabel>Rate yourself:</FormLabel>
                    <RadioGroup onChange={onChangeRate}>
                      <FormControlLabel
                        checked={selectedGrade === 1}
                        value={1}
                        control={<Radio color="error" />}
                        label="Did not know"
                      />
                      <FormControlLabel
                        checked={selectedGrade === 2}
                        value={2}
                        control={<Radio color="error" />}
                        label="Forgot"
                      />
                      <FormControlLabel
                        checked={selectedGrade === 3}
                        value={3}
                        control={<Radio color="primary" />}
                        label="A lot of thought"
                      />
                      <FormControlLabel
                        checked={selectedGrade === 4}
                        value={4}
                        control={<Radio color="success" />}
                        label="Confused"
                      />
                      <FormControlLabel
                        checked={selectedGrade === 5}
                        value={5}
                        control={<Radio color="success" />}
                        label="Knew the answer"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            )
          )}
          {selectedPack.status === "loading" && <AppCircularProgress />}
        </ModalContainer>
      </>
    );
  }
);
//modal
type PropsType = {
  onCloseModal: () => void;
  isOpen: boolean;
};
