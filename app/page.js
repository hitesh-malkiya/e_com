
import { Home } from './components/Home';
import Categories from './components/Categories';
import Product from './components/Product';


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Home />
      {/* Categories Section */}
      <Categories />
      {/* Featured Products */}
   
    </div>
  );
}
