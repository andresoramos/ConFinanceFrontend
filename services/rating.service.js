import axios from 'axios';
import tokens from '../token';

export const findInitialRating = (business) => {
  console.log(business.ourRating, 'This is our rating, bich');
  if (business.ourRating) {
    const total = Object.keys(business.ourRating).length;
    if (total === 0) {
      return 5;
    }
    const ratingsTotal = sumRatings(business.ourRating);
    const average = ratingsTotal / total;
    console.log(average, 'THIS IS THE AVERAGE RATING');
    return average;
  }
  const ratingCreated = axios.post(
    `${tokens.backendApi}/favorites/ratingCreated`,
    {ratings: {}, id: business._id},
  );
  return 5;
};

export const findTotalRatings = (business) => {
  if (business.ourRating) {
    return Object.keys(business.ourRating).length;
  }
  return 0;
};
export const submitComment = async (userId, companyId, comment, rating) => {
  const addComment = await axios.post(
    `${tokens.backendApi}/favorites/addReview`,
    {
      userId,
      companyId,
      comment,
      rating,
    },
  );
  return addComment.data;
};
export const addRating = async (payload) => {
  const ratingAdded = await axios.post(
    `${tokens.backendApi}/favorites/ratingAdded`,
    payload,
  );
  return ratingAdded.data;
};

const sumRatings = (obj) => {
  let total = 0;
  for (var key in obj) {
    total += obj[key].rating;
  }
  return total;
};
