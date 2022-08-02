import Home from './pages/Home';
import { useRoutes } from 'react-router-dom';
import SetLayers from './pages/Setting/SetLayers';
import SetParams from './pages/Setting/SetParams';
import TfTest from './pages/TfTest';
import SetCompile from './pages/Setting/SetCompile';
import LoadData from './pages/LoadData';
import TfTest2 from './pages/TfTest2';

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
    { path: '/tfjs_test2', element: <TfTest2/>}
  ]);
  return element;
}
  
  export default Routes;
  