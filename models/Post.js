var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  
  UserID: String,
  PlaceName : String,
  PlaceAddress : String,
  PlaceDescription : String,
  Imagepath : String,
  ContactNumber : String,
  PlaceImage : String,
  PlaceRating : Number,
  PlaceReview : String,
  PlaceReviewDate : String,
  PlaceReviewUserImage : String,
  
}, {timestamps: true});

console.log("DB connected");

mongoose.model('Post', PostSchema);

