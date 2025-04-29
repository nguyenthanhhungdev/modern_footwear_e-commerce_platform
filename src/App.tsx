import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import AppRoutes from './routes';

function App() {
  return (
    <Theme>
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <AppRoutes />
          <Footer />
        </div>
      </Router>
    </Theme>
  );
}

export default App;
