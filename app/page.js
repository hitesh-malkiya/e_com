
import Home from './components/Home';
import Categories from './components/Categories';


export default function HomePage({ searchParams }) {
  console.log("1 page.js");
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Home />
      <Categories searchParams={searchParams} />
    </div>
  );
}
