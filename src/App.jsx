import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
import { useEffect } from 'react';
import { seedUsers } from './services/authService';

/**
 * Main App Component
 * Root component that wraps the entire application with necessary providers
 */
function App() {
  // Seed demo users on first load (development only)
  useEffect(() => {
    seedUsers();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
