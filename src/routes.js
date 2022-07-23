import Home from './pages/Home';
import Gradients from './pages/ModelSelection/Gradients';
import Optimizers from './pages/ModelSelection/Optimizers';
import Losses from './pages/ModelSelection/Losses';
import { useRoutes } from 'react-router-dom';
import MakeLayers from './pages/ModelCreate/MakeLayers';
import TfTest from './pages/TfTest';

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
    { path: '/tfjs_test/', element: <TfTest /> }
  ]);
  return element;
}
  
  export default Routes;
  