# fullstack-schoolLibrary

fullstack MEAN app for term paper School Library

Инструкция к проекту "Библиотека для школьников":

1. Установка:
   Убедитесь, что у вас установлен Node.js и npm (Node Package Manager).

   Откройте командную строку (терминал) и перейдите в корневую директорию проекта.

   Выполните команду `npm install` для установки зависимостей.

2. Настройка подключения к базе данных:

   В серверной части проекта откройте папку "config" и файл "keys.js".

   В файле "keys.js" найдите переменную "mongoURI", которая содержит URL для подключения к MongoDB.

   Замените значение "mongodb://127.0.0.1:27017/MEANlib" на свой собственный URL базы данных MongoDB, который вы будете использовать для проекта.

   Пример:
   module.exports = {
   mongoURI: 'ваш_URL_MongoDB',
   jwt: 'dev-jwt'
   }

3. Запуск проекта:
   После успешной установки выполните команду `npm run dev`.

   Это запустит сервер и клиентскую часть проекта вместе.

4. Использование:
   После запуска проекта вы сможете использовать web-ориентированную информационную систему "Библиотека для школьников".

   Система имеет 2 типа пользователей: администратор и читатель.

   Система предоставляет следующие возможности:

   Вести учет доступных книг и читателей в цифровом виде. Для библиотекарей это выполняется путем просмотра, добавления новых книг, редактирования и удаления имеющихся книг и данных пользователей.

   Обрабатывать запросы библиотекарю (принимать(пропиписывать сроки сдачи и комментарии, если нужно, отклонять, подтвержать)

   Поддерживать связь между библиотекарем и читателем посредством почты.

   Просматривать каталог книг, осуществлять поиск и отправлять запросы. Чиататель также будет получать уведомления о скором истечении срока сдачи книг и иметь возможность продлить срок хранения.

   Обновлять профиль.
   Когда пользователь открывает главную страницу системы, ему показывается landing page, которая предоставляет собой страницу с призывом к действию, то есть с призывом присоединиться к библиотеке. На этой странице пользователь может увидеть, как выглядит библиотека внутри и снаружи, прочитать о ней информацию и принять решение об открытии читательского билета или просто войти в приложение.

   Когда пользователь входит в систему под своей учетной записью ему показывается карусель со всеми книгами, которые у пользователя на руках, а также слайдер с популярными книгами.

https://youtu.be/PIWgyW8-q1k
