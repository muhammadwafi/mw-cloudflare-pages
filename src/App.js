import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Container } from 'reactstrap';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/authContext';
import { ToastContainer, toast } from 'react-toastify';
import useAuth from './hooks/useAuth';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Loading from './components/loading/Loading';
import './styles/App.scss';
import "react-toastify/dist/ReactToastify.css";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 30000,
      refetchIntervalInBackground: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
  },
});

const LayoutQuery = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      { children }
    </QueryClientProvider>
  )
}

const Home = lazy(() => import('./pages/Home'));
const Posts = lazy(() => import('./pages/Posts'));
const PostDetail = lazy(() => import('./pages/PostDetail'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));


function ProtectedRoute({ children }) {
  const { user, isAuthenticated } = useAuth();
  let location = useLocation();

  if (!isAuthenticated && !Object.keys(user).length) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected.
    toast.error('You need to sign in first', {
      toastId: "need-sign-in"
    })
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}


function RestrictOnAuth({ children }) {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated && Object.keys(user).length) {
    return <Navigate to="/" />;
  }

  return children;
}


function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LayoutQuery>
        <AuthProvider>
          <div className="mw-app d-flex flex-column h-100">
            <Header/>
            <Container fluid="sm" className="my-4 flex-shrink-0" tag="main">
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/posts" element={
                  <ProtectedRoute>
                    <Posts/>
                  </ProtectedRoute>
                }/>
                <Route path="/posts/:slug" element={<PostDetail/>}/>
                <Route path="/:username" element={<Profile/>}/>
                <Route path="/login" element={
                  <RestrictOnAuth>
                    <Login/>
                  </RestrictOnAuth>
                }/>
                <Route path="/register" element={
                  <RestrictOnAuth>
                    <Register/>
                  </RestrictOnAuth>
                }/>
                {/* match all route that don't have explicit routes for */}
                <Route path="*" element={<PageNotFound/>}/>
              </Routes>
            </Container>
            <Footer/>
            <ToastContainer
              theme="colored"
              position="top-right"
              autoClose={8000}
              hideProgressBar={false}
              newestOnTop={true}
              draggable={true}
              limit={5}
              pauseOnVisibilityChange
              closeOnClick
              pauseOnHover
            />
          </div>
        </AuthProvider>
      </LayoutQuery>
    </Suspense>
  );
}

export default App;
