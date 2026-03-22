import { useState } from 'react';
import Loading from './components/ui/Loading/Loading';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      {!isLoaded && <Loading onComplete={() => setIsLoaded(true)} />}

      <Header />
      <Home />
      <Footer />
    </div>
  );
}
export default App;
