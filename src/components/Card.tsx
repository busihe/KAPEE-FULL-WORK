// Importing the custom hook `useCart` from the hooks folder
import { useCart } from '../hooks/useCart';

// Define a TypeScript type for the props the Card component expects
type Props = {
  id: string;         // Unique identifier for the product
  title: string;      // Title or name of the product
  price: number;      // Price of the product
  image: string;      // URL of the product image
};

// Define and export the Card component
export default function Card({ id, title, price, image }: Props) {
  // Destructure the addToCart function from the useCart hook
  const { addToCart } = useCart();

  // Return JSX to render the product card
  return (
    <div className="card bg-white p-4 rounded-xl shadow">
      {/* Product image */}
      <img
        src={image} // Set the image source from props
        alt={title} // Accessibility: alt text is the product title
        className="w-full h-40 object-contain mb-4" // Tailwind styles for size and spacing
      />

      {/* Product title */}
      <h3 className="font-semibold">{title}</h3>

      {/* Product price */}
      <p className="text-red-500 font-bold">${price}</p>

      {/* Button to add product to the cart */}
      <button
        onClick={() => addToCart({ id, title, price, image, quantity: 1 })}
        // Calls the addToCart function with product details and a quantity of 1
        className="mt-3 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        // Tailwind styles: full width, red background, white text, padding, rounded corners, hover effect
      >
        Add to Cart
      </button>
    </div>
  );
}
