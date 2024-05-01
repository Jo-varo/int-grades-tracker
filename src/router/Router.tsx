import { createBrowserRouter } from 'react-router-dom';
import Home from '../Home';
import StudentDashboard from '../views/StudentDashboard';
import AdminDashboard from '../views/AdminDashboard';
import App from '../App';
import Page404 from '../404';
import TeacherDashboard from '../views/TeacherDashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'admin',
        element: <AdminDashboard />,
      },
      {
        path: 'teacher',
        element: <TeacherDashboard />,
      },
      {
        path: 'student/:id',
        element: <StudentDashboard />,
      },
    ],
  },
]);
