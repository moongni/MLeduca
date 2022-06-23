import { Navigate } from 'react-router-dom';
import Home from './pages/Home';
import MainSidebar from './components/MainSidebar';
import { ModelDashBoard } from './components/ModelDashBoard';
const routes = [
    {
      path: '/',
      element: <MainSidebar />,
      children: [
      { path: '/home', element: <Home /> },
      ]
    }
  ];
  
  export default routes;
  