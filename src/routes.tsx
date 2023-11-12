import type { RouteObject } from 'react-router-dom';
import Tree from './pages/Tree';
import SpaceInvaders from './pages/SpaceInvaders';
import NotFound from './pages/NotFound';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Tree />
  },
  {
    path: '/space',
    element: <SpaceInvaders />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
