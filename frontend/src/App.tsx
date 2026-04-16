import { Header } from './components/Header';
import { Catalog } from './pages/Catalog';
import { Cart } from './pages/Cart';
import { Delivery } from './pages/Delivery';
import { Auth } from './pages/Auth';
import { useEffect, useState } from 'react';

const App = () => {
  const [page, setPage] = useState<'catalog' | 'cart' | 'delivery' | 'auth'>('catalog');

  useEffect(() => {
    const path = window.location.hash.slice(1) || 'catalog';
    setPage(path as any);
  }, []);

  //const navigate = (newPage: any) => {
    //window.location.hash = newPage;
    //setPage(newPage);
  //};

  const renderPage = () => {
    switch (page) {
      case 'catalog': return <Catalog />;
      case 'cart': return <Cart />;
      case 'delivery': return <Delivery />;
      case 'auth': return <Auth />;
      default: return <Catalog />;
    }
  };

  return (
    <div className="App">
      <Header />
      <main style={{ minHeight: '80vh' }}>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;