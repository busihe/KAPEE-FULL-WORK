import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Shop() {
  return (
    <section className="px-4 py-10 max-w-screen-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Shopping</h1>
        <p className="text-gray-600">Browse all products.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
