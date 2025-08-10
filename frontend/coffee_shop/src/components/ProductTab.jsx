import React, { useEffect, useState } from "react";
import useReviews from "../hooks/useReview";

const ProductTab = ({ productId }) => {
  // debugger;
  const [activeTab, setActiveTab] = useState("info");
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const { reviews, loading, error, createReview } = useReviews({ productId });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createReview({
        reviewer_name: reviewForm.name,
        reviewer_email: reviewForm.email,
        reviewer_comment: reviewForm.comment,
        // product_id: productId,
      });
      setReviewForm({ name: "", email: "", comment: "" });
    } catch (err) {
      // Optionally show error
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12">
      {/* Toggle */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab("info")}
          className={`px-4 py-2 rounded-full ${
            activeTab === "info"
              ? "bg-yellow-500 text-[#4B2E2E]"
              : "bg-gray-500 text-white"
          }`}
        >
          Additional Info
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-4 py-2 rounded-full ${
            activeTab === "reviews"
              ? "bg-yellow-500 text-[#4B2E2E]"
              : "bg-gray-500 text-white"
          }`}
        >
          Reviews ({reviews.length})
        </button>
      </div>

      {/* Content */}
      {activeTab === "info" ? (
        <div className="bg-white p-6 rounded-xl shadow-sm text-[#4B2E2E]">
          <p>
            <strong>Serving Size:</strong> 350ml
          </p>
          <p>
            <strong>Allergens:</strong> Milk, Soy (Caramel Syrup)
          </p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-sm text-[#4B2E2E] space-y-6">
          {/* Error Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              Error loading reviews. Please try again.
            </div>
          )}

          {/* Previous Reviews */}
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
                <span className="ml-2">Loading reviews...</span>
              </div>
            ) : reviews.length === 0 ? (
              <p className="text-gray-500">
                No reviews yet. Be the first to comment!
              </p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">
                      {review.reviewer_name}
                    </span>
                    <span className="text-sm text-gray-400">
                      {review.created_at
                        ? new Date(review.created_at).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.reviewer_comment}</p>
                </div>
              ))
            )}
          </div>

          {/* Review Form */}
          <div>
            <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={reviewForm.name}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, name: e.target.value })
                }
                required
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={reviewForm.email}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, email: e.target.value })
                }
                required
                className="w-full px-4 py-2 border rounded"
              />
              <textarea
                placeholder="Write your review..."
                value={reviewForm.comment}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, comment: e.target.value })
                }
                required
                rows="4"
                className="w-full px-4 py-2 border rounded"
              ></textarea>
              <button
                type="submit"
                disabled={submitting || loading}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-[#4B2E2E] font-semibold px-6 py-2 rounded-full transition-colors"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTab;
