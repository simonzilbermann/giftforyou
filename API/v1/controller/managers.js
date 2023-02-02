const managers = require("../model/managers.js");
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

function GetRandomString(length){
    let str="";
    const chars="abcdefghijklmnopqrstuvwxyz0123456789";
    let index;
    for(let i=0;i<length;i++)
    {
        index=Math.floor(Math.random() * chars.length);
        str+=chars[index];
    }
    return str;

}

module.exports={

        Register:(req,res)=>{
            const {fullname,password,email,phone,role} = req.body;
            const mid = Math.floor(Math.random() * 100000);
            managers.find({email}).then((rows)=>{
                if(rows.length > 0)//במידה ונמצא משתמש עם אותו שם משתמש
                    return res.status(409).json({msg:" ManagersAlready Exist Please Choiose Another"})
                
                    bcryptjs.hash(password,12).then((hashPass)=>{
                            const  Managers =new  managers({
                                _id:new mongoose.Types.ObjectId(),
                                mid:mid,
                                fullname:fullname,
                                password:hashPass,
                                email:email,
                                phone:phone,
                                role:role
                            });
                            Managers.save().then(( mgs)=>{
                                return res.status(200).json({msg:"Managers Registed succesfully",mgs});
                            }).catch((error)=>{
                                return res.status(505).json({error});
                            });
                        });               
            });
        }, 


        Login:(req,res)=>{
            const {email,password}=req.body;
            managers.find({email}).then((rows)=>{
                if(rows.length == 0)
                    return res.status(409).json({msg:"Managers Not Found"})

                    bcryptjs.compare(password,rows[0].password).then((status)=>{
                    if(!status)
                        return res.status(409).json({msg:0});
                    else
                    {
                       const maxage= 3 * 60 * 60;
                        const token = "Bearer " + jwt.sign({email},process.env.SECRET_KEY,{expiresIn:maxage});
                        res.cookie("jwt",token,{
                            httpOnly: true,
                            maxAge:maxage * 1000 });
                       return res.status(200).json({msg:1});
                    }
                })  
            })         
           
        },
        GetAll:(req,res)=>{
            managers.find().then((rows)=>{
                if(rows.length>0){
                    return res.status(200).json({msg:rows});
                }
                return res.status(409).json({msg:"not found managers"});
            })
        },
        RecoverPass:(req,res)=>{
            const email=req.body;
         managers.find({email:email.email}).then((rows)=>{
            if(rows.length==0){
                return res.status(401).json({msg:0});
            }
            else
            {
                const TmpPass=GetRandomString(12);
                var subj="reset password mod";
                var body=`<h1>  temporary pass: <br> ${TmpPass}  </h1>`;
                require('../../../emailsend').emailsend(email.email,subj,body);
                bcryptjs.hash(TmpPass,12).then((hashPass)=>{
                managers.updateOne({email:email.email},{$set:{tmppass:hashPass}}).then((data)=>{
                    if(data.modifiedCount==1){
                        return res.status(200).json({msg:1});
                    }
                    else{
                        return res.status(401).json({msg:"cant recover your password! "});
                    }
                })
                })
            }
         })
        },
        ResetPass:(req,res)=>{
            const {email,tmppass,newpass} = req.body;
            console.log(email);
            managers.find({email}).then((rows)=>{
                if(rows.length == 0){
                    return res.status(409).json({msg:"Managers Not Found"});
                }

                bcryptjs.compare(tmppass,rows[0].tmppass).then((status)=>{
                    if(!status){
                        return res.status(409).json({msg:0});
                    }
                    else
                    {
                        bcryptjs.hash(newpass,12).then((hashPass)=>{
                      managers.updateOne({email},{$set:{password:hashPass}}).then((rows)=>{
                        if(rows.modifiedCount==1){
                            return res.status(200).json({msg:1});
                        }
                        return res.status(401).json({msg:"cant update"});
                      })
                    })
                    }
                })  
            })      
        }



}