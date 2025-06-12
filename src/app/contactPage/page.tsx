"use client";

import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-12">
        {/* Левый контейнер — Основная информация */}
        <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-lg p-10 flex flex-col">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Информация о соискателе
          </h3>
          <p className="text-center text-gray-500 mb-8">
            Личные данные и детали заявки.
          </p>
          <dl className="divide-y divide-gray-200">
            <div className="py-4 grid grid-cols-3 gap-4 items-center">
              <dt className="text-right col-span-1 font-semibold text-gray-700">
                Полное имя
              </dt>
              <dd className="col-span-2 text-gray-900">Андрей Шалимов</dd>
            </div>
            <div className="py-4 grid grid-cols-3 gap-4 items-center">
              <dt className="text-right col-span-1 font-semibold text-gray-700">
                Вакансия
              </dt>
              <dd className="col-span-2 text-gray-900">Frontend-разработчик</dd>
            </div>
            <div className="py-4 grid grid-cols-3 gap-4 items-center">
              <dt className="text-right col-span-1 font-semibold text-gray-700">
                Email
              </dt>
              <dd className="col-span-2 text-gray-900">
                <a
                  href="mailto:1864and@gmail.com"
                  className="text-gray-600 hover:underline"
                >
                  1864and@gmail.com
                </a>
              </dd>
            </div>
            <div className="py-4 grid grid-cols-3 gap-4 items-center">
              <dt className="text-right col-span-1 font-semibold text-gray-700">
                Ссылки на GitHub и Telegram
              </dt>
              <dd className="col-span-2 text-gray-900 flex items-center space-x-6">
                <a
                  href="https://github.com/Andrew1864"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-indigo-600 transition"
                >
                  <GitHubIcon fontSize="medium" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
                <a
                  href="https://t.me/Andrew1864"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-sky-500 transition"
                >
                  <TelegramIcon fontSize="medium" />
                  <span className="hidden sm:inline">Telegram</span>
                </a>
              </dd>
            </div>
            <div className="py-4 grid grid-cols-3 gap-4 items-start">
              <dt className="text-right col-span-1 font-semibold text-gray-700 pt-1">
                О себе
              </dt>
              <dd className="col-span-2 text-gray-900">
                Я — начинающий Frontend-разработчик, уверенно работаю с React,
                Next.js, TypeScript и Tailwind CSS. Постоянно прокачиваюсь на
                практике: создаю проекты, подключаю API, использую Redux и JSON
                Server. Ориентирован на развитие и готов к настоящей работе в
                команде.
              </dd>
            </div>
          </dl>
        </div>

        {/* Правый контейнер — Комментарии */}
        <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-lg p-10 flex flex-col">
          <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Комментарии
          </h4>
          {/* Список комментариев */}
          <div className="flex-1 mb-6 space-y-4 overflow-y-auto max-h-80">
            {/* Пример комментария */}
            <div className="bg-gray-100 rounded-lg px-4 py-3">
              <div className="font-semibold text-gray-800">Анна</div>
              <div className="text-gray-700 text-sm">
                Спасибо за подробную информацию!
              </div>
              <div className="text-xs text-gray-400 mt-1">12.06.2025 08:12</div>
            </div>
            {/* Можно добавить другие комментарии */}
          </div>
          {/* Форма добавления комментария */}
          <textarea
            className="w-full min-h-[60px] rounded-xl border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 transition"
            placeholder="Оставьте ваш комментарий..."
          />
          <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition">
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
