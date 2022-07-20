import Home from './pages/Home';
import Gradients from './pages/Gradients';
import Optimizers from './pages/Optimizers';
import Losses from './pages/Losses';
import { useRoutes } from 'react-router-dom';
import { ModelDashBoard } from './components/ModelDashBoard';

function Routes() {
  let element = useRoutes([
    {
      path: '/',
      element: <Home/>,
    },
    { path: '/Gradients/', element: <Gradients /> },
    { path: '/Optimizers/', element: <Optimizers /> },
    { path: '/Losses/', element: <Losses /> }
  ]);
  return element;
}
  
  export default Routes;
  