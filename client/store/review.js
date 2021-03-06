import axios from "axios";

const CREATE_REVIEW = "CREATE_REVIEW";
const READ_REVIEWS = "READ_REVIEWS";
const UPDATE_REVIEW = "UPDATE_REVIEW";
const DELETE_REVIEW = "DELETE_REVIEW";

const createReview = review => ({ type: CREATE_REVIEW, review });
const readReviews = reviews => ({ type: READ_REVIEWS, reviews });
const updateReview = review => ({ type: UPDATE_REVIEW, review });
const deleteReview = review => ({ type: DELETE_REVIEW, review });

export const postReview = function(review) {
  return function thunk(dispatch) {
    axios
      .post(`/api/packages/${review.packageId}/reviews`, review)
      .then(postedReview => {
        dispatch(createReview(postedReview.data))})
      .catch(err => console.log(err));
  };
};

export const putReviews = function(review) {
  return function thunk(dispatch) {
    axios
      .put(`/api/reviews/${review.productId}/`, review)
      .then(res => res.data)
      .then(putReview => dispatch(updateReview(putReview)))
      .catch(err => console.log(err));
  };
};

export const destroyReview = function(review) {
  return function thunk(dispatch) {
    axios
      .delete(`/api/reviews/${review.id}`)
      .then(res => res.data)
      .then(() => dispatch(deleteReview(review)))
      .catch(err => console.log(err));
  };
};

export const getReviews = function(packageId) {
  return function thunk(dispatch) {
    axios
      .get(`/api/packages/${packageId}/reviews`)
      .then(res => res.data)
      .then(reviews => dispatch(readReviews(reviews)))
      .catch(err => console.log(err));
  };
};

export default function reviewReducer(state = [], action) {

  switch (action.type) {
    case CREATE_REVIEW:
      return [action.review, ...state];
    case READ_REVIEWS:
      return [...action.reviews];
    case UPDATE_REVIEW:
      return state.map(
        review => (action.review.id === review.id ? action.review : review)
      );
    case DELETE_REVIEW:
      return state.filter(reviews => reviews !== action.review);
      default:
      return state
  }
}
