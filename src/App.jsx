import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
import { useEffect } from 'react';
import { seedUsers } from './services/authService';
import { seedProducers } from './services/producerService';
import { seedProducts } from './services/productService';

/**
 * Main App Component
 * Root component that wraps the entire application with necessary providers
 */
function App() {
  // Seed demo data on first load (development only)
  useEffect(() => {
    seedUsers();
    seedProducers();
    seedProducts();
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
