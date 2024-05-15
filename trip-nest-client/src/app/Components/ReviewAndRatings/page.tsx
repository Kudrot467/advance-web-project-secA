'use client';
import React, { useState } from 'react';

const RoomReviewForm: React.FC = () => {
  const [review, setReview] = useState<string>('');
  const [rating, setRating] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you can handle the form submission, for example, send the review and rating to the backend
    console.log('Review:', review);
    console.log('Rating:', rating);
    // Reset form fields
    setReview('');
    setRating('');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-blue-500">
      <h1 className="text-3xl text-center text-blue-500 font-semibold mb-6"> Review and Ratings </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="review" className="block text-gray-700 font-bold mb-2">Review:</label>
          <textarea
            id="review"
            name="review"
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">Rating:</label>
          <input
            type="text"
            id="rating"
            name="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-gray-700"
            placeholder="Enter Rating"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out">Submit Review</button>
      </form>
    </div>
  );
};

export default RoomReviewForm;