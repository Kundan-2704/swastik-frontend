export const AgentProducts = ({ products }: any) => {
  if (!products.length) return null;

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {products.map((p: any) => (
        <div key={p._id} className="border p-3 rounded">
          <p className="font-semibold">{p.name}</p>
          <p>₹{p.sellingPrice}</p>
          <p className="text-sm text-gray-500">{p.fabric}</p>
        </div>
      ))}
    </div>
  );
};
