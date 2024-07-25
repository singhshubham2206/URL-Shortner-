
const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {

  // first check that there is a url or not 
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  const shortID = shortid();      // use to short url (built-in)

  await URL.create({              // creates a new document by using defiend schema of URL collection 
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.render("home",{        // used to render in home.ejs, by providing a variable 
    id : shortID,
  })
}


async function handleGetAnalytics(req, res) {

  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });

}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};


