const mongoose = require("mongoose");

const connectDb = (req ,res)=>{
    const mongourl = process.env.mongourl;

    mongoose.connect(mongourl,{
        useNewUrlParser : true,
        // newUnifiedTopology : true
    })
    .then(()=>{console.log("mongodb connected ")})
    .catch((error)=>{console.log("error",error)});
    
}
module.exports = {connectDb};