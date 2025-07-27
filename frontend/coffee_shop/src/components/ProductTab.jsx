import React, { useState } from "react";

const ProductTab = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Alice",
      date: "2025-07-25",
      comment: "Loved the smooth flavor and aroma!",
    },
    {
      id: 2,
      name: "Bob",
      date: "2025-07-26",
      comment: "Best coffee I've had this month!",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      id: Date.now(),
      name: reviewForm.name,
      date: new Date().toISOString().split("T")[0],
      comment: reviewForm.comment,
    };
    setReviews([newReview, ...reviews]);
    alert("Review submitted!");
    setReviewForm({ name: "", email: "", comment: "" });
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
          Reviews
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
          {/* Previous Reviews */}
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet. Be the first to comment!</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">{review.name}</span>
                    <span className="text-sm text-gray-400">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
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
                placeholder="Comment"
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
                className="bg-yellow-500 hover:bg-yellow-600 text-[#4B2E2E] font-semibold px-6 py-2 rounded-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTab;