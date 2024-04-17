var express = require('express');
var app = express();
var bd = require('body-parser');
var ed = bd.urlencoded({extended: false});

var my = require('mysql');
var con = my.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database:'org'
});

con.connect(function(err)
{
    if(err)
    throw err;
console.log("connected");
});



app.use(express.static('public'));

app.get('/',(req,res) => {
    res.sendFile('./public/home.html',{root: __dirname});
})
app.get('/register',(req,res) => {
    res.sendFile('./public/register.html',{root: __dirname});
})
app.get('/about', (req,res) => {
    res.sendFile('./public/about.html',{root: __dirname});
})
app.get('/reviews', (req,res) => {
    res.sendFile('./public/reviews.html',{root: __dirname});
})
app.get('/contact', (req,res) => {
    res.sendFile('./public/contact.html',{root: __dirname});
})
app.get('/more', (req,res) => {
    res.sendFile('./public/more.html',{root: __dirname});
})
/* app.get('/RegProcess',(req,res) => {
    var a = req.query.fullname;
    var b = req.query.email;
    var c = req.query.password;

    res.send("Name is " + a + ". Email is " + b + ". Password is " + c);
})
*/
app.post('/RegProcess',ed, (req,res) => {
    var a = req.body.fullname;
    var b = req.body.email;
    var c = req.body.password;

    var q = "insert into applicant values('"+a+"','"+b+"','"+c+"')";
    con.query(q,function(err,result)
    {
if(err)
throw err;
res.send("data Inserted Successfully");

    });


})

app.listen(1000);