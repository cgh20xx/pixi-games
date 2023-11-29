// import type { RouteObject } from 'react-router-dom';
import Home from 'pages/Home';
import Tree from './pages/Tree';
import SpaceInvaders from './pages/SpaceInvaders';
import MonsterRaiders from 'pages/MonsterRaiders';
import NotFound from './pages/NotFound';
import { ReactElement } from 'react';

interface CustomRouteObject {
  path?: string;
  element?: ReactElement;
  children?: CustomRouteObject[];
  // 其他 RouteObject 中的屬性...
  linkName?: string; // 自定義屬性
  // 其他任意的自定義屬性
}
const routes: CustomRouteObject[] = [
  {
    path: '/',
    element: <Home />,
    linkName: '首頁'
  },
  {
    path: '/tree',
    element: <Tree />,
    linkName: '小樹開朵花'
  },
  {
    path: '/space',
    element: <SpaceInvaders />,
    linkName: '太空小蜜蜂'
  },
  {
    path: '/monster',
    element: <MonsterRaiders />,
    linkName: '怪獸掃蕩隊'
  },
  {
    path: '*',
    element: <NotFound />,
    linkName: ''
  }
];

export default routes;
