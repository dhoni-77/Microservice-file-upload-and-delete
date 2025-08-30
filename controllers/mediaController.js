require("dotenv").config();
const fs = require("fs");
const {MediaModel} = require("../model/mediaModel");
const path = require("path");

const uploadfile = async (req,res)=>{
    const file = req.file;
    if(!req.file){
        console.log("file not given");
        return res.status(400).json({success : false,message : "file not given"});
    }

    try{
        const base_url = process.env.base_url;
        const fileUrl = `${base_url}/uploads/${file.filename}`;

        const data ={
            fileName : file.filename,
            fileUrl : fileUrl,
            mimeType : file.mimetype,
            size : file.size
        }
        const result = await MediaModel.create(data);


        console.log("file uploaded successfully");
        res.status(200).json({success : true,message : "file uploaded successfully",result : result});
    }
    catch(error){

        if(error.code === 11000){
            console.log("duplicate file");
            return res.status(400).json({success : false,message : "this file is already present in the server"})
        }
        console.log("error ",error);
        res.json({message : error});
    }
};

const deletefile = async (req,res)=>{
    const fileUrl = req.query.fileUrl;

    const fileName = path.basename(fileUrl);
    const filePath = path.join(__dirname,"../uploads",fileName)

    fs.unlink(filePath,(error)=>{
        if(error){
            console.log("file not available to delete");
            return res.status(400).json({success :false,message : "file not available to delete"});
        }
        else{
            console.log("file successfully deleted in uploads folder");
        }
    })

    const result = await MediaModel.findOneAndDelete({fileUrl:fileUrl});
    if(!result){
        console.log("file not uploaded");
        return res.status(400).json({success:false,message : "file not uploaded"});
    }

    console.log("file successfully deleted in mongodb database");
    return res.status(200).json({success : true,message :" successfully deleted"});


}

module.exports = {uploadfile,deletefile};

// file uploaded successfully {
//     fieldname: 'file',
//     originalname: 'TNSCST SMART LOCKER.pdf',
//     encoding: '7bit',
//     mimetype: 'application/pdf',
//     destination: 'uploads/',
//     filename: '1756544104756-TNSCST SMART LOCKER.pdf',
//     path: 'uploads/1756544104756-TNSCST SMART LOCKER.pdf',
//     size: 212447
//   }