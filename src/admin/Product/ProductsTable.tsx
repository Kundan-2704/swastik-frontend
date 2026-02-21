import PushPinIcon from "@mui/icons-material/PushPin";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";

import {
  fetchAdminProducts,
  pinProduct,
  unpinProduct,
} from "../../Redux Toolkit/Features/Admin/AdminProductsSlice";



const ProductsTable = () => {

  const dispatch = useAppDispatch();
const { products, loading } = useAppSelector((state) => state.adminProducts);


useEffect(() => {
  dispatch(fetchAdminProducts());
}, []);


// const handlePinToggle = (product: any) => {
//   if (product.priority > 0) {
//     dispatch(unpinProduct(product._id));
//   } else {
//     dispatch(pinProduct(product._id));
//   }
// };



const handlePinToggle = async (product: any) => {
  try {

    if (product.priority > 0) {
      await dispatch(unpinProduct(product._id)).unwrap();
    } else {
      await dispatch(pinProduct(product._id)).unwrap();
    }

  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Products</h2>
        <button className="bg-[#c08a4a] text-white px-4 py-2 rounded-lg">
          + Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
       <tbody>
  {products.map((product) => (
    <tr key={product._id} className="border-b hover:bg-gray-50">

      <td className="p-3">
        <img
          src={product.images?.[0]}
          className="w-14 h-14 rounded-lg object-cover"
        />
      </td>

      <td className="p-3 font-medium">
        {product.title}

        {product.priority > 0 && (
          <span className="ml-2 text-xs bg-[#4A1F2A] text-white px-2 py-1 rounded-full">
            Featured
          </span>
        )}
      </td>

      <td className="p-3">
        {product.category?.name}
      </td>

      <td className="p-3">
        ₹{product.sellingPrice}
      </td>

      <td className="p-3">
        {product.quantity}
      </td>

      <td className="p-3">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            product.quantity > 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {product.quantity > 0 ? "Active" : "Out of Stock"}
        </span>
      </td>

      <td className="p-3 space-x-3">

        {/* 🔥 PIN BUTTON */}
        <button
          onClick={() => handlePinToggle(product)}
          className={`p-2 rounded-full ${
            product.priority > 0
              ? "bg-[#B9935A] text-white"
              : "bg-gray-100"
          }`}
        >
          <PushPinIcon fontSize="small" />
        </button>

        <button className="text-blue-600 hover:underline">
          Edit
        </button>

        <button className="text-red-600 hover:underline">
          Delete
        </button>

      </td>
    </tr>
  ))}
</tbody>

      </div>
    </div>
  );
};

export default ProductsTable;
