import { BoardPage } from './pages/board-page';
import { HomePage } from './pages/home-page';
import { UserBoards } from './pages/user-boards';
import { CardPage } from './pages/card-page';
import { Login } from './pages/login';
import { Signup } from './pages/signup';

// Routes accesible from the main navigation (in AppHeader)
const routes = [
  {
    path: '/board/:boardId/card/:cardId',
    component: BoardPage,
  },
  {
    path: '/board/:boardId',
    component: BoardPage,
  },
  {
    path: '/board',
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
    path: '/',
    component: HomePage,
  },
];

export default routes;
