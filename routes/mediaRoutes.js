const multer = require("multer");
const express = require("express");
const {uploadfile,deletefile} = require("../controllers/mediaController");

const route = express.Router();

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"uploads/");
    },
    filename : (req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname);
    }
});

const upload = multer({storage:storage});

//route

route.post("/uploadfile",upload.single("file"),uploadfile);
route.delete("/deletefile",deletefile);

module.exports = route;