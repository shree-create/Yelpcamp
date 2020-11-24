require('dotenv').config();
var express     =require("express"),
    app         =express(),
    bodyParser  =require("body-parser"),
    mongoose    =require("mongoose"),
    flash       =require("connect-flash"),
    Campground  =require("./models/campground"),
    Comment     =require("./models/comment"),
    User        =require("./models/user"),
    methodOverride=require("method-override"),
    passport    =require("passport"),
    LocalStrategy=require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose"),
    seedDB      =require("./seeds");

//seedDB();
//requiring routes
var campgroudRoutes  =require("./routes/campgrounds"),
    commentRoutes   =require("./routes/comments"),
    indexRoutes     =require("./routes/index");


var url=process.env.DATABASEURL || "mongodb+srv://shree_24:shree_24@cluster0.nrecb.mongodb.net/yelpcamp_db?retryWrites=true&w=majority";
mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("cookie-session")({
  secret : "Once again rudty win cutest dog",
  resave :false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser=req.user;
  res.locals.error=req.flash("error");
  res.locals.success=req.flash("success");
  next();
});

app.use("/campgrounds",campgroudRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/",indexRoutes);

app.listen(process.env.PORT||3000, process.env.IP,function(){
  console.log("YELP CAMP SERVER STARTED");
});
