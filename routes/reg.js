const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connection = require('../mysql.js');

router.get('/', function(req, res){
    res.render('form.ejs');
});

router.post('/auth', async function(req, res){
    const { login, password } = req.body;
    try {
        const [users] = await connection.query("SELECT * FROM user WHERE login = ? AND pwd = ?", [login, password]);
        
        if (users.length > 0) {
            const token = jwt.sign({ login: login }, process.env.SECRET_KEY, {
                algorithm: 'HS256',
                expiresIn: '1h'
            });
            res.status(200).send({
                token: token,
                logged: true,
                userData: { login: login }
            });
        } else {
            res.status(400).send({ message: "Неверный логин или пароль" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Ошибка сервера" });
    }
});

router.post('/reg', async function(req, res){
    const { login, password } = req.body;
    try {
        const [existing] = await connection.query("SELECT * FROM user WHERE login = ?", [login]);
        if (existing.length > 0) {
            res.status(400).send({ message: "Пользователь уже существует" });
        } else {
            await connection.query("INSERT INTO user (login, pwd) VALUES (?, ?)", [login, password]);
            const token = jwt.sign({ login: login }, process.env.SECRET_KEY, {
                algorithm: 'HS256',
                expiresIn: '1h'
            });
            res.status(200).send({
                token: token,
                logged: true,
                userData: { login: login }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Ошибка регистрации" });
    }
});

router.post('/checkToken', function(req, res){
    const token = req.body.token;
    if (!token) return res.status(403).send({message: "Нет токена"});
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
        if (err) return res.status(403).send({ message: "Неверный токен" });
        res.status(200).send({ decoded: decoded });
    });
});

router.post('/checkTokenAdmin', function(req, res){
    const token = req.body.token;
    if (!token) return res.status(403).send({message: "Нет токена"});
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
        if (err) return res.status(403).send({ message: "Неверный токен" });
        if (decoded.login !== 'admin') return res.status(403).send({ message: "Доступ запрещен (не админ)" });
        res.status(200).send({ decoded: decoded });
    });
});

module.exports = router;