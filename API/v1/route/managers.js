const router=require('express').Router();
const {Register,Login,GetAll,RecoverPass,ResetPass}=require('../controller/managers');
router.post("/reg",Register);
router.post("/log",Login);
router.post("/rec",RecoverPass);
router.post("/res",ResetPass);
router.get("/",GetAll);


module.exports=router;