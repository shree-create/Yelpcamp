var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware");


//INDEX -show all campgrounds
router.get('/',function(req,res){
  //getting all campgrounds from db
  Campground.find({},function(err,allcampgrounds){
    if(err){
      console.log(err);
    }else{
      res.render("campground/index",{campgrounds:allcampgrounds});
    }
  });
});

//CREATE-add new campground to DB
router.post("/",middleware.isLoggedIn,function(req,res){
  var name=req.body.name;
  var price=req.body.price;
  var image=req.body.image;
  var desc=req.body.description;
  var author={
    id:req.user._id,
    username:req.user.username
  };
  var newCampground={name: name, price:price, image: image, description: desc,author:author};
  //create new campground and save to db
  Campground.create(newCampground,function(err,newlycreated){
    if(err){
      console.log(err);
    }else{
      console.log(newlycreated);
      res.redirect("/campgrounds");
    }
  });
});

//NEW -show form to create new campground
router.get("/new",middleware.isLoggedIn,function(req,res){
  res.render("campground/new");
});

//SHOW -shows more info about one campground
router.get("/:id",function(req,res){
  //find the campground with provided id
  Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
    if(err){
      console.log(err);
    }else{
      //render show template with that campground
      res.render("campground/show",{campground:foundcampground});
    }
  });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundcampground){
            res.render("campground/edit",{campground:foundcampground});
    });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
  //find and update the correct campground
  var data=req.body.campground;
  Campground.findByIdAndUpdate(req.params.id,data,function(err,updatedcampground){
    if(err){
      res.redirect("/campgrounds");
    }else{
        //redirect somewhere(show page)
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//DELETE ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
  Campground.findByIdAndRemove(req.params.id,function(err){
    if(err){
      res.redirect("/campgrounds");
    }else{
      res.redirect("/campgrounds");
    }
  });
});



module.exports=router;
