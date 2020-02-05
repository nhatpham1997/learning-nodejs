var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()  + '-' + file.originalname )
  }
})

function checkfileupload (req, file, cb) {
  if(!file.originalname.match(/\.(ipg|png|gif|jpeg)$/)){
    cb(new Error('Bạn chỉ được upload file ảnh!'));
  }else{
    cb(null, true)
  }
}
 
var upload = multer({ storage: storage,fileFilter:checkfileupload })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/uploads', function(req, res, next) {
  res.render('uploads', { title: 'uploads' });
});

router.post('/uploads', upload.single('anhsp') , function(req, res, next) {
  var tieude = req.body.tdsp ;
  res.send("Đã nhận được dữ liệu, tiêu đề là:" + tieude);
});


module.exports = router;
