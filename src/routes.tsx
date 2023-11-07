import type { RouteObject } from 'react-router-dom';
import Tree from './pages/Tree';
import Game from './pages/Game';
import NotFound from './pages/NotFound';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Tree />
  },
  {
    path: '/game',
    element: <Game />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
