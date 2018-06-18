var express = require('express')
var mysql = require('mysql')
var bodyParser = require('body-parser')
var app = express()
var port = 3000

var admin = require("firebase-admin");

var serviceAccount = require("service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://shopeef-5eda6.firebaseio.com"
});





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
      res.send('server is active');
})

app.get('/token/:token',function(req,res,next){
  var registrationToken = req.params.token;

  // See documentation on defining a message payload.
  var message = {
    data: {
      score: '850',
      time: '2:45'
    },
    token: registrationToken
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  admin.messaging().send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
})

// This registration token comes from the client FCM SDKs.


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
  var sql = 'select * from cart where pemilik = ? order by penjual_pemilik asc';
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
  var imagedata = req.query.imagedata;

  sql = 'insert into cart (pemilik,stock_id,jumlah,penjual_pemilik,imagedata) values (?,?,?,?,?)';

  conn.query(sql,[pemilik,stockid,stock,penjual,imagedata],function(err,row){
    if(err)
      throw err
    else{
      res.json(row);
    }
  })

})

app.get('/checkout',function(req,res){

  var pemilik = req.query.pemilik;
  var stockid = req.query.stockid;
  var stock = req.query.jumlah;
  var penjual = req.query.penjual;
  var imagedata = req.query.imagedata;

  sql = 'insert into order (order_id,pemilik,stock_id,jumlah,penjual_pemilik,imagedata) values (?,?,?,?,?)';

  conn.query(sql,[pemilik,stockid,stock,penjual,imagedata],function(err,row){
    if(err)
      throw err
    else{
      res.json(row);
    }
  })

})

app.get('/checkinsertitem',function(req,res){

  var pemilik = req.query.pemilik;
  var stockid = req.query.stockid;
  var penjual = req.query.penjual;

  sql = 'select * from cart where pemilik = ? and stock_id =? and penjual_pemilik=?';

  conn.query(sql,[pemilik,stockid,penjual],function(err,row){
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

app.get('/additem',function(req,res){
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

app.get('/plusitem',function(req,res){
  var pemilik = req.query.pemilik;
  var stockid = req.query.stockid;
  var jumlah  = req.query.jumlah;
  var penjual = req.query.penjual;
  sql = 'update cart set jumlah = ?+1  where pemilik = ? AND stock_id = ? AND penjual_pemilik = ?';
  conn.query(sql,[jumlah,pemilik,stockid,penjual],function(err,row){
    if(err)
      throw(err)
    else{
      res.json(row);
    }
  })
})

app.get('/reduceitem',function(req,res){
  var pemilik = req.query.pemilik;
  var stockid = req.query.stockid;
  var jumlah  = req.query.jumlah;
  var penjual = req.query.penjual;
  sql = 'update cart set jumlah = ?-1  where pemilik = ? AND stock_id = ? AND penjual_pemilik = ?';
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
