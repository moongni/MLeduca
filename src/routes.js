import Home from './pages/Home';
import { useRoutes } from 'react-router-dom';
import SetLayers from './pages/Setting/SetLayers';
import SetParams from './pages/Setting/SetParams';
import TfTest from './pages/TfTest';
import SetCompile from './pages/Setting/SetCompile';

function Routes() {
  let element = useRoutes([
    {
      path: '/',
      element: <Home/>,
    },
    { path: '/setlayers/', element: <SetLayers /> },
    { path: '/tfjs_test/', element: <TfTest /> },
    { path: '/setparams', element: <SetParams/>},
    { path: '/setcompile', element: <SetCompile/>}
  ]);
  return element;
}
  
  export default Routes;
  