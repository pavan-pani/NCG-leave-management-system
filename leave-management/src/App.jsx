import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import ProtectedRoute from './components/common/ProtectedRoute';
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const ApplyLeave = lazy(() => import('./pages/ApplyLeave'));
const Layout = lazy(() => import('./components/layout/Layout'));
const LoadingSpinner = lazy(() => import('./components/common/LoadingSpinner'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" 
            element={
              <Suspense fallback={<LoadingSpinner text="Loading..." />}>
                <Login />
              </Suspense>
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingSpinner text="Loading..." />}>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply-leave"
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingSpinner text="Loading..." />}>
                  <Layout>
                    <ApplyLeave />
                  </Layout>
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;