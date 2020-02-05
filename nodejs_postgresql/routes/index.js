var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgresqldemo',
  password: '123123',
  port: 5432,
})

/* GET home page. */
router.get('/', function(req, res, next) {
  pool.query('SELECT * FROM contact', (err, res) => {
    console.log(err, res)
  })
  res.render('index', { title: 'Express' });
});
// get them du lieu
router.get('/them', function(req, res, next) {
  res.render('them', { title: 'Thêm dữ liệu vào PostgreSql' });
});
// post them du liệu
router.post('/them', function(req, res, next) {
  var ten = req.body.ten, tuoi = req.body.tuoi;
  pool.query('INSERT INTO contact (ten,tuoi) VALUES($1,$2)',[ten,tuoi] , (err, res) => {
    console.log(err, res)
  })
  res.render('them', { title: 'Thêm dữ liệu vào PostgreSql' });
});

// xem du liệu
router.get('/xem', function(req, res, next) {
  pool.query('SELECT * FROM contact ORDER BY id ASC', (err, dulieu) => {
    console.log(err, res)
  res.render('xem', { title: 'Xem dữ liệu trong PostgreSql',data:dulieu.rows });
  });
});

// Xóa du liệu
router.get('/xoa/:id', function(req, res, next) {
  var idcanxoa = req.params.id;
  pool.query('DELETE FROM contact WHERE id = $1',[idcanxoa] , (err, dulieu) => {
    res.redirect("/xem")
  })
});

module.exports = router;
