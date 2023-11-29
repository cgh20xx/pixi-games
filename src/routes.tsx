import type { RouteObject } from 'react-router-dom';
import Tree from './pages/Tree';
import SpaceInvaders from './pages/SpaceInvaders';
import MonsterRaiders from 'pages/MonsterRaiders';
import NotFound from './pages/NotFound';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Tree />
  },
  {
    path: '/tree',
    element: <Tree />
  },
  {
    path: '/space',
    element: <SpaceInvaders />
  },
  {
    path: '/monster',
    element: <MonsterRaiders />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
