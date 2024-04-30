const express = require("express");
const path = require("path");
require("./db/conn"); // Database connection
const User = require("./models/usermessage")
// const hbs = require("hbs");
// const { registerPartials } = require("hbs");
const app = express();
const port = process.env.PORT || 3000;

//setting the path for static  files (css, html)
const staticpath = path.join(__dirname, "../public");
// const templatepath = path.join(__dirname, "../templates/views");
// const partialpath = path.join(__dirname, "../templates/partials");

//middleware
app.use("/css",express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use("/js",express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use("/jq",express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticpath));

//set view engine for frontend
app.set("view engine", "hbs");
// app.set("view ", templatepath);
// hbs.registerPartials(partialpath);

//routing
//app.get(path, callback)
//("/")=> means home page
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});


app.get("/shop", (req, res) => {
  res.render("shop");
});


app.get("/Checkout", (req, res) => {
  res.render("Checkout");
});

  app.get("/detail", (req, res) => {
    res.render("detail");
  });

  app.get("/cart", (req, res) => {
    res.render("cart");
  });

  app.get("/register", (req, res) => {
    res.render("register");
  });

app.post("/contact",  async(req,res)=>{
    try{
        //res.send(req.body); //return the data in json format
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    }catch (error){
        res.status(500).send(error);
    }
})

//create server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
