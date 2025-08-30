const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
    fileName : {
        type : String,
        require : true
    },
    fileUrl : {
        type : String,
        unique : true,
        require : true
    },
    mimeType : {
        type : String,
        require : true
    },
    size : {
        type : Number,
        require : true
    },
    uploadedAt : {
        type : Date,
        default : Date.now
    }
});

const MediaModel = mongoose.model("MediaModel",mediaSchema);

module.exports = {MediaModel};