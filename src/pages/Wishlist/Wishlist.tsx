import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import { fetchWishlist } from "../../Redux Toolkit/Features/Customer/wishlistSlice";
import ProductCard from "../../customer/pages/product/ProductCard";

const Wishlist = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(
    (state) => state.wishlist.products
  );

  const loading = useAppSelector(
    (state) => state.wishlist.loading
  );

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  /* ✅ Loading State */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Loading wishlist...</p>
      </div>
    );
  }

  /* ✅ Empty State */
  if (!products || !products.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <h2 className="text-xl text-gray-500">
          Your wishlist is empty 💔
        </h2>
      </div>
    );
  }

  return (
    <div className="px-5 lg:px-20 pt-10">
      <h1 
    //   className="text-2xl font-bold mb-6 text-[#4A1F2A] text-center"
    className="text-center text-3xl md:text-4xl font-bold tracking-[0.25em] text-[#4A1F2A] mb-3"
      >
        My Wishlist
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-14">
       {products.map((product: any) => (
  <ProductCard
    key={product._id}
    item={product}
  />
))}
      </div>
    </div>
  );
};

export default Wishlist;