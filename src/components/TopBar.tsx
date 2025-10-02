import { Link } from 'react-router-dom';

export default function TopBar() {
  return (
    <div className="w-full bg-yellow-400 text-black text-sm">
      <div className="max-w-screen-xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-between px-4 py-2 gap-3">
        
        {/* Left: Promo Text */}
        <p className="w-full md:w-auto text-center md:text-left text-xs sm:text-sm">
          <span className="font-semibold">SUMMER SALE</span>, Get 40% Off for all products.
          <Link to="/shop" className="ml-1 underline">Shop now</Link>
        </p>

        {/* Right: Language / Currency / Links */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full md:w-auto justify-end">
          
          {/* Language & Currency Selectors */}
          <div className="flex items-center gap-2">
            <select className="bg-yellow-400 text-black text-xs sm:text-sm border-none focus:outline-none">
              <option>English</option>
              <option>Français</option>
              <option>Deutsch</option>
              <option>العربية</option>
            </select>
            <select className="bg-yellow-400 text-black text-xs sm:text-sm border-none focus:outline-none">
              <option>$ Dollar (US)</option>
              <option>₹ RUPEE (INR)</option>
              <option>£ Pound (UK)</option>
              <option>€ Euro (EUR)</option>
            </select>
          </div>

          {/* Optional Links */}
          <nav className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
            <Link to="/blog" className="hover:underline">Blog</Link>
            <Link to="/support" className="hover:underline">FAQ</Link>
            <Link to="/contact" className="hover:underline">Contact Us</Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
