
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [                         // its any array of object 
      { timestamp: { type: Number } }
    ],
  },
  { timestamps: true }
);

// URL- represent mongoose model and schema 
// url - property of body 
const URL = mongoose.model("url", urlSchema);

module.exports = URL;

