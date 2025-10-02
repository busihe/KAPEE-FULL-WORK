import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';  // Assuming you have a useAuth hook for authentication
import { useNavigate } from 'react-router-dom';  // Import useNavigate

type Props = {
  id: string;         // Unique identifier for the product
  title: string;      // Title or name of the product
  price: number;      // Price of the product
  image: string;      // URL of the product image
};

export default function Card({ id, title, price, image }: Props) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth(); // Check if the user is authenticated
  const navigate = useNavigate(); // Use navigate hook to redirect to login

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // If the user is not logged in, redirect them to the login page
      navigate('/Login'); // Redirect to login page
      return;  // Prevent the item from being added to the cart
    }

    // If authenticated, add the item to the cart
    addToCart({ id, title, price, image, quantity: 1 });
  };

  return (
    <div className="card bg-white p-4 rounded-xl shadow hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* Product image */}
      <img
        src={image}
        alt={title}
        className="w-full h-36 sm:h-44 md:h-48 lg:h-52 object-contain mb-4"
      />

      {/* Product title */}
      <h3 className="font-semibold text-base sm:text-lg md:text-xl mb-1 truncate">{title}</h3>

      {/* Product price */}
      <p className="text-red-500 font-bold text-sm sm:text-base mb-4">${price.toFixed(2)}</p>

      {/* Button to add product to the cart */}
      <button
        onClick={handleAddToCart}
        className="mt-auto w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors text-sm sm:text-base"
        type="button"
      >
        Add to Cart
      </button>
    </div>
  );
}
