var express = require('express');
const adminController = require("../controllers/adminController.js");
const checkAdmin = require("../middlewares/auth.js"); // <--- Подключаем middleware
var router = express.Router();

router.use(checkAdmin); 

router.get('/', async function(req, res){
    const Models = require("../models/adminModel.js");
    let m = await Models.getAll();
    res.render('index_admin', {data:m});
});

router.get('/:idArticle', adminController.getArticle);
router.post('/addArticle', adminController.addArticle); 
router.post('/editArticle', adminController.editArticle); 
router.post('/deleteArticle', adminController.deleteArticle);

module.exports = router;