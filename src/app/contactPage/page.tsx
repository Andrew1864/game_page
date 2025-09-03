"use client";

import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../slices/Store";
import { handleAchievement } from "../utils/handleAchievement";
import BASE_URL from "../utils/apiConfig";

interface CommentAchievement {
  name: string;
  message: string;
  timestamp: string;
}

interface Comment {
  name: string;
  userId: string;
  achievements: CommentAchievement[];
}

const ContactPage = () => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const achievements = useSelector(
    (state: RootState) => state.user.achievements
  );
  const userId = useSelector((state: RootState) => state.user.userId);
  const userName = useSelector((state: RootState) => state.user.name);
  const dispatch = useDispatch();

  const fetchComments = async () => {
    try {
      const res = await fetch(`${BASE_URL}/comments`);
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error("Ошибка загрузки комментариев:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmitClick = async () => {
    if (!commentText.trim() || !userName) return;

    try {
      const response = await fetch(`${BASE_URL}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          progress: 10,
          achievements: [
            {
              name: userName,
              message: commentText,
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });

      await response.json();
      setCommentText("");
      await fetchComments();

      // Проверяем: если ачивка уже есть, ничего не делаем!
      if (
        userId !== null &&
        !achievements.some((ach) => ach.title === "Написал комментарий")
      ) {
        await handleAchievement({
          userId,
          dispatch,
          context: "",
          mode: "comment",
          isAdd: true,
        });
      }
      // Если ачивка уже есть — не вызываем handleAchievement и не показываем алерт
    } catch (error) {
      console.error("Ошибка при создании комментария:", error);
    }
  };

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
              {comments.length === 0 ? (
                <p className="text-gray-400 text-sm text-center">
                  Комментариев пока нет
                </p>
              ) : (
                comments.map((comment, idx) => (
                  <div key={idx} className="bg-gray-100 rounded-lg px-4 py-3">
                    <div className="font-semibold text-gray-800">
                      {comment.name}
                    </div>
                    <div className="text-gray-700 text-sm">
                      {comment.achievements[0].message}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(
                        comment.achievements[0].timestamp
                      ).toLocaleString("ru-RU")}
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* Можно добавить другие комментарии */}
          </div>
          {/* Форма добавления комментария */}
          {userId !== null && (
            <>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full h-24 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder="Оставьте ваш комментарий..."
              />
              <button
                onClick={handleSubmitClick}
                className="mt-4 w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition"
              >
                Отправить
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
