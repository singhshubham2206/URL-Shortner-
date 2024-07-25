const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const path = require('path');
const staticRoute = require('./routes/staticRouter');

const app = express();
const PORT = 8001;

// by providing the url to connect.js , wwe stablish the mongooDB connection 
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("Mongodb connected")
);

app.use(express.json());
app.use(express.urlencoded({extended:false}));    // suporting form data 



// Server Side Rendering 
app.set("view engine", "ejs");              // Setting Up EJS as the View Engine
app.set("views", path.resolve("./views"));   // sets the directory where the view templates (EJS files) are located (this is built-in)

app.use("/",staticRoute);



//ROUTES
app.use("/url", urlRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));




