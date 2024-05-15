'use client';
import React, { useState } from 'react';
import axios from 'axios';
import TopBar from '../Comp/topbar';

interface Booking {
  id: number;
  Hotelname: string;
  price: string;
  location: string;
  type: string;
}

const RoomSearch: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingHistory, setBookingHistory] = useState<Booking[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [showSearchResult, setShowSearchResult] = useState<boolean>(true);
  const [reviewVisible, setReviewVisible] = useState<number | null>(null);
  const [review, setReview] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [hotelnameForReviews, setHotelnameForReviews] = useState<string>('');
  const [locationForReviews, setLocationForReviews] = useState<string>('');
  const [reviews, setReviews] = useState<{ review: string; rating: string }[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSearch = async () => {
  
    setError(null);
    try {
      const response = await axios.get<Booking[]>(`http://localhost:4000/user/search/${location}`);
      setBookings(response.data);
      setShowSearchResult(true);
    } catch (error) {
      setError('Error searching for rooms');
    }
  
  };

  const handleBook = async (name: string) => {
    try {
      await axios.post(`http://localhost:4000/user/booking/${name}`);
      setSuccessMessage('Room booked successfully!');
     
    } catch (error) {
      console.error('Error booking room:', error);
    }
  };

  const handleBookhistory = async () => {
    try {
      const response = await axios.get<Booking[]>(`http://localhost:4000/user/bookingHistory`);
      setBookingHistory(response.data);
      setShowSearchResult(false);
    } catch (error) {
      console.error('Error fetching booking history:', error);
    }
  };

  const handleAddReview = (id: number) => {
    setReviewVisible(id);
  };

  const handleSubmitReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:4000/review/reviewrating', {
        hotelname: bookings.find(booking => booking.id === reviewVisible)?.Hotelname,
        location: bookings.find(booking => booking.id === reviewVisible)?.location, review, rating
      });
      console.log('Review and rating submitted successfully!');
      setReview('');
      setRating('');
      setReviewVisible(null);
    } catch (error) {
      console.error('Error submitting review and rating:', error);
    }
  };

  const handleViewReview = async (hotelname: string, location: string) => {
    try {
      const response = await axios.get<{ review: string; rating: string }[]>(
        `http://localhost:4000/review/seereviews?hotelname=${hotelname}&location=${location}`
      );
      setReviews(response.data);
      setShowSearchResult(false);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  return (
    <>
      <TopBar />
      <div className="flex justify-center">
        <div className="w-full max-w-screen-md">
          <h1 className="text-3xl text-center text-blue-500 font-semibold mb-6">Book Room</h1>
          <div className="bg-white border border-blue-500 p-6 rounded-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-blue-500 font-semibold mb-2">
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-blue-500 font-semibold mb-2">
                Email:
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block text-blue-500 font-semibold mb-2">
                Location:
              </label>
              <input
                type="text"
                id="location"
                placeholder="Enter location"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-black"
              />
            </div>
            <div>
              <button
                onClick={handleSearch}
                // disabled={loading}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
              >
                Search
              </button>
            </div>
            <br />
            <div>
              <button
                onClick={handleBookhistory}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Booking history
              </button>
            </div>
            {/* {loading && <p className="text-center my-4 text-black">Loading...</p>} */}
            {error && <p className="text-center text-red-500 my-4">Error searching for rooms</p>}
            {showSearchResult && bookings.length > 0 && (
              <div className="overflow-x-auto">
                <h2 className="text-2xl text-center text-blue-500 font-semibold mb-6"> Available Rooms </h2>
                <table className="w-full bg-gray-200 rounded-lg table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-black font-semibold">Hotel ID</th>
                      <th className="px-4 py-2 text-left text-black font-semibold">Hotel Name</th>
                      <th className="px-4 py-2 text-left text-black font-semibold">Price</th>
                      <th className="px-4 py-2 text-left text-black font-semibold">Location</th>
                      <th className="px-4 py-2 text-left text-black font-semibold">Type</th>
                      <th className="px-4 py-2 text-left text-black font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking: Booking) => (
                      <React.Fragment key={booking.id}>
                        <tr className="bg-white">
                          <td className="px-4 py-2 text-left text-black">{booking.id}</td>
                          <td className="px-4 py-2 text-left text-black">{booking.Hotelname}</td>
                          <td className="px-4 py-2 text-left text-black">{booking.price}</td>
                          <td className="px-4 py-2 text-left text-black">{booking.location}</td>
                          <td className="px-4 py-2 text-left text-black">{booking.type}</td>
                          <td className="px-4 py-2 text-left">
                            <button
                              onClick={() => handleBook(booking.Hotelname)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                            >
                              Book
                            </button>
                            <button
                              onClick={() => handleAddReview(booking.id)}
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md ml-2"
                            >
                              Add Review
                            </button>
                            <br />
                            <button
                              onClick={() => handleViewReview(booking.Hotelname, booking.location)}
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md ml-2"
                            >
                              View Review
                            </button>
                          </td>
                        </tr>
                        {reviewVisible === booking.id && (
                          <tr className="bg-white">
                            <td colSpan={6} className="px-4 py-2">
                              <form onSubmit={handleSubmitReview}>
                                <div className="mb-4">
                                  <label htmlFor={`review-${booking.id}`} className="block text-gray-700 font-bold mb-2">
                                    Review:
                                  </label>
                                  <textarea
                                    id={`review-${booking.id}`}
                                    name={`review-${booking.id}`}
                                    rows={4}
                                    value={review}
                                    onChange={e => setReview(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md text-gray-700"
                                    required
                                  />
                                </div>
                                <div className="mb-4">
                                  <label htmlFor={`rating-${booking.id}`} className="block text-gray-700 font-bold mb-2">
                                    Rating:
                                  </label>
                                  <input
                                    type="text"
                                    id={`rating-${booking.id}`}
                                    name={`rating-${booking.id}`}
                                    value={rating}
                                    onChange={e => setRating(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md text-gray-700"
                                    placeholder="Enter Rating"
                                    required
                                  />
                                </div>
                                <button
                                  type="submit"
                                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
                                >
                                  Submit Review
                                </button>
                              </form>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {!showSearchResult && bookingHistory.length > 0 && (
              <div className="overflow-x-auto mt-8">
                <h2 className="text-2xl text-center text-blue-500 font-semibold mb-6">Booking History</h2>
                <table className="w-full bg-gray-200 rounded-lg table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-black font-semibold">Hotel ID</th>
                      <th className="px-4 py-2 text-left text-black font-semibold">Hotel Name</th>
                      <th className="px-4 py-2 text-left text-black font-semibold">Price</th>
                      <th className="px-4 py-2 text-left text-black font-semibold">Location</th>
                      <th className="px-4 py-2 text-left text-black font-semibold">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingHistory.map((booking: Booking) => (
                      <tr key={booking.id} className="bg-white">
                        <td className="px-4 py-2 text-left text-black">{booking.id}</td>
                        <td className="px-4 py-2 text-left text-black">{booking.Hotelname}</td>
                        <td className="px-4 py-2 text-left text-black">{booking.price}</td>
                        <td className="px-4 py-2 text-left text-black">{booking.location}</td>
                        <td className="px-4 py-2 text-left text-black">{booking.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {!showSearchResult && reviews.length > 0 && (
              <div className="overflow-x-auto mt-8">
                <h2 className="text-2xl text-center text-blue-500 font-semibold mb-6">
                  Reviews for {hotelnameForReviews} - {locationForReviews}
                </h2>
                <table className="w-full bg-gray-200 rounded-lg table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-black font-semibold">Review</th>
                      <th className="px-4 py-2 text-left text-black font-semibold">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((review, index) => (
                      <tr key={index} className="bg-white">
                        <td className="px-4 py-2 text-left text-black">{review.review}</td>
                        <td className="px-4 py-2 text-left text-black">{review.rating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>);
};

export default RoomSearch;