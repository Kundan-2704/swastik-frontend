const mockCommissions = [
  { id: 1, order: "#SW1234", amount: 4200, commission: 420, status: "Approved" },
  { id: 2, order: "#SW1235", amount: 2800, commission: 280, status: "Pending" },
  { id: 3, order: "#SW1236", amount: 3500, commission: 350, status: "Approved" },
];

const AffiliateCommissions = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Commission History</h1>

      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Order</th>
            <th>Amount</th>
            <th>Commission</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {mockCommissions.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-4">{c.order}</td>
              <td>₹{c.amount}</td>
              <td>₹{c.commission}</td>
              <td className={c.status === "Approved" ? "text-green-600" : "text-yellow-600"}>
                {c.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AffiliateCommissions;