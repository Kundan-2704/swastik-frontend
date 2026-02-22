import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../Redux Toolkit/Store";

import StarRating from "./StarRating";
import {
  clearReviews,
  createReview,
  fetchProductReviews,
} from "../../../../../../Redux Toolkit/Features/Customer/ReviewSlice";

const Reviews = ({ productId }: any) => {
  const dispatch = useAppDispatch();

  const { productReviews, loading } = useAppSelector(
    (state) => state.reviews
  );

  const [showReviewBox, setShowReviewBox] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  /* ================= FETCH REVIEWS ================= */

  useEffect(() => {
    dispatch(clearReviews());

    if (productId) {
      dispatch(fetchProductReviews(productId));
    }
  }, [dispatch, productId]);

  /* ================= SUBMIT REVIEW ================= */

  const handleSubmit = () => {
    if (!comment.trim()) return alert("Write something bro 😏");

    dispatch(
      createReview({
        productId,
        rating,
        comment,
      })
    );

    setComment("");
    setShowReviewBox(false);
  };

  /* ================= STAR DISPLAY ================= */

  const renderStars = (rating: number) =>
    [...Array(5)].map((_, i) => (
      <span key={i}>{i < rating ? "⭐" : "☆"}</span>
    ));

  return (
    <div className="mt-16">
      <h2 className="text-lg font-semibold text-[#4A1F2A] mb-6">
        Customer Reviews
      </h2>

      {/* ================= LOADING SKELETON ================= */}

      {loading && (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="p-5 border rounded-xl bg-gray-100 animate-pulse"
            >
              <div className="h-4 w-24 bg-gray-300 rounded mb-3"></div>
              <div className="h-3 w-full bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-32 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      )}

      {/* ================= REVIEWS LIST ================= */}

      {!loading && productReviews?.length > 0 && (
        <div className="space-y-4">
          {productReviews.map((review: any) => (
            <div
              key={review._id}
              className="p-5 border rounded-xl bg-[#FDF9F2] hover:shadow-sm transition"
            >
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

              <p className="text-sm text-gray-700 leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ================= EMPTY STATE ================= */}

      {!loading && productReviews?.length === 0 && (
        <div className="text-center border rounded-xl p-8 bg-[#FDF9F2]">
          <p className="text-lg font-semibold text-[#4A1F2A] mb-2">
            ⭐ No reviews yet
          </p>

          <p className="text-sm text-gray-600 mb-4">
            Be the first to share your experience with this product.
          </p>

          <button
            onClick={() => setShowReviewBox(true)}
            className="px-4 py-2 bg-[#4A1F2A] text-white rounded-lg text-sm hover:opacity-90 transition"
          >
            Write First Review
          </button>
        </div>
      )}

      {/* ================= REVIEW BOX ================= */}

      {showReviewBox && (
        <div className="border rounded-xl p-5 mt-4 bg-white">
          <StarRating rating={rating} setRating={setRating} />

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full border rounded-lg p-3 mt-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A1F2A]"
          />

          <button
            onClick={handleSubmit}
            className="mt-3 px-4 py-2 bg-[#4A1F2A] text-white rounded-lg text-sm hover:opacity-90 transition"
          >
            Submit Review
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;