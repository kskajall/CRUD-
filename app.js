var express = require('express');
const { dirname } = require('path');
var app = express();

var my = require('mysql');
var con = my.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'myorg'

});

con.connect((err) => {
    if(err)
    throw err;
console.log("connected");
});

var bd = require('body-parser');
var ed = bd.urlencoded({extended: false});


app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile('./public/home.html', {root: __dirname});
});
app.get('/register', (req,res) => {
    res.sendFile('./public/register.html', {root: __dirname});
});
app.get('/about', (req,res) => {
    res.sendFile('./public/about.html', {root: __dirname});
});
app.get('/reviews', (req,res) => {
    res.sendFile('./public/reviews.html', {root: __dirname});
});
app.get('/contact', (req,res) => {
    res.sendFile('./public/contact.html', {root: __dirname});
});
app.get('/more', (req,res) => {
    res.sendFile('./public/more.html', {root: __dirname});
});
app.get('/login', (req,res) => {
    res.sendFile('./public/login.html', {root: __dirname});
});
app.get('/delete', (req,res) => {
    res.sendFile('./public/delete.html', {root: __dirname});
});
app.get('/update', (req,res) => {
    res.sendFile('./public/update.html', {root: __dirname});
});

app.post('/regprocess',ed ,(req,res) => {

    var a = req.body.fullname;
    var b = req.body.email;
    var c = req.body.password;
    var d = req.body.gender;
    var e = req.body.birthdate;
    var f = req.body.address;
    var g = req.body.phone;

    var q = "insert into myapplicant values('"+a+"','"+b+"','"+c+"','"+d+"','"+e+"','"+f+"','"+g+"')";

    con.query(q,function(err,result){

    if(err) 
        throw err;

    res.send("data inserted successfully.");
    });
});

app.post('/loginprocess',ed ,(req,res) => {

    var a = req.body.email;
    var b = req.body.password;

    var q="select * from myapplicant where email='"+a+"'";

    con.query(q,function(err,result){

    if (err)
        throw err;

    var L = result.length;
    if (L > 0) {
        var pw = result[0].password;
        if (b == pw)
            res.send("User Is Valid");
        else
            res.send("Password is incorrect");
        }
    else
        res.send("Email is InValid");
      });
});

app.post('/delprocess',ed ,(req,res) => {

    var a = req.body.email;
    var b = req.body.password;

    var q = "delete from myapplicant where email = '"+a+"'";

    con.query(q,function(err,result) {

    if (err)
        throw err;

    var L = result.affectedRows;
    if (L > 0) {
        var pw = result[0].password;
        if (b == pw)
            res.send("Data deleted.");
        else
            res.send("Password is incorrect");
        }
    else
        res.send("Email not found.");
    });
});

app.post('/updprocess',ed ,(req,res) => {

    var a = req.body.email;
    var b = req.body.currentPassword;
    var c = req.body.newPassword;

    var q = "update myapplicant set password = '"+c+"' where email = '"+a+"' and password = '"+b+"'";

    con.query(q,function(err,result) {

    if (err)
        throw err;

    var L = result.affectedRows;
    if (L > 0) 
        res.send("password Updated.");
    else 
        res.send("Invalid email or password.");
    });
});

app.listen(2000);
