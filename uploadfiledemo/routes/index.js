var express = require('express');
var multer  = require('multer');
var anhs = [];
var router = express.Router();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './luuanh')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname )
  }
})
 
var upload = multer({ storage: storage })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/file-upload',upload.any(), function(req, res, next) {
  var tentamthoi = req.files[0].path;
  anhs.push(tentamthoi);
  console.log(anhs);
  res.status(200).send(req.files);
});

module.exports = router;
