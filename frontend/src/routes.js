import { BoardPage } from './pages/board-page';
import { HomePage } from './pages/home-page';
import { TemplatePage } from './pages/template-page';
import { UserBoards } from './pages/user-boards';
import { InvitePage } from './pages/invite-page';
import { Login } from './pages/login';
import { Signup } from './pages/signup';
import { Test } from './pages/test';

// Routes accesible from the main navigation (in AppHeader)
const routes = [
  {
    path: '/board/:boardId',
    component: BoardPage,
  },
  {
    path: '/templates/:boardId',
    component: TemplatePage,
  },
  {
    path: '/invite/:boardId/login',
    component: Login,
  },
  {
    path: '/invite/:boardId/signup',
    component: Signup,
  },
  {
    path: '/invite/:boardId',
    component: InvitePage,
  },
  {
    path: '/board',
    component: UserBoards,
  },
  {
    path: '/templates',
    component: UserBoards,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/test',
    component: Test,
  },
  {
    path: '/',
    component: HomePage,
  },
];

export default routes;
