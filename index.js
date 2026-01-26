let express = require('express');
let app = express();
let bodyParser = require('body-parser');
require('dotenv').config(); 

app.use(express.static(__dirname + '/public')); 
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let index = require('./routes/index');
app.use('/', index);

let article = require('./routes/article');
app.use('/article', article);

let admin = require('./routes/admin');
app.use('/admin', admin);

let news = require('./routes/news');
app.use('/news', news);

let reg = require('./routes/reg');
app.use('/reg', reg);

app.listen(3000, function(){
    console.log('Сервер запущен на порту 3000');
});