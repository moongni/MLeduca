import { useRoutes } from 'react-router-dom';
import Home from './pages/Home';
import LoadData from './pages/LoadData';
import Preprocessing from './pages/Preprocessing';
import SetLayers from './pages/Setting/SetLayers';
import SetParams from './pages/Setting/SetParams';
import SetCompile from './pages/Setting/SetCompile';
import TfTest from './pages/TfTest';

function Routes() {
  let element = useRoutes([
    {
      path: '/',
      element: <Home/>,
    },
    { path: '/setlayers/', element: <SetLayers /> },
    { path: '/tfjs_test/', element: <TfTest /> },
    { path: '/setparams', element: <SetParams/>},
    { path: '/setcompile', element: <SetCompile/>},
    { path: '/loadData', element: <LoadData/>},
    { path: '/preprocessing', element: <Preprocessing/>}
  ]);
  return element;
}
  
  export default Routes;
  