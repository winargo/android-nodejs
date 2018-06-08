var express = require('express')
var mysql = require('mysql')
var bodyParser = require('body-parser')
var app = express()
var port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//connection
var conn = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'shopee'
})

app.get('/',function(req,res,next){
      next();
})

app.get('/allitem',function(req,res) {
    var sql = 'select * from cart';
    conn.query(sql,function(err,row){
      if(err)
        throw err;
      else{
        res.json(row);
      }
    })
})

app.get('/getitem/:name',function(req,res){

  var pemilik = req.params.name;
  var sql = 'select * from cart where pemilik = ?';
  conn.query(sql,pemilik,function(err,result){
    if(err)
      throw err
    else{
      res.json(result);
    }
  })
})

app.get('/insertitem',function(req,res){

  var pemilik = req.query.pemilik;
  var stockid = req.query.stockid;
  var stock = req.query.jumlah;
  var penjual = req.query.penjual;

  sql = 'insert into cart (pemilik,stock_id,jumlah,penjual_pemilik) values (?,?,?,?)';

  conn.query(sql,[pemilik,stockid,stock,penjual],function(err,row){
    if(err)
      throw err
    else{
      res.json(row);
    }
  })

})

app.get('/delitem',function(req,res){
  var pemilik = req.query.pemilik;
  var stockid = req.query.stockid;
  var penjual = req.query.penjual;
  sql = 'delete from cart where pemilik = ? AND stock_id = ? AND penjual_pemilik = ?';
  conn.query(sql,[pemilik,stockid,penjual],function(err,row){
    if(err)
      throw err
    else{
      res.json(row);
    }
  })
})

app.get('/updateitem',function(req,res){
  var pemilik = req.query.pemilik;
  var stockid = req.query.stockid;
  var jumlah  = req.query.jumlah;
  var penjual = req.query.penjual;
  sql = 'update cart set jumlah = ?  where pemilik = ? AND stock_id = ? AND penjual_pemilik = ?';
  conn.query(sql,[jumlah,pemilik,stockid,penjual],function(err,row){
    if(err)
      throw(err)
    else{
      res.json(row);
    }
  })
})

app.listen(port,()=>{
  console.log('server up on port : ' + port);
})
