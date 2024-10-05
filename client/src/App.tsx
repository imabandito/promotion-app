import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AddArticle } from './pages/AddArticle/AddArticle.tsx';
import { Auth } from './pages/Auth/Auth.tsx';
import { Dashboard } from './pages/Dashboard/Dashboard.tsx';
import { Profile } from './pages/Profile/Profile.tsx';
import { Error } from './pages/Error/Error.tsx';
import { ProtectedRoute } from './routes/ProtectedRoute/ProtectedRoute.tsx';
import { Terms } from './pages/Terms/Terms.tsx';
import { Article } from './pages/Article/Article.tsx';
import { PublicRoute } from './routes/PublicRoute/PublicRoute.tsx';

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    errorElement: <Error />,
    children: [
      {
        path: 'login',
        element: <Auth authType="login" />,
      },
      {
        path: 'signup',
        element: <Auth authType="signup" />,
      },
      {
        path: 'forgot',
        element: <Auth authType="forgot" />,
      },
      {
        path: 'terms',
        element: <Terms />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: 'addarticle',
        element: <AddArticle type="new" />,
      },
      {
        path: 'editarticle/:articleId',
        element: <AddArticle type="edit" />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'articles/:articleId',
        element: <Article />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
