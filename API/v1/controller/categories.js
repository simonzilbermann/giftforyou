const categories=require("../model/categories.js");
const mongoose=require('mongoose');
const presents=require('../model/presents.js');
module.exports={
    insertcat:(req,res)=>{
    const cid=Math.floor(Math.random() * 10000);
    const {name,decs}=req.body;
    categories.find({name}).then((rows)=>{
        if(rows.length>0){
            return res.status(409).json({msg:`category name already exist: ${name}`});
        }
        else{
            const cat=new categories({
                _id:new mongoose.Types.ObjectId(),
                name,
                decs,
                cid
            });
            cat.save().then((rows)=>{
                return res.status(200).json({msg:`insert category seccesfuly the cid is: ${rows.cid}`});
            })
        }
    })
    },
    GetGiftsByCid:(req,res)=>{
        const Cid=req.params.id;
        presents.find({cid:Cid}).then((data)=>{
            if(data.length>0){
                return res.render('presents',{presarr:data});
            }
            else{
                return res.status(409).json({msg:"Gifts Are not found!"});
            }
        })
    },
    GetAllCat:(req,res)=>{
        categories.find({},{_id:false}).then((data)=>{
            return res.render('presents',{catarr:data});
        })
    },
    deletecat:(req,res)=>{
        categories.deleteOne({cid:req.params.cid}).then((data)=>{
            if(data.deletedCount==1){
                return res.status(200).json({msg:`deleted cat id: ${req.params.cid}`});
            }
            else{
                return res.status(200).json({msg:`category id not found!!!`});
            }
        })
    }





}