
interface StatCardProps {
  title: string;
  value?: number; // 👈 optional
  sub?: string;
  highlight?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value = 0, // 👈 default 0
  sub,
  highlight = false,
}) => {
  return (
    <div className="rounded-2xl p-4 bg-white border border-[#F0E4CC] shadow-sm">
      <p className="text-xs text-gray-500">{title}</p>

      <p
        className={`text-2xl font-bold mt-2 ${
          highlight ? "text-amber-600" : "text-[#4A1F2A]"
        }`}
      >
        ₹{Number(value).toLocaleString("en-IN")}
      </p>

      {sub && <p className="text-[11px] text-gray-500 mt-1">{sub}</p>}
    </div>
  );
};

export default StatCard;
