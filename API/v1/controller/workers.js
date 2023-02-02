const workers=require("../model/workers.js");
const mongoose=require('mongoose');
const PresentS=require('../model/presents.js');
const { json } = require("express");

module.exports={
    SaveWorkers:(req,res)=>{
    const{name,email,address,city}= req.body;
    const wid=Math.floor(Math.random()*10000);
    workers.find({email}).then((data)=>{
        if(data.length>0){
            return res.status(409).json({msg:"worker already exist !!"});
        }
        else{
            const worker=new workers({
                _id:new mongoose.Types.ObjectId(),
                name:name,
                email:email,
                address:address,
                city:city,
                wid:wid,
                voted:0
               });
               worker.save().then((data)=>{
                   return res.status(200).json({msg:`added seccessfuly the id is:${wid}`})
               });
              
        }
    })
     
    },
    Login:(req,res)=>{
        const email=req.body;
        workers.find({email:email.email}).then((rows)=>{
            console.log(rows);
         if(rows.length>0){
     
            return res.status(200).json({msg:rows[0]});
         }
         else{
            return res.status(490).json({msg:0});
         }
        });
    },
    
    GetAllWorkers:(req,res)=>{
        workers.find().then((data)=>{
            return res.render('wmwork',{workarr:data});
      
        })
    },
    GetworkById:(req,res)=>{
        workers.findOne({wid:req.params.id},{_id:false}).then((pres)=>{
            return res.status(200).json(pres);
        });
    },
    DeleteWorker:(req,res)=>{
        workers.deleteOne({wid:req.params.id}).then((data)=>{
            if(data.deletedCount==1){
                return res.status(200).json({msg:`deleted worker id: ${req.params.id}`});
            }
            else{
                return res.status(200).json({msg:`worker id not found!!!`});
            }
           
        })
    },
    UpdateAdrressById:(req,res)=>{
        const {address,wid}=req.body;
        console.log(address);
        console.log(wid);
        workers.updateOne({wid:wid},{$set:{address:address}}).then((data)=>{
                if(data.modifiedCount>0){
                    return res.status(200).json({msg:1});
                }
      })
    },
    UpdateWorker:(req,res)=>{
        const {address,wid,name,email,city,voted}=req.body;
       
        workers.updateOne({wid:wid},{$set:{address,name,email,city,voted}}).then((data)=>{
                if(data.modifiedCount>0){
                    return res.status(200).json({msg:1});
                }
      })
    },
    SendGiftEmail:(req,res)=>{
        var subj="winner gift";
        var body="";
     PresentS.find({},{_id:false}).sort({vote:-1}).limit(1).then((data)=>{
       
        console.log(data[0].pname);
        if(data.length>0){
            body+="<h1>הסתיימה ההצבעה המתנה הזוכה היא :</h1>"
            body+="<h1> מתנה מנצחת:"+data[0].pname+"</h1><br>";
            body+='תמונה: <img style="max-height:200px; max-width:200px;" src="'+data[0].pic+'"/><br>';
            body+='<h2>מספר הצבעות: '+data[0].vote+'</h2><br>';
        }
     })
 
       workers.find({}).then((data)=>{
       
        for(let i=0;i<data.length;i++){
            var name="<h1> המתנה תגיע לכבוד:"+data[i].name+"</h1><br>";
            var address="<h1> המתנה תגיע לכתובת:"+data[i].address+" , "+data[i].city+"</h1><br>";
            require('../../../emailsend').emailsend(data[i].email,subj,body+name+address);
        }
        
       })
        
    }

}