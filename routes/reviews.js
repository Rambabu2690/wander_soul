const express=require('express');
const router=express.Router({mergeParams:true});
const method_override=require('method-override');
const catchAsync=require('../utils/catchAsync');
const Review=require('../models/review');
const Campground=require('../models/campground');
const{validateReview,isLoggedIn,isReviewAuthor}=require('../middleware');
const{campgroundSchema , reviewSchema}=require('../schemas.js');
const ExpressError=require('../utils/ExpressError');
const flash=require('connect-flash');
const reviews=require('../controllers/reviews');



router.post('/' ,isLoggedIn,validateReview, catchAsync(reviews.createReview));
 
 router.delete('/:reviewId' ,isLoggedIn,isReviewAuthor, catchAsync(reviews.deleteReview))

 module.exports=router;