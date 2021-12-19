import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Classroom from './pages/Classrooms';
import CourseUpload from './pages/CourseUpload';
import Courses from './pages/CardCourses';
import QuizUpload from './pages/QuizUpload';
import ViewQuiz from './pages/ViewQuiz';
import AddAnswers from './pages/AddAnswers';
import ViewAnswer from './pages/ViewAnswer';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'classrooms', element: <Classroom /> },
        { path: 'courses', element: <Courses /> },
        { path: 'blog', element: <Blog /> },
        { path: 'create_course', element: <CourseUpload /> },
        { path: 'create_quiz', element: <QuizUpload /> },
        { path: 'quiz', element: <ViewQuiz /> },
        { path: 'edit_quiz', element: <AddAnswers /> },
        { path: 'view_answer', element: <ViewAnswer /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
