const router=require('express').Router();
const {SaveWorkers,Login,GetworkById,DeleteWorker,GetAllWorkers,UpdateAdrressById,UpdateWorker}=require('../controller/workers');
router.post("/saveworkers",SaveWorkers);
router.post("/login",Login);
router.get("/all",GetAllWorkers);
router.get("/wbid/:id",GetworkById);
router.get("/del/:id",DeleteWorker);
router.post("/upad",UpdateAdrressById);
router.post("/upwork",UpdateWorker);


module.exports=router;