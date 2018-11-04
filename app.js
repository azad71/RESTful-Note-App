//IMPORT DEPENDENCIES
var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    method = require("method-override"),
    sanitizer = require("express-sanitizer"),
    app = express();

//APP CONFIG
mongoose.connect("mongodb://localhost/note-app", {useNewUrlParser : true});
mongoose.set("useFindAndModify", false);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(sanitizer());
app.use(method("_method"));

//SCHEMA CONFIG
var noteSchema = new mongoose.Schema({
   title : String,
   image : String,
   content : String,
   created : {type : Date, default : Date.now},
});

var Note = mongoose.model("Note", noteSchema);

//ROUTE CONFIG
app.get("/", (req, res)=>{
    res.redirect("/notes");
});

//INDEX ROUTE
app.get("/notes", (req, res)=>{
   Note.find({}, (err, notes) =>{
      if(err) {
          res.send("Index route is not working...):");
      } else {
          res.render("index", {notes : notes});
      }
   });
});

//NEW ROUTE
app.get("/notes/new", (req, res) => {
   res.render("new"); 
});

//CREATE ROUTE
app.post("/notes", (req, res) =>{
    //get rid of any script tag found in body
    req.body.note.content = req.sanitize( req.body.note.content);
    Note.create(req.body.note, (err, createNote) =>{
        if(err) {
            res.send("Create route is not working...");
        } else {
            res.redirect("/notes");
        }
    });
});

//SHOW ROUTE
app.get("/notes/:id", (req, res) => {
   Note.findById(req.params.id, (err, foundNote) => {
      if(err) {
          res.send("Show route is not working...");
      } else {
          res.render("show", {note : foundNote});
      }
   });
});

//EDIT ROUTE
app.get("/notes/:id/edit", (req, res) => {
    Note.findById(req.params.id, (err, foundNote) => {
        if(err) {
            res.send("Edit route is not working...");
        } else {
            res.render("edit", {note : foundNote});
        }
    });
});

//UPDATE ROUTE
app.put("/notes/:id", (req, res) => {
    //get rid of any script tag found in body
    req.body.note.content = req.sanitize(req.body.note.content);
    Note.findByIdAndUpdate(req.params.id, req.body.note, (err, updatedBlog) => {
       if(err) {
           res.send("Update route is not working...");
       } else {
           res.redirect("/notes/" + req.params.id);
       }
    });
});

//DESTROY ROUTE
app.delete("/notes/:id", (req, res) => {
    Note.findByIdAndRemove(req.params.id, (err) =>{
        if(err) {
            res.send("Destroy route is not working...");
        } else {
            res.redirect("/notes");
        }
    });
});

//SERVER CONFIG
app.listen(process.env.PORT, process.env.IP, () =>{
   console.log("Note server is running..."); 
});
