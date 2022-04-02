const mongoose = require("mongoose");

const connectdb = () => {
  return mongoose.connect(
    "mongodb+srv://NayanIngale:nayan123@cluster0.yyh15.mongodb.net/courseraData"
  );
  
};
module.exports = connectdb;
