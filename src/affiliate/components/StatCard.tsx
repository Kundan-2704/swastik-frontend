interface Props {
  title: string;
  value: string | number;
}

const StatCard = ({ title, value }: Props) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default StatCard;