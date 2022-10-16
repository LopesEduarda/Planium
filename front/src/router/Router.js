import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Plans } from "../pages/plans/Plans";
import { Prices } from '../pages/prices/Prices';
import { Beneficiaries } from '../pages/beneficiaries/Beneficiaries';
import { AddBeneficiaries } from '../pages/addBeneficiaries/AddBeneficiaries';
import { Proposals } from '../pages/proposals/Proposals';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={'/'}/>
                <Route path='/plans' element={<Plans/>}/>
                <Route path='/prices' element={<Prices/>}/>
                <Route path='/beneficiaries' element={<Beneficiaries/>}/>
                <Route path='/proposals' element={<Proposals/>}/>
                <Route path='/addbeneficiaries' element={<AddBeneficiaries/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router  