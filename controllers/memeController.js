const Meme = require("../models/memeModel");

//method respond แสดงหน้ากรอก url path
const memeRegisterView = (req, res) => {
  res.render("memeRegister", {});
};

//method สำหรับ logic หน้ากรอก url path
const registerMeme = (req, res) => {
  const { urlname } = req.body; //object พารามิเตอร์ urlname รับ request จากฝั่ง view
  var randReach = Math.floor(Math.random() * 100000) + 1000; //ตัวแปรสุ่มค่า Reach เริ่มตั้งแต่ 1000 - 100000
  var randLike = Math.floor(Math.random() * 100000) + 1; //ตัวแปรสุ่มค่า Like เริ่มตั้งแต่ 1 - 100000
  var randComment = Math.floor(Math.random() * 100000) + 1; //ตัวแปรสุ่มค่า Comment เริ่มตั้งแต่ 1 - 100000
  var randShare = Math.floor(Math.random() * 100000) + 1; //ตัวแปรสุ่มค่า Share เริ่มตั้งแต่ 1 - 100000

  //เงื่อนไขตรวจสอบว่า urlname ไม่เป็นค่า null
  if (!urlname) {
    console.log("Fill empty fields");
  }

  //ลูปตรวจสอบค่า Like, Comment, Share มีค่ามากกว่า Reach รึเปล่า
  while (
    randLike >= randReach ||
    randComment >= randReach ||
    randShare >= randReach
  ) {
    //ถ้าค่า Like มีค่ามากกว่า Reach ให้สุ่มใหม่
    if (randLike >= randReach) {
      randLike = Math.floor(Math.random() * 100000) + 1;
    }
    //ถ้าค่า Comment มีค่ามากกว่า Reach ให้สุ่มใหม่
    if (randComment >= randReach) {
      randComment = Math.floor(Math.random() * 100000) + 1;
    }
    //ถ้าค่า Share มีค่ามากกว่า Reach ให้สุ่มใหม่
    if (randShare >= randReach) {
      randShare = Math.floor(Math.random() * 100000) + 1;
    }
  }

  //เงื่อนไขตรวจสอบอีกรอบว่าค่า Like, Comment. Share น้อยกว่า Reach รึยัง
  if (randLike && randComment && randShare <= randReach) {
    //กำหนดตัวแปรเพื่อคำนวณว่า virai หรือไม่
    var viral = true; //กำหนด defualt เป็น true
    var viralScore = [(randLike + randComment + randShare) / randReach];
    //สร้างเงื่อนไข ถ้าค่าคำนวณน้อยกว่า 0.1 ให้เปลี่ยนค่า viral เป็น false
    if (viralScore < 0.1) {
      viral = false;
    }
    //ถ้าเข้าเงื่อนไขให้สร้าง object โครงสร้างข้อมูลที่จะบันทึกลง database
    const newMeme = new Meme({
      urlname,
      reachCount: randReach,
      likeCount: randLike,
      commentCount: randComment,
      shareCount: randShare,
      viral: viral,
    });

    newMeme
      .save() //บันทึกลง database
      .then(res.redirect("/dashboard")) //respond ไปยังหน้า dashboard ข้อมูล meme
      .catch((err) => console.log(err));
  }
};

//method หน้า dashboard นำข้อมูลใน database มาแสดง
const dashboardMeme = (req, res) => {
  Meme.find({}, function (err, memes) {
    // function request ข้อมูลใน database และรับพารามิเตอร์ memes
    res.render("dashboard", {
      //respond ข้อมูลใน database ไปยังหน้า dashboard
      urlList: memes, //โครงสร้าง object ที่รับค่ามาจากพารามิเตอร์
    });
  });
};

// export method เพื่อไปสร้าง routes ในการเชื่อมต่อกับ View
module.exports = {
  memeRegisterView,
  registerMeme,
  dashboardMeme,
};
