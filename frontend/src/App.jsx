import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Login from './pages/Login';
import Register from './pages/Register';

import { queryClient } from './react-query/queryClient';
import Header from './components/Header';
import Parc from './components/Parc';
import Voiture from './components/Voiture';

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                user ? <Parc /> : <Navigate to="/login" replace={true} />
              }
            />
            <Route
              path=":id/voiture"
              element={
                user ? <Voiture /> : <Navigate to="/login" replace={true} />
              }
            />

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" replace={true} />}
            />
            <Route
              path="/register"
              element={
                !user ? <Register /> : <Navigate to="/" replace={true} />
              }
            />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}

export default App;
