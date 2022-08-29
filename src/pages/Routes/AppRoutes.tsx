import { Navigate, Route, Routes } from "react-router-dom"
import { Forms } from "../Forms/Forms"
import { Main } from "../Main/Main"
import { PacksPage } from "../PacksPage/PacksPage"
import { Profile } from "../Profile/Profile"
import { _pagesPath } from "./_path/pagesPath"

export const AppRoutes = () => {
   return (
      <>
         <Routes>
            <Route path={_pagesPath.MAIN} element={<Main />} />
            <Route path="/" element={<Navigate to={_pagesPath.MAIN} />} />
            <Route path={_pagesPath.FORM} element={<Forms />} />
            <Route path={_pagesPath.PROFILE} element={<Profile />} />
            <Route path={_pagesPath.PACKS} element={<PacksPage />} />
            {/* 
                <Route path="/Cards" element={<Navigate to={_pagesPath.MAIN} />} />
               
                <Route path={_pagesPath.PACKS} element={<PacksPage />} />
                <Route path={_pagesPath.CARDS} element={<CardsPage />} />
              
                <Route path="*" element={<Error404 />} /> */}
         </Routes>
      </>
   )
}