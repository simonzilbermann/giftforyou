const presents=require("../model/presents.js");
const categ=require("../model/categories.js");
const workers=require("../model/workers.js");
const mongoose=require('mongoose');
const { json } = require("express");
module.exports={
    UpdatePresent:(req,res)=>{
        const {pname,pic,cid,pid}=req.body;
        presents.updateOne({pid},{$set:{pname,pic,cid}}).then((data)=>{
            if(data.modifiedCount==1){
                return res.status(200).json({msg:"update secssfully"});
            }
            else{
                return res.status(409).json({msg:"cant update"});
            }
        })
    },
    updatevote:(req,res)=>{
        const pid=req.body;
        presents.updateOne({pid:pid.pid},{$set:{vote:0}}).then((data)=>{
            if(data.modifiedCount==1){
                return res.status(200).json({msg:"update secssfully"});
            }
            else{
                return res.status(409).json({msg:"cant update"});
            }
        })
    },
    insertpresent:(req,res)=>{
        const {pname,pic,cid}=req.body;
        //לעשות פה משהו לא לשכוח!!
        const pid=parseInt(Math.floor(Math.random() * 10000));
        categ.find({cid}).then((rows)=>{
            if(rows.length==0){
                return res.status(409).json({msg:`category not found!!`});
            }
            else{
                presents.find({pname}).then((rows)=>{
                    if(rows.length>0){
                        return res.status(409).json({msg:`present name already exist: ${pname}`});
                    }
                    else{
                        const present=new presents({
                            _id:new mongoose.Types.ObjectId(),
                            pid,
                            pname,
                            pic,
                            cid,
                            vote:0
                        });
                       
                        present.save().then((rows)=>{
                            return res.status(200).json({msg:`insert present seccesfuly the pid is: ${rows.pid}`});
                        });
                    }
                })
                
            }
        })
        
    },
    GetAllPres:(req,res)=>{
        presents.find({},{_id:false}).then((pres)=>{
            return res.render('wm',{Gifts:pres});
            });  
    },

    GetPresntsByCatId:(req,res)=>{
        console.log(req.params.id);
        presents.find({cid:req.params.id},{_id:false}).then((pres)=>{
            return res.status(200).json(pres);
            });  
    },
    GetPresById:(req,res)=>{
    
        presents.findOne({pid:req.params.id},{_id:false}).then((pres)=>{
            return res.status(200).json(pres);
        });
    },
    Voting:(req,res)=>{
        const Pid=req.params.pid;
        console.log(Pid);
        const Wid=req.params.wid;
        workers.find({wid:Wid}).then((data)=>{
          
            if(data[0].voted>0){
                return res.status(409).json({msg:`Worker ${data[0].name} already voted!`});
            }
            else{
                workers.updateOne({wid:Wid},{$set:{voted:Pid}}).then((data)=>{
                    if(data.modifiedCount>0){
                        presents.updateOne({pid:Pid},{$inc:{vote:+1}}).then((rows)=>{
                            if(rows.modifiedCount>0){ 
                                presents.find({pid:Pid}).then((pres)=>{
                                
                                    return res.status(200).json({msg:pres[0].vote});
                                })                                            
                            
                            }
                            else{
                                return res.status(409).json({msg:"present id not found!"})
                            }
                        })
                    }
                })
                    }
                })
                
        
    },
    deletepresent:(req,res)=>{
        presents.deleteOne({pid:req.params.pid}).then((data)=>{
            if(data.deletedCount==1){
                return res.status(200).json({msg:`deleted present id: ${req.params.pid}`});
            }
            else{
                return res.status(200).json({msg:`present id not found!!!`});
            }
        })
    },
    leadergift:(req,res)=>{
        presents.find({},{_id:false}).then((pres)=>{
            let max = pres[0].vote;
            let index = 0;
            for(let i = 1;i < pres.length; i++){
                if(pres[i].vote > max){
                    max = pres[i].vote;
                    index = i;
                 }
            }
            return res.render('leader',{pressent:pres[index]});
        
        })
            
    },
    WinnerGift:(req,res)=>{
        presents.find({},{_id:false}).then((pres)=>{
            let max = pres[0].vote;
            let index = 0;
            for(let i = 1;i < pres.length; i++){
                if(pres[i].vote > max){
                    max = pres[i].vote;
                    index = i;
                 }
            }
            return json({msg:pres[index]});
         })
    },
    GetDateExpired:(req,res)=>{
        let fulldate=process.env.DAY +"/" +process.env.MONTH+"/"+process.env.YEAR;

        return res.status(200).json({msg:fulldate});
    }
    

}