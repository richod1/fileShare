const express=require("express")
const router=express.Router()
const file=require("../models/fileUpload.model")
const path=require("path")

const _dirname=(()=>{
    let x=path.dirname(decodeURI(new URL(import.meta.url).pathname))
    return path.resolve((process.platform=="win32")? x.substring(1):x);
})

router.post("/upload",async (req,res,next)=>{
    try{

    if(!req.files){
        res.status(401).json({success:false,msg:"Fiole not found!"})

    }else{
        let file=req.files.file;
        console.log(file)
        const savedFile=new file({
            name:file.name,  
            mimetype:file.mimetype,
            size:file.size
        })

        await savedFile.save();
        let uploadPath=_dirname +'\\..\\uploads\\' +file.name;
        file.mv(uploadPath);
        res.status(201).json({success:true,msg:"file uploaded success"})
    }
    }catch(err){
        res.status(500).json({success:false,msg:err.message})
    }
})

// Get all files route
router.get('/files',async(req,res)=>{
    try{
        const allFiles=await file({})
        res.status(201).json({
            success:true,msg:"file request success",data:allFiles
        })

    }catch(err){
        res.status(401).json({success:false,msg:err.message})
    }
})


// file downloads
router.get(".download",async(req,res)=>{
    try{
        const {id}=req.params;
        if(id){
            const files=new file(id);
            const fileLocation=_dirname +'\\..\\uploads\\' + files.name;

            res.status(201).json({success:true,fileLocation})
            res.download(fileLocation,files)
        }else{
            res.status(401).json({
                success:false,msg:"File not found"
            })
        }

    }catch(err){
        res.status(500).json({
            success:false,msg:err.message
        })
    }
})

module.exports=router;