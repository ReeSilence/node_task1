# Учебный проект по дисциплине Веб-программирование\

## Что бы собрать и запустить проект

В терминале вводим: 
 1. `git clone https://github.com/ReeSilence/node_task1.git`;
 2. `cd node_task1`;
 3. `npm install`;
 4. `node index.js`.

## Роутинг по проекту

Доступные адреса:
 1. http://localhost:3000/;
 2. http://localhost:3000/reg;
 3. http://localhost:3000/admin.
 4. http://localhost:3000/news;
 5. http://localhost:3000/article;

## SQL-запрос для создания базы

CREATE DATABASE article CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE article;

CREATE TABLE article (
    idArticle INT AUTO_INCREMENT PRIMARY KEY,
    titleArticle VARCHAR(255) NOT NULL,
    textArticle TEXT NOT NULL,
    descriptionArticle VARCHAR(255)
);

INSERT INTO article (titleArticle, descriptionArticle, textArticle) VALUES
('Первая статья', 'Краткое описание первой статьи', 'Это полный текст первой статьи. Здесь может быть много полезной информации.'),
('Вторая статья', 'Описание второй статьи', 'Текст второй статьи. Мы добавляем авторизацию JWT.'),
('Третья статья', 'Описание третьей статьи', 'Полный текст третьей статьи.');

CREATE TABLE News (
    idNews INT AUTO_INCREMENT PRIMARY KEY,
    titleNews VARCHAR(255) NOT NULL,
    descriptionNews VARCHAR(255),
    textNews TEXT
);

INSERT INTO News (titleNews, descriptionNews, textNews) VALUES
('Главные новости дня', 'Сегодня случилось что-то важное', 'Подробный текст новости. Мы используем эту таблицу, чтобы проверить раздел новостей.'),
('Обновление системы', 'Сайт был обновлен', 'Информация о технических работах.');

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(255) NOT NULL UNIQUE,
    pwd VARCHAR(255) NOT NULL
);

INSERT INTO user (login, pwd) VALUES ('admin', 'admin');
INSERT INTO user (login, pwd) VALUES ('user', 'user');
