var express = require('express');
var router = express.Router();
var contactModel = require('../model/contact.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET xem page. */
router.get('/xem', function(req, res, next) {
  contactModel.find({},function(er,dulieu){
    res.render('xem', { title: 'Xem dữ liệu',data:dulieu });
  })
});

/* GET xoa */
router.get('/xoa/:idcanxoa', function(req, res, next) {
  var id = req.params.idcanxoa;
  contactModel.findByIdAndRemove(id).exec();
  res.redirect('/xem');
});

/* GET sửa page. */
router.get('/sua/:idcanxoa', function(req, res, next) {
  var id2 = req.params.idcanxoa;
  contactModel.find({ _id:id2},function(er,dulieu){
    res.render('sua', { title: 'Sửa dữ liệu',data:dulieu });
  })
});

router.post('/sua/:idcanxoa', function(req, res, next) {
  var id2 = req.params.idcanxoa;
  contactModel.findById(id2,function(err,dulieu){
    if (err) return handleError(err);
    dulieu.ten = req.body.ten;
    dulieu.tuoi = req.body.tuoi;
    dulieu.save();
    res.redirect('/xem');
  });
});

/* GET them page. */
router.get('/them', function(req, res, next) {
  res.render('them', { title: 'Thêm dữ liệu' });
});

/* POST them page. */
router.post('/them', function(req, res, next) {
  var phantu = {
    'ten' : req.body.ten,
    'tuoi' : req.body.tuoi
  };
  var dulieu = new contactModel(phantu);
  dulieu.save();
  res.redirect('/xem');
});


module.exports = router;
