const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    name: {
      type: String,
      required: true,
      trim:true
    },
    isbn:{
      type: Number,
      required: true,
      // unique:true,
      trim:true
    },
    
    author: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
