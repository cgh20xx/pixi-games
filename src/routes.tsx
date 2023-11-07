import type { RouteObject } from 'react-router-dom';
import TreeGenerator from './pages/TreeGenerator';
import Game from './pages/Game';
import NotFound from './pages/NotFound';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <TreeGenerator />,
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
