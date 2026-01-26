const jwt = require('jsonwebtoken');
require('dotenv').config();

function getCookie(cookieName, req) {
    const cookies = req.headers.cookie;
    if (!cookies) return null;
    
    const result = cookies.split('; ').reduce((acc, item) => {
        const [name, value] = item.split('=');
        acc[name] = value;
        return acc;
    }, {});
    
    return result[cookieName] || null;
}
const checkAdmin = function(req, res, next) {
    const token = getCookie('reg', req);

    if (!token) {
        console.log("Доступ запрещен: Нет токена");
        return res.redirect('/403.html');
    }

    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
        if (err) {
            console.log("Доступ запрещен: Токен недействителен");
            return res.redirect('/403.html');
        }

        if (decoded.login !== 'admin') {
            console.log(`Доступ запрещен: Пользователь ${decoded.login} не админ`);
            return res.redirect('/403.html');
        }

        req.user = decoded;
        next();
    });
};

module.exports = checkAdmin;