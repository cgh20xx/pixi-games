import type { RouteObject } from 'react-router-dom';
import Tree from './pages/Tree';
import Game from './pages/Game';
import NotFound from './pages/NotFound';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Tree />,
    children: []
  },
  {
    path: '/game',
    element: <Game />,
    children: []
  },
  {
    path: '*',
    element: <NotFound />,
    children: []
  }
];

export default routes;
