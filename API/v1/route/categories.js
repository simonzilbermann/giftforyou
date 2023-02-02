const router=require('express').Router();
const {insertcat,GetGiftsByCid,GetAllCat,deletecat}=require('../controller/categories');
router.post("/ins",insertcat);
router.get("/gbcid/:id",GetGiftsByCid);
router.get("/catpgage",GetAllCat);
router.get("/del/:cid",deletecat);
module.exports=router;