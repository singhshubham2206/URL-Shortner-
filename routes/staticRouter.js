const express = require("express");
const router = express.Router();
const URL = require("../models/url");

router.get("/", async(req,res)=>{
    const allurls = await URL.find({});   // with empty {} obj , allurls matches and have all documents/properties in the URL collection 
    
    return res.render("home",{            // now render home and pass all the documents of collection through urls
        urls: allurls,
    });

});



module.exports = router;