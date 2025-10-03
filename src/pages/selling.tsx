import React from 'react';
import { useCart } from '../hooks/useCart';

// Define the type for a product object to ensure type safety
interface Product {
  name: string;
  image: string;
  category: string;
  price: number;
  oldPrice: number | null;
}

const featuredProducts: Product[] = [
  {
    name: 'Apple AirPods with Wireless...',
    image: 'https://i.pinimg.com/736x/f4/8c/b2/f48cb235cb3cbf6ed2578b89c81c20ad.jpg',
    category: 'ELECTRONICS',
    price: 85.00,
    oldPrice: null,
  },
  {
    name: 'JBL Wireless Bluetooth Speaker...',
    image: 'https://i.pinimg.com/736x/35/31/35/353135bee5ae381d20cbd698ef1d44ab.jpg',
    category: 'ELECTRONICS',
    price: 96.00,
    oldPrice: null,
  },
  {
    name: 'JBL On-Ear Headphones',
    image: 'https://i.pinimg.com/736x/ed/29/fe/ed29fe371aa2772926695b9746b71706.jpg',
    category: 'ELECTRONICS',
    price: 124.00,
    oldPrice: null,
  },
];

const recentProducts: Product[] = [
  {
    name: 'Apple iPhone 11 Pro Max 256GB',
    image: 'https://i.pinimg.com/736x/60/48/cd/6048cdea88f757c5906121bcbc33aae2.jpg',
    category: 'ELECTRONICS',
    price: 199.00,
    oldPrice: 254.00,
  },
  {
    name: 'Apple AirPods with Wireless...',
    image: 'https://i.pinimg.com/736x/e1/63/91/e16391329a898f1b2b99ed2818a972b6.jpg',
    category: 'ELECTRONICS',
    price: 85.00,
    oldPrice: null,
  },
  {
    name: 'Apple Watch Series 5',
    image: 'https://i.pinimg.com/1200x/74/c6/77/74c677d20cde6c8d84680dcfe0ac83e1.jpg',
    category: 'ELECTRONICS',
    price: 499.00,
    oldPrice: 599.00,
  },
];

const onSaleProducts: Product[] = [
  {
    name: 'Apple iPhone 11 Pro Max 256GB',
    image: 'https://i.pinimg.com/736x/60/48/cd/6048cdea88f757c5906121bcbc33aae2.jpg',
    category: 'ELECTRONICS',
    price: 199.00,
    oldPrice: 254.00,
  },
  {
    name: 'Apple Watch Series 5',
    image: 'https://i.pinimg.com/1200x/74/c6/77/74c677d20cde6c8d84680dcfe0ac83e1.jpg',
    category: 'ELECTRONICS',
    price: 499.00,
    oldPrice: 599.00,
  },
  {
    name: 'Samsung Gear 360 Camera',
    image: 'https://i.pinimg.com/736x/72/c8/00/72c800c6c3ad5213e6a7ad6d00d6efd0.jpg',
    category: 'ELECTRONICS',
    price: 29.00,
    oldPrice: 49.00,
  },
];

const topRatedProducts: Product[] = [
  {
    name: 'Samsung Virtual Reality Head...',
    image: 'https://i.pinimg.com/736x/1a/47/50/1a4750c50b5993dfd000a1ecfa86f5cb.jpg',
    category: 'ELECTRONICS',
    price: 18.00,
    oldPrice: null,
  },
  {
    name: 'Microsoft Xbox One Wireless...',
    image: 'https://i.pinimg.com/1200x/69/62/de/6962de59a4fbb6e5ada12c7e7cd7ca3e.jpg',
    category: 'ELECTRONICS',
    price: 25.00,
    oldPrice: 45.00,
  },
  {
    name: 'Apple Watch Series 5 Black M...',
    image: 'https://i.pinimg.com/1200x/19/d2/53/19d253fa0a62a207d0cdf5e3e8a7f2be.jpg',
    category: 'ELECTRONICS',
    price: 599.00,
    oldPrice: null,
  },
];

const categoryBrands = [
  { letter: 'B', name: 'BEAUTY', tagline: 'BEAUTY TAGLINE' },
  { letter: 'D', name: 'DESIGN', tagline: 'DESIGN TAGLINE' },
  { letter: 'D', name: 'DRESS', tagline: 'DRESS TAGLINE' },
  { letter: 'F', name: 'FASHION', tagline: 'FASHION TAGLINE' },
  { letter: 'J', name: 'JACKET', tagline: 'JACKET TAGLINE' },
  { letter: 'S', name: 'SHOES', tagline: 'SHOES TAGLINE' },
];

const serviceIcons = [
  { icon: '📦', title: 'FREE SHIPPING', subtitle: 'On All Orders Over $99' },
  { icon: '🔄', title: 'EASY RETURNS', subtitle: '30 Days Return Policy' },
  { icon: '💳', title: 'SECURE PAYMENT', subtitle: '100% Secure Payment' },
  { icon: '🧑‍💻', title: '24/7 SUPPORT', subtitle: 'Dedicated Support' },
];

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart(); // Access addToCart from useCart hook

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    addToCart({
      id: product.name, // Using product name as ID for simplicity
      title: product.name,
      price: product.price,
      image: product.image,
      quantity: 1, // Default quantity is 1
    });
  };

  return (
    <div className="flex flex-col items-center space-x-4 p-2 bg-white shadow-md rounded-md">
      <img
        src={product.image}
        alt={product.name}
        className="w-16 h-16 object-contain rounded-md"
      />
      <div>
        <h4 className="text-sm font-semibold text-gray-800 leading-tight">{product.name}</h4>
        <div className="flex items-baseline mt-1">
          <span className="text-sm font-bold text-gray-900">${product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="ml-2 text-xs text-gray-400 line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-1 px-3 rounded-lg text-sm transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const Selling: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="w-full max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10">
        
        {/* Top Service Bar */}
        <div className="flex flex-wrap justify-between items-center mb-10 border-b border-gray-200 pb-6">
          {serviceIcons.map((service, index) => (
            <div key={index} className="flex items-center space-x-4 p-4">
              <span className="text-4xl">{service.icon}</span>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{service.title}</h3>
                <p className="text-sm text-gray-500">{service.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Product Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-1 w-8 bg-yellow-400 rounded-full"></div>
              <h3 className="text-xl font-bold text-gray-800">FEATURED</h3>
            </div>
            {featuredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-1 w-8 bg-yellow-400 rounded-full"></div>
              <h3 className="text-xl font-bold text-gray-800">RECENT</h3>
            </div>
            {recentProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-1 w-8 bg-yellow-400 rounded-full"></div>
              <h3 className="text-xl font-bold text-gray-800">ON SALE</h3>
            </div>
            {onSaleProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-1 w-8 bg-yellow-400 rounded-full"></div>
              <h3 className="text-xl font-bold text-gray-800">TOP RATED</h3>
            </div>
            {topRatedProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>

        {/* Category Brands */}
        <div className="flex flex-wrap justify-center md:justify-between items-center mt-10 space-y-4 md:space-y-0">
          {categoryBrands.map((brand, index) => (
            <div key={index} className="flex flex-col items-center mx-4">
              <span className="text-4xl font-extrabold text-gray-400">{brand.letter}</span>
              <span className="text-xs font-semibold text-gray-800 mt-2">{brand.name}</span>
              <span className="text-xs text-gray-500">{brand.tagline}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Selling;
