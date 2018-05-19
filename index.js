var express = require('express')
var app=express()
var mysql = require('mysql')

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database : "cash"
})

app.use(bodyParser.urlencoded({
    extended: true
}))

//app.use(bodyParser.json());

app.post('/checklogin', function(request, response){
  con.connect(function(err) {
  if (err) throw err;})
  var username=request.body.user.username
  var password=request.body.user.password
  var sql = 'SELECT * FROM user WHERE username = ? and password = ?'
  con.query(sql, [username],[password], function (err, result) {
    if (err) throw err
    console.log(result)
  })
    console.log(request.body.user.username);
    console.log(request.body.user.password);
})

7uuuapp.get('/', function (req,res){
  res.send('hello world')
}
)

app.listen(3000, () => console.log(' listening on port 3000!'))
