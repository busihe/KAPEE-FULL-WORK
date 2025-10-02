const cats = [
  { title: 'Mobiles' },
  { title: 'Laptops' },
  { title: 'Headphones' },
  { title: 'Smartwatch' },
  { title: 'Gaming' },
  { title: 'Cameras' },
  { title: 'TVs' },
];

export default function CategoryStrip() {
  return (
    <section className="container-max mt-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-7">
        {cats.map((c) => (
          <button
            key={c.title}
            className="card flex h-20 sm:h-24 flex-col items-center justify-center gap-1 sm:gap-2 hover:shadow transition-shadow rounded-md"
            type="button"
          >
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-brand/10" />
            <span className="text-xs sm:text-sm font-medium">{c.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
