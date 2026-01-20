import { useEffect } from "react";
import { useAppDispatch } from "../../Redux Toolkit/Store";
import { fetchTransactionsBySeller } from "../../Redux Toolkit/Features/Seller/transactionSlice";

interface TransactionItem {
  id: string;
  type: "Credit" | "Debit";
  amount: number;
  method: string;
  date: string;
}

const transactions: TransactionItem[] = [
  { id: "TXN-1001", type: "Credit", amount: 2499, method: "UPI", date: "2025-12-05" },
  { id: "TXN-1000", type: "Debit", amount: 199, method: "Charges", date: "2025-12-04" },
  { id: "TXN-0999", type: "Credit", amount: 1299, method: "Bank Transfer", date: "2025-12-03" },
];

const Transaction: React.FC = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTransactionsBySeller(localStorage.getItem("jwt")));
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-[#4A1F2A]">Transactions</h2>
        <p className="text-xs text-gray-500 mt-1">
          Detailed list of all credits and debits in your seller account.
        </p>
      </div>

      <div className="rounded-2xl bg-white border border-[#F0E4CC] overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#FFF7EA] text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">order</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id} className="border-t text-sm">
                <td className="px-4 py-3 font-medium">{txn.id}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-[11px] font-medium ${
                      txn.type === "Credit"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-rose-50 text-rose-600"
                    }`}
                  >
                    {txn.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-600">{txn.method}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{txn.date}</td>
                <td className="px-4 py-3">
                  {txn.type === "Debit" ? "-" : "+"}₹{txn.amount}
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-xs text-gray-400"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
