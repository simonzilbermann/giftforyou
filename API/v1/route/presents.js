const router=require('express').Router();
const {Voting,insertpresent,GetAllPres,GetPresById,deletepresent,leadergift,UpdatePresent,WinnerGift,updatevote}=require('../controller/presents');
router.post("/ins",insertpresent);
router.get("/vot/:pid/:wid",Voting);
router.get("/get",GetAllPres);
router.get("/get/:id",GetPresById);
router.get("/del/:pid",deletepresent);
router.get("/lead",leadergift);
router.post("/upgif",UpdatePresent);
router.get("/winn",WinnerGift);
router.post("/resetvote",updatevote);


module.exports=router;