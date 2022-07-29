import Home from './pages/Home';
import Gradients from './pages/Compile/Gradients';
import Optimizers from './pages/Compile/Optimizers';
import Losses from './pages/Compile/Losses';
import { useRoutes } from 'react-router-dom';
import MakeLayers from './pages/ModelCreate/MakeLayers';
import TfTest from './pages/TfTest';
import SetParams from './pages/Params/setParams';

function Routes() {
  let element = useRoutes([
    {
      path: '/',
      element: <Home/>,
    },
    { path: '/gradients/', element: <Gradients /> },
    { path: '/optimizers/', element: <Optimizers /> },
    { path: '/losses/', element: <Losses /> },
    { path: '/layers/', element: <MakeLayers /> },
    { path: '/tfjs_test/', element: <TfTest /> },
    { path: '/setparams', element: <SetParams/>}
  ]);
  return element;
}
  
  export default Routes;
  