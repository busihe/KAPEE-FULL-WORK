import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="container-max mt-6 grid gap-4 md:grid-cols-3">
      {/* Big banner - full width on small, 2/3 on md+ */}
      <Link
        to="/shop"
        className="card relative overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.01] md:col-span-2"
      >
        <div className="aspect-[4/3] bg-slate-100">
          <img
            src="https://kapee.presslayouts.com/wp-content/uploads/2019/04/Solid-Men-Hooded-Blue-Grey-T-Shirt.jpg"
            alt="Main promo"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white drop-shadow-md">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Top Outfits
          </h2>
          <p className="mt-1 text-sm text-slate-200 opacity-90">
            Up to 40% off best sellers
          </p>
        </div>
      </Link>

      {/* Side banners stacked on small, side-by-side on md+ */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
        <Link
          to="/shop"
          className="card overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.01]"
        >
          <div className="aspect-[4/3] bg-slate-100">
            <img
              src="https://kapee.presslayouts.com/wp-content/uploads/2019/04/Men-Black-Analogue-Watch.jpg"
              className="h-full w-full object-cover"
              alt="Promo 2"
            />
          </div>
        </Link>
        <Link
          to="/shop"
          className="card overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.01]"
        >
          <div className="aspect-[4/3] bg-slate-100">
            <img
              src="https://kapee.presslayouts.com/wp-content/uploads/2019/04/Men-Black-Analogue-Watch.jpg"
              className="h-full w-full object-cover"
              alt="Promo 3"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
