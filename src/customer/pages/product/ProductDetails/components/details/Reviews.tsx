
// const Reviews = () => {
//   return (
//     <div className="mt-16">
//       <h2 className="text-sm font-semibold text-[#4A1F2A] mb-4">
//         Customer Reviews
//       </h2>

//       <div className="space-y-4">
//         <div className="p-4 border rounded-xl bg-[#FDF9F2]">
//           <p className="font-medium">⭐️⭐️⭐️⭐️⭐️</p>
//           <p className="text-sm mt-1">
//             Beautiful saree, fabric feels premium. Totally worth it.
//           </p>
//           <p className="text-xs text-gray-500 mt-1">
//             Verified Buyer
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Reviews;










import { useEffect } from "react";
import { useAppDispatch, useAppSelector, type RootState } from "../../../../../../Redux Toolkit/Store";
import { fetchReviews } from "../../../../../../Redux Toolkit/Features/Customer/ReviewSlice";

const Reviews = () => {
  const dispatch = useAppDispatch();

  const { latestReviews, loading, error } = useAppSelector(
    (state: RootState) => state.reviews
  );

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  // ⭐ Star Generator (Better UI)
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span key={i}>
        {i < rating ? "⭐" : "☆"}
      </span>
    ));
  };

  return (
    <div className="mt-16">
      <h2 className="text-lg font-semibold text-[#4A1F2A] mb-6">
        Customer Reviews
      </h2>

      {/* ⭐ Loading Skeleton */}
      {loading && (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="p-4 border rounded-xl bg-gray-100 animate-pulse"
            >
              <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-full bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-32 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      )}

      {/* ⭐ Error */}
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {/* ⭐ Reviews List */}
      {!loading && latestReviews?.length > 0 && (
        <div className="space-y-4">
          {latestReviews.map((review: any) => (
            <div
              key={review._id}
              className="p-5 border rounded-xl bg-[#FDF9F2] hover:shadow-sm transition"
            >
              {/* ⭐ User */}
              <div className="flex items-center gap-3 mb-2">
                <div className="h-9 w-9 rounded-full bg-[#4A1F2A] text-white flex items-center justify-center text-sm font-semibold">
                  {review.userId?.name?.charAt(0) || "U"}
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#4A1F2A]">
                    {review.userId?.name || "Verified Buyer"}
                  </p>

                  <div className="text-sm text-yellow-500">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>

              {/* ⭐ Comment */}
              <p className="text-sm text-gray-700 leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ⭐ Empty State */}
      {!loading && latestReviews?.length === 0 && (
        <div className="text-center border rounded-xl p-8 bg-[#FDF9F2]">
          <p className="text-lg font-semibold text-[#4A1F2A] mb-2">
            ⭐ No reviews yet
          </p>

          <p className="text-sm text-gray-600 mb-4">
            Be the first to share your experience with this product.
          </p>

          <button className="px-4 py-2 bg-[#4A1F2A] text-white rounded-lg text-sm hover:opacity-90 transition">
            Write First Review
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
