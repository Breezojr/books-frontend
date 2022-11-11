import {
  Home,
  AddBook,
  EditBook,
  ViewBook,
} from './pages';

export const routes = [
  {
    path: '/',
    component: <Home />,
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
