import Home from './pages/Home';
import Gradients from './pages/Gradients';
import Optimizers from './pages/Optimizers';
import Losses from './pages/Losses';
import { useRoutes } from 'react-router-dom';
import { ModelDashBoard } from './components/ModelDashBoard';
import MakeLayers from './pages/MakeLayers';

function Routes() {
  let element = useRoutes([
    {
      path: '/',
      element: <Home/>,
    },
    { path: '/gradients/', element: <Gradients /> },
    { path: '/optimizers/', element: <Optimizers /> },
    { path: '/losses/', element: <Losses /> },
    { path: '/layers/', element: <MakeLayers /> }
  ]);
  return element;
}
  
  export default Routes;
  