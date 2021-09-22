import { HomePage } from './pages/home-page';
import { UserBoards } from './pages/user-boards';

// Routes accesible from the main navigation (in AppHeader)
const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/board',
    component: UserBoards,
  },
];

export default routes;
