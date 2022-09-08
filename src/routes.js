import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoadData from './pages/LoadData';
import Preprocessing from './pages/Preprocessing';
import TfTest from './pages/TfTest';
import Setting from './pages/Setting';
import Predict from './pages/Predict';
import MainLayout from './pages/MainLayout';
import ModelSelection from './pages/ModelSelection';

function Router() {
  return (
      <Routes>
        <Route path="/" element={<MainLayout/>}>
            <Route path='' element={<Home/>}/>
            <Route path='predict/*' element={<Predict/>}/>
            {/* <Route path='predict/:model' element={<Predict/>}/> */}
            <Route path='tfjs_test' element={<TfTest /> }/>
            <Route path='loadData' element={<LoadData/>}/>
            <Route path='preprocessing' element={<Preprocessing/>}/>
            <Route path='setting' element={<Setting/>}/>
        </Route>
        <Route path="*"/>
      </Routes>
  )
}
export default Router;