const express = require("express");
//import method จาก controller มาสร้าง routes เพื่อให้ view เชื่อมต่อ
const {
  memeRegisterView,
  registerMeme,
  dashboardMeme,
} = require("../controllers/memeController");

const router = express.Router();
router.get("/memeRegister", memeRegisterView); //routes method get เรียกหน้า ui กรอก url name มาแสดง
router.get("/dashboard", dashboardMeme); //routes method get เรียกหน้า ui ข้อมูล meme มาแสดง

router.post("/memeRegister", registerMeme); //routes method post รับ request จาก view
module.exports = router;
