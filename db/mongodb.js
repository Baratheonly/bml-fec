import mongoose from 'mongoose';

const {Schema} = mongoose;

const ReviewsSchema = new Schema({
  product_id: String,
  reviews: [{
    review_id: Number,
    rating: Number,
    summary: String,
    recommend: Boolean,
    response: String,
    body: String,
    date: {
      type: Date,
      default: Date.now
    },
    reviewer_name: String,
    helpfulness: Number,
    reported: Boolean,
    photos: [
      {
        id: Number,
        url: String
      }
    ]
  }],
  meta: {
    ratings: {
      1: String,
      2: String,
      3: String,
      4: String,
      5: String,
    },
    recommended: Boolean,
    characteristics: {
      fit: String,
      length: String,
      comfort: String,
      quality: String
    }
  }
})