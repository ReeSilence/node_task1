let express = require('express');
var router = express.Router();
const homeController = require("../controllers/homeController.js");
const articleController = require("../controllers/articleController.js"); 

router.get('/', async function(req, res){
    const Models = require("../models/articleModel.js"); 
    let m = await Models.getAll();
    res.render('index_user', {data:m});
});

router.get('/news', async function(req, res){
    const NewsModel = require('../models/newsModel');
    const newsList = await NewsModel.getAllNews();
    res.render('newsList', { newsList });
});

module.exports = router;