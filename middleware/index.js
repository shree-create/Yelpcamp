var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middlewareObj={};

middlewareObj.checkCampgroundOwnership=function(req,res,next){
    //is user logged in?
    if(req.isAuthenticated()){
      Campground.findById(req.params.id,function(err,foundcampground){
        if(err){
          req.flash("error","Campground not found");
          res.redirect("back");
        }else{
          //does user own the campground?
          if(foundcampground.author.id.equals(req.user._id)){
          console.log(foundcampground);
              next();
          }else{
            req.flash("error","You dont have permission to do that");
            res.redirect("/campgrounds/"+foundcampground.id);
          }
        }
      });
    }else{
      req.flash("error","You need to be logged in to do that");
      res.redirect("back");
  }
}

middlewareObj.checkCommentOwnership=function(req,res,next){
  //is user logged in?
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id,function(err,foundcomment){
      if(err){
        res.redirect("back");
      }else{
        //does user own the comment?
        if(foundcomment.author.id.equals(req.user._id)){
        console.log(foundcomment);
            next();
        }else{
          req.flash("error","You dont have permission to do that");
          res.redirect("back");
        }
      }
    });
  }else{
    req.flash("error","You need to be logged in to do that");
    res.redirect("back");
}
}

middlewareObj.isLoggedIn=function(req, res, next){
      if(req.isAuthenticated()){
          return next();
        }
        req.flash("error","You need to be logged in to do that");
        res.redirect("/login");
}


module.exports=middlewareObj;
