var mongoose    =require('mongoose');
var Campground  =require("./models/campground");
var Comment     =require("./models/comment");

var data=[
  {
    name:"Clouds Rest",
    image:"https://images.pexels.com/photos/776117/pexels-photo-776117.jpeg?auto=compress&cs=tinysrgb&h=350",
    description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name:"Desert",
    image:"https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&h=350",
    description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name:"Canyon floor",
    image:"https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg?auto=compress&cs=tinysrgb&h=350",
    description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
]

function seedDB(){
  //Remove all campgrounds from DB
  Campground.remove({},function(err){
    if(err){
      console.log(err);
    }
    console.log("removed campgrounds");
    //add few campgrounds
     data.forEach(function(seed){
        Campground.create(seed,function(err,campground){
          if(err){
            console.log(err);
          }else{
            console.log("added new campground");
            //create a comment
            Comment.create(
              {
                  text:"this place is greate",
                  author:"homer"
              },function(err,comment){
                if(err){
                  console.log(err);
                }else{
                  campground.comments.push(comment);
                  campground.save();
                  console.log("created new comment");
                }
              });
          }
        });
    });
  });
}

module.exports=seedDB;
