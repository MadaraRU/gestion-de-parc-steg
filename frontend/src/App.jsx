import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { queryClient } from './react-query/queryClient';
import Header from './components/Header';
import Parc from './components/Parc';
import Voiture from './components/Voiture';

function App() {
  const { user } = useAuthContext();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={user ? <Parc /> : <Navigate to="/login" replace={true} />}
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
            element={!user ? <Register /> : <Navigate to="/" replace={true} />}
          />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
