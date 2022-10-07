import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoadData from './pages/LoadData';
import Preprocessing from './pages/Preprocessing';
import TfTest from './pages/TfTest';
import Setting from './pages/Setting';
import Predict from './pages/Predict';
import MainLayout from './pages/MainLayout';
import Page404 from './pages/404';
import Analytic from './pages/Analytic';
import Download from './pages/Download';

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
        <Route path='analytic/*' element={<Analytic/>}/>
        <Route path='analytic/:storageParam/:nameParam' element={<Analytic/>}/>
        <Route path='download' element={<Download/>}/>
      </Route>
      <Route path="*" element={<Page404/>}/>
    </Routes>
  )
}
export default Router;