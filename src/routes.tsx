import {
  Home,
  AddBook,
  EditBook,
  ViewBook,
  Signup
} from './pages';

export const routes = [
  {
    path: '/',
    component: <Home />,
  },
  {
    path: '/signup',
    component: <Signup />,
  },
  {
    path: '/add',
    component: <AddBook />,
  },
  {
    path: '/edit',
    component: <EditBook />,
  },
  {
    path: '/view',
    component: <ViewBook />,
  },

];
