let express = require("express");
let app = express();
let port = 8080;
let path = require("path");

//configure ejs
app.set("view engine", "ejs");
//configure ejs path
app.set("views", path.join(__dirname, "views"));

//configuration for static files i.e .css and .js files
app.use(express.static(path.join(__dirname, "public")));

//requiring database object
const post = require("./chatdata.js");

//handling post request data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//method-override package
let methodOverride = require("method-override");
app.use(methodOverride('_method'));


app.listen(port, () => {
    console.log(`app is listening on port : ${port}`);
});

app.get("/", (req, res) => {
    post.find().then((userData) => {
        res.render("home.ejs", { userData });
    });
});

app.get("/createpost", (req, res) => {
    res.render("createpost.ejs");
});


app.post("/createpost", (req, res) => {
    console.log(req.body);
    let { user, postContent } = req.body;
    let date = new Date();
    post.insertMany([{ user, postContent, date }]).then((data) => {
        console.log(data);
    });
    res.redirect("/");
});


app.get("/updatepost", (req, res) => {
    res.render("updatepost.ejs");
});


app.patch("/updatepost", (req, res) => {
    let { id, postContent } = req.body;
    let date = new Date();
    let status = "*post_Modified";
    let updatedData = post.updateOne({ _id: id }, { postContent, date, status })
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });

    res.redirect("/");
});


app.get("/deletepost", (req, res) => {
    res.render("deletepost.ejs");
});

app.delete("/deletepost", (req, res) => {
    let { id } = req.body;
    post.deleteOne({ _id: id })
        .then((result) => {
            console.log(result);
        });

    res.redirect("/");
});