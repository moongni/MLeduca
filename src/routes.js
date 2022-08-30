import { useRoutes } from 'react-router-dom';
import Home from './pages/Home';
import LoadData from './pages/LoadData';
import Preprocessing from './pages/Preprocessing';
import TfTest from './pages/TfTest';
import Setting from './pages/Setting';
import Predict from './pages/Predict';

function Routes() {
  let element = useRoutes([
    {
      path: '/',
      element: <Home/>,
    },
    { path: '/predict', element: <Predict/>},
    { path: '/tfjs_test/', element: <TfTest /> },
    { path: '/loadData', element: <LoadData/>},
    { path: '/preprocessing', element: <Preprocessing/>},
    { path: '/setting', element: <Setting/>}
  ]);
  return element;
}
  
  export default Routes;
  