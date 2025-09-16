"use client";

import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import Gallery from "../components/GalleryPhoto/Gallery";
import VideoPlayer from "../components/GalleryVideo/VideoPlayer";
import { RootState } from "../slices/Store";
import { showAlert } from "../slices/userSlice";
import { handleAchievement } from "../utils/handleAchievement";
import { utilsHandleLikeDislike } from "../utils/utilsHandleLikeDislike";
import { checkAndVisit } from "../utils/checkAndSetVisit";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const Maryshop = () => {
  const userId = useSelector((state: RootState) => state.user.userId);
  const achievements = useSelector(
    (state: RootState) => state.user.achievements
  );
  const clickedTechs = useSelector(
    (state: RootState) => state.user.clickedTechs
  );
  const dispatch = useDispatch();
  const hasLiked = clickedTechs.includes("Maryshop_like");
  const hasDisliked = clickedTechs.includes("Maryshop_dislike");

  // 👉 При первом заходе на страницу
  useEffect(() => {
    if (!userId) return;

    const achievementsSafe = Array.isArray(achievements) ? achievements : [];

    const hasAchievement = achievementsSafe.some(
      (ach) => ach.title === "Зашёл в Maryshop"
    );

    if (!hasAchievement) {
      handleAchievement({
        userId,
        dispatch,
        context: "Maryshop",
        mode: "visit",
        isAdd: true,
      });
    }

    const isRepeatVisit = checkAndVisit("MaryshopVisited");

    if (!isRepeatVisit) {
      dispatch(
        showAlert({
          isOpen: true,
          variant: "success",
          title: "Поздравляем!",
          subtitle: "Вы получили ачивку Maryshop и +10 очков!",
        })
      );
    }
  }, [userId, achievements, dispatch]);

  const maryshopScreenshots = [
    "https://i.imgur.com/mBHNHXk.png",
    "https://i.imgur.com/A2XEm8n.png",
    "https://i.imgur.com/sym7K0m.png",
    "https://i.imgur.com/oj2rY2r.png",
    "https://i.imgur.com/rCXwHlj.png",
    "https://i.imgur.com/QRMCY4q.png",
  ];

  const maryshopVideo = [
    "https://drive.google.com/file/d/1QIxXSateJr71Y7i2GfrO34GHPSILWfn2/preview",
  ];

  const handleLikeDislike = async (type: "like" | "dislike") => {
    if (!userId) return;

    await utilsHandleLikeDislike({
      type,
      userId,
      clickedTechs,
      dispatch,
      projectName: "Maryshop",
      onAchievement: async (isAdded) => {
        await handleAchievement({
          userId,
          dispatch,
          context: "Maryshop",
          mode: "action",
          isAdd: isAdded,
        });
      },
    });
  };

  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-800 hover:text-blue-800 hover:underline transition"
            >
              <ArrowBackIcon className="w-6 h-6" />
              <span className="text-lg font-medium">Назад</span>
            </Link>
          </div>
          <div className="flex flex-wrap -mx-4 items-start">
            {/* Левая часть с видео и изображениями */}
            <div className="w-full md:w-1/2 px-4">
              <div className="flex flex-col">
                <div className="relative w-full h-[450px] mb-4">
                  <VideoPlayer videos={maryshopVideo} />
                </div>
                <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                  <Gallery screenshots={maryshopScreenshots} />
                </div>
              </div>
            </div>
            {/* Правая часть с текстом */}
            <div className="w-full md:w-1/2 px-4">
              <div className="flex flex-col justify-start h-full">
                <h2 className="text-3xl font-bold mb-4">MaryShop</h2>
                <div className="space-y-4 mb-6">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    <span className="font-semibold text-pink-800">
                      MaryShop
                    </span>{" "}
                    — полнофункциональный интернет-магазин, разработанный на
                    React с использованием Vite. Проект демонстрирует
                    комплексный подход к созданию e-commerce приложений.
                  </p>
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-pink-900 mb-2">
                      Ключевые функции:
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>
                        <span className="font-medium">
                          Система регистрации и авторизации
                        </span>
                        пользователей
                      </li>
                      <li>
                        <span className="font-medium">Корзина товаров</span> —
                        добавление, удаление, изменение количества
                      </li>
                      <li>
                        <span className="font-medium">Избранное</span> —
                        сохранение понравившихся товаров
                      </li>
                      <li>
                        <span className="font-medium">Админ-панель</span> —
                        управление товарами и заказами
                      </li>
                      <li>
                        <span className="font-medium">
                          Работа с JSON-server
                        </span>
                        — имитация backend API
                      </li>
                      <li>
                        <span className="font-medium">Адаптивный дизайн</span> —
                        корректное отображение на всех устройствах
                      </li>
                    </ul>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Проект включает полный цикл работы с данными: от CRUD
                    операций до реализации сложной бизнес-логики корзины покупок
                    и системы пользовательских предпочтений.
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-6 mb-3">
                  <a
                    href="https://github.com/Andrew1864/Mary-Shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-xl shadow-md cursor-pointer hover:bg-gray-300 transition hover:scale-105"
                  >
                    <GitHubIcon className="w-8 h-8 text-gray-800" />
                  </a>
                  <span className="text-lg font-semibold text-gray-700">
                    Исходный код на GitHub
                  </span>
                </div>
                <div className="flex gap-6 mt-3">
                  <div
                    className={`flex items-center justify-center w-16 h-16 bg-gray-200 rounded-xl shadow-md cursor-pointer hover:bg-gray-300 transition hover:scale-105 ${
                      hasLiked ? "bg-green-200 border-2 border-green-400" : ""
                    }`}
                    onClick={() => handleLikeDislike("like")}
                  >
                    <ThumbUpOffAltIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <div
                    className={`flex items-center justify-center w-16 h-16 bg-gray-200 rounded-xl shadow-md cursor-pointer hover:bg-gray-300 transition hover:scale-105 ${
                      hasDisliked ? "bg-red-200 border-2 border-red-400" : ""
                    }`}
                    onClick={() => handleLikeDislike("dislike")}
                  >
                    <ThumbDownOffAltIcon className="w-8 h-8 text-red-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Maryshop;
