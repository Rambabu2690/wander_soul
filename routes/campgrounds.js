const express=require('express');
const router=express.Router();
const method_override=require('method-override');
const catchAsync=require('../utils/catchAsync');
const Campground=require('../models/campground');
const{campgroundSchema , reviewSchema}=require('../schemas.js');
const{isLoggedIn,validateCampground,isAuthor}=require('../middleware');
const ExpressError=require('../utils/ExpressError');
const passport=require('passport');
const campgrounds=require('../controllers/campgrounds.js');
const multer  = require('multer')
const {storage}=require('../cloudinary');
const upload = multer({storage});

router.route('/')
          .get(catchAsync(campgrounds.index))
          .post(isLoggedIn,upload.array('image'), validateCampground,catchAsync(campgrounds.createCampground));
        

router.get('/new' ,isLoggedIn,campgrounds.renderNewForm);

router.route('/:id')
         .get(catchAsync(campgrounds.showCampgrounds))
         .put(isLoggedIn,isAuthor,upload.array('image'),validateCampground, catchAsync(campgrounds.updateCampground))
         .delete(isLoggedIn,isAuthor,catchAsync(campgrounds.deleteCampground));

router.get('/new' ,isLoggedIn,campgrounds.renderNewForm);


router.get('/:id/edit' ,isLoggedIn,isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports=router;