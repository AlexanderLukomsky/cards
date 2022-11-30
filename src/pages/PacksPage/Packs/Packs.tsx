import { ChangeEvent } from "react";
import { PacksType } from "../../../api/packs-api";
import { AppCircularProgress } from "../../../components/AppCircularProgress/AppCircularProgress";
import { PacksList } from "./PacksList/PacksList";
import { PacksSearch } from "./PacksSearch/PacksSearch";
import { PacksPagination } from "./PacksPagination/PaginationPacks";
import "./packs.scss";
import { CustomSelect } from "../../../components/CustomSelect/CustomSelect";
import { StatusType } from "../../../commonTypes/types";
import { PacksAddNewPackModal } from "./PacksModals/PacksAddNewPackModal/PacksAddNewPackModal";
import { ListTitle } from "../../../components/ListTitle/ListTitle";
export const Packs: React.FC<PropsType> = ({
  packs,
  onChangePage,
  title,
  page,
  isInitialized,
  pageCount,
  cardPacksTotalCount,
  onSearchPacks,
  onChagePageCount,
  progressStatus,
}) => {
  return (
    <div className="packs-page__packs packs">
      <ListTitle title={title} />
      <div className="packs__header">
        <PacksSearch onSearchPacks={onSearchPacks} />
        <PacksAddNewPackModal />
      </div>
      {!isInitialized ? (
        <AppCircularProgress />
      ) : (
        <PacksList packs={packs} progressStatus={progressStatus} />
      )}
      <div className="packs__footer">
        <PacksPagination
          onChange={onChangePage}
          page={page}
          pageCount={pageCount}
          totalCount={cardPacksTotalCount}
        />
        <CustomSelect
          items={[5, 10, 15]}
          value={pageCount}
          onChange={onChagePageCount}
        />
      </div>
    </div>
  );
};
type PropsType = {
  packs: PacksType[];
  title: string;
  onChangePage: (e: ChangeEvent<unknown>, page: number) => void;
  page: number;
  isInitialized: boolean;
  pageCount: number;
  cardPacksTotalCount: number;
  onSearchPacks: (value: string) => void;
  onChagePageCount: (value: number) => void;
  progressStatus: StatusType;
};
