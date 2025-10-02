type Props = {
  title: string;
  value: string | number;
};

export default function DashboardCard({ title, value }: Props) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow text-center max-w-xs mx-auto sm:max-w-full">
      <p className="text-base sm:text-lg font-semibold">{title}</p>
      <p className="text-xl sm:text-2xl mt-2">{value}</p>
    </div>
  );
}
