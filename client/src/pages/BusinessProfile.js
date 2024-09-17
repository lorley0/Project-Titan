import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitVerificationRequest } from '../actions/business'; // Import the action
import { submitReview } from '../actions/review'; // Import the action for submitting reviews

const BusinessProfile = () => {
  const dispatch = useDispatch();
  const business = useSelector(state => state.business); // Assume you have the business data in your Redux store
  const user = useSelector(state => state.auth.user); // Get the logged-in user
  const [verificationDocument, setVerificationDocument] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleFileChange = (e) => {
    setVerificationDocument(e.target.files[0]);
  };

  const handleVerificationSubmit = () => {
    const formData = new FormData();
    formData.append('document', verificationDocument);
    dispatch(submitVerificationRequest(business._id, formData));
  };

  const handleReviewSubmit = () => {
    const reviewData = {
      businessId: business._id,
      rating,
      comment,
      userId: user._id
    };
    dispatch(submitReview(reviewData));
  };

  return (
    <div>
      <h1>{business.name}</h1>
      <p>{business.description}</p>
      <p>{business.address}</p>
      {/* Verification Section */}
      <div>
        {business.isVerified ? (
          <p>Verified Business</p>
        ) : (
          <div>
            <p>Your business is not verified.</p>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleVerificationSubmit}>Submit Verification</button>
          </div>
        )}
      </div>
      {/* Reviews Section */}
      <div>
        <h2>Leave a Review</h2>
        <div>
          <label>Rating:</label>
          <input 
            type="number" 
            value={rating} 
            onChange={e => setRating(e.target.value)} 
            min="1" max="5" 
          />
        </div>
        <div>
          <label>Comment:</label>
          <textarea 
            value={comment} 
            onChange={e => setComment(e.target.value)}
          />
        </div>
        <button onClick={handleReviewSubmit}>Submit Review</button>
      </div>
      {/* Display Reviews */}
      <div>
        <h2>Reviews</h2>
        {business.reviews.length ? (
          business.reviews.map(review => (
            <div key={review._id} className="review-card">
              <p>Rating: {review.rating}/5</p>
              <p>{review.comment}</p>
              <p>By: {review.user.name}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default BusinessProfile;