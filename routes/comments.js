var express=require("express");
var router=express.Router({mergeParams:true});
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middleware=require("../middleware");

//Comments new
router.get("/new",middleware.isLoggedIn,function(req,res){
  //find the campground by ID
  Campground.findById(req.params.id,function(err,campground){
    if(err){
      console.log(err);
    }else{
      res.render("comments/new",{campground: campground});
    }
  });

});

//Comments create
router.post("/",middleware.isLoggedIn,function(req,res){
  //lookup the campground using ID
  Campground.findById(req.params.id,function(err,foundcampground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    }else{
      var newcomment=req.body.comment;
      Comment.create(newcomment,function(err,newcomment){
        if(err){
          req.flash("error","Something went wrong");
          console.log(err);
        }else{
          //add username and id to comment
          newcomment.author.id=req.user._id;
          newcomment.author.username=req.user.username;
          //save the comment
          newcomment.save();
          foundcampground.comments.push(newcomment);
          foundcampground.save();
          console.log(newcomment);
          req.flash("success","Successfully added comment");
          res.redirect("/campgrounds/" + foundcampground._id);
        }
      });
    }
  });
});
//EDIT COMMENT
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
  Comment.findById(req.params.comment_id,function(err,foundcomment){
    if(err){
      res.redirect("back");
    }else{
      res.render("comments/edit",{campground_id:req.params.id,comment:foundcomment});
    }
  });
});

//UPDATE COMMENT
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedcomment){
    if(err){
      console.log(err);
    }else{
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id,function(err){
    if(err){
      res.redirect("back");
    }else{
      req.flash("success","Comment deleted");
      res.redirect("/campgrounds/"+req.params.id);
    }
  });
});


module.exports=router;
