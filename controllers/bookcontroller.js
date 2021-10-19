const Book = require("../models/books.model");
 const User = require("../models/user.model")

module.exports.create = (req, res) => {
  const {isbn, name, author, publisher } = req.body;
  const userId = req.payload.id;

  Book.findOne({isbn:isbn}).then((book)=>{
    if(book){
      return res.status(400).json({message:"The Book with this ISBN is alreday exists"})
    }
  let newBook = new Book({userId, isbn, name, author, publisher} );
  newBook
    .save()
    .then((data) => {

      res.status(200).json({
        success: true,
        data:data,
        error:null,
        message:"Book saved succesfully"
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        data:null,
        error: err.message,
        message: "ERROR_HERE"
      });
    });
 })
  
};

module.exports.getAll = (req, res) => {
  let ISBN = req.query.ISBN;
  if(ISBN){
    Book.find({isbn:ISBN})
    .then((data) => {
      res.status(200).json({success: true,
        data:data,
        error:null,
        message:"data fetched succesfully"
      });
    })
  } else
  Book.find({})
    .then((data) => {
      res.status(200).json({success: true,
        data:data,
        error:null,
        message:"data fetched succesfully"
      });
    })
    .catch((error) => {
      return res.status(400).json({
        success:false,
        data:null,
        error: error.message,
        message: "ERROR_HERE"
      });
    });
};

module.exports.getOne = (req, res) => {
    Book.findById({
    _id: req.params.id,
  })
    .then((data) => {
      res.status(200).json({
        success: true,
        data:data,
        error:null,
        message:"Data fetched succesfully"
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        data:null,
        error: err.message,
        message: "ERROR_HERE"
      });
    });
};

module.exports.update = async (req, res) => {
  
  try{
    const id = req.params.id;
    const userId = req.payload.id;
    const user = await User.findById(userId)
    const book = await Book.findById(id)
    if(user.id==book.userId){
        const updated= await Book.findByIdAndUpdate(id, req.body, {new: true})
        res.json({  success: true,
                data:updated,
                error:null,
                message:"Data fetched succesfully" });
    }else{
        res.json({
          success: false,
      data:null,
      message: "ERROR_HERE"
        })
    }

    
} catch(err){
  return res.status(400).json({
    success: false,
      data:null,
      error: err.message,
      message: "ERROR_HERE"
  })
}
}

module.exports.delete = (req, res) => {
  Book.findByIdAndDelete({
    _id: req.params.id,
  })
    .then(() => {
      res.status(200).json({
        success: true,
        message:"Book deleted"
      });
    })
    .catch((err) => {
      res.status(400).json({
        data:null,
        error: err.message,
        message: "ERROR_HERE"
      });
    });
};
