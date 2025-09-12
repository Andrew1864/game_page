# 🎮 Game_page – Геймифицированное портфолио

Мое персональное портфолио в формате игры.  
Здесь можно пройти мини-игры, собирать достижения и прокачивать навыки — всё как в настоящей RPG ⚡

## 🌐 Демо
Проект доступен по ссылке: [Game_page на Vercel](https://achieve-hub-jade.vercel.app/)


## ✨ Основные возможности
- 👤 Авторизация через ввод имени
- 🏆 Система очков и достижений (React, ООП, и др.)
- 📚 Раздел "Навыки" с тестами
- ⚡ Уведомления и алерты при получении достижений
- 💾 Данные хранятся в **JSON Server** (прогресс, комментарии, достижения)
- 🎨 Использование **Tailwind CSS** + **Material UI** для UI
- 🔄 Redux Toolkit для управления состоянием

## 🚀 Стек технологий
- [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material UI](https://mui.com/)
- [JSON Server](https://github.com/typicode/json-server)

## 📦 Установка и запуск
```bash
# Клонируем проект
git clone https://github.com/username/Game_page.git
cd Game_page

# Устанавливаем зависимости
npm install

# Запускаем Next.js
npm run dev

# Запускаем JSON Server (если нужен)
npm run server
npx json-server --watch db.json --port 3000
