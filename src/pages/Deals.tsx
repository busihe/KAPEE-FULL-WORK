import { useEffect, useState } from 'react';
import { useCart } from '../hooks/useCart';
import Selling from './selling';

export default function Deals() {
  const [seconds, setSeconds] = useState(3600);
  const { addToCart } = useCart();

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const deals = [
    {
      id: 'tv-1',
      title: 'Mega TV Bundle',
      desc: 'Save big on the entertainment setup.',
      price: 899,
      original: 1199,
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'cam-1',
      title: 'Creator Camera Kit',
      desc: 'Lens + mic + bag included.',
      price: 1099,
      original: 1399,
      image: 'https://www.samys.com/imagesproc/L2ltYWdlcy9wcm9kdWN0L21haW4vUy0wNzgzMjZ4NzYwXzIuanBn_H_SH480_MW480.jpg',
    },
    {
      id: 'game-1',
      title: 'Gaming Starter Pack',
      desc: 'Console, controller, and headset bundle.',
      price: 499,
      original: 649,
      image: 'https://www.konix-interactive.com/wp-content/uploads/2025/01/3328170001311-2.jpg',
    },
    {
      id: 'office-1',
      title: 'Home Office Kit',
      desc: 'Desk, chair, and monitor combo.',
      price: 749,
      original: 999,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlpgH02pV1SGq-PJHLEU_r2p5Axg2PD0AI2Q&s',
    },
    {
      id: 'vlog-1',
      title: 'Travel Vlogging Set',
      desc: 'Action cam, tripod, and mic.',
      price: 299,
      original: 449,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSRq_nIZguFvxx4O4XeqW4G38B3FvPC9wXZg&s',
    },
    {
      id: 'kitchen-1',
      title: 'Kitchen Essentials Set',
      desc: 'Air fryer, blender, and kettle.',
      price: 199,
      original: 299,
      image: 'https://www.techicy.com/wp-content/uploads/2017/09/Good-Kitchen-Appliances.jpg',
    },
    {
      id: 'fitness-1',
      title: 'Fitness Tracker Pack',
      desc: 'Smartwatch + band + bottle combo.',
      price: 159,
      original: 249,
      image: 'https://sc04.alicdn.com/kf/H3ef6259c4d2c48a4b6404c7d30ef11f6e.jpg',
    },
  ];
  return (
    <>
    <section className="container-max px-4 sm:px-6 lg:px-8 my-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-black tracking-tight">
          ⚡ Deals of the Day
        </h1>
        <p className="text-slate-600 dark:text-gray-500 mt-2">
          Hurry! Offer ends in{' '}
          <span className="font-semibold text-red-500">
            {`${h}h ${m}m ${s}s`}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition p-6 flex flex-col"
          >
            <img
              src={deal.image}
              alt={deal.title}
              className="w-full h-52 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
              {deal.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300">{deal.desc}</p>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-2xl font-bold text-amber-600">
                ${deal.price}
              </span>
              <span className="text-slate-400 line-through">
                ${deal.original}
              </span>
            </div>
            <button
              onClick={() =>
                addToCart({
                  id: deal.id,
                  title: deal.title,
                  price: deal.price,
                  image: deal.image,
                  quantity: 1,
                })
              }
              className="mt-auto bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Grab Deal
            </button>
          </div>
        ))}
      </div>

    </section>
    <Selling/>
    </>
  );
}
