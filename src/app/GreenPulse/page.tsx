"use client";

import Link from "next/link";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import Gallery from "../components/GalleryPhoto/Gallery";
import VideoPlayer from "../components/GalleryVideo/VideoPlayer";
import { RootState } from "../slices/Store";
import { showAlert } from "@/app/slices/userSlice";
import { utilsHandleLikeDislike } from "../utils/utilsHandleLikeDislike";
import { handleAchievement } from "../utils/handleAchievement";
import { checkAndVisit } from "../utils/checkAndSetVisit";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const GreenPulse = () => {
  const userId = useSelector((state: RootState) => state.user.userId);
  const achievements = useSelector(
    (state: RootState) => state.user.achievements
  );
  const clickedTechs = useSelector(
    (state: RootState) => state.user.clickedTechs
  );
  const dispatch = useDispatch();
  const hasLiked = clickedTechs.includes("Green_pulse_like");
  const hasDisliked = clickedTechs.includes("Green_pulse_dislike");

  useEffect(() => {
    if (!userId) return;

    const achievementsSafe = Array.isArray(achievements) ? achievements : [];

    const hasAchievement = achievementsSafe.some(
      (ach) => ach.title === "Зашёл в Green_Pulse"
    );

    if (!hasAchievement) {
      handleAchievement({
        userId,
        dispatch,
        context: "Green_pulse",
        mode: "visit",
        isAdd: true,
      });
    }

    const isRepeatVisit = checkAndVisit("Green_pulseVisited");

    if (!isRepeatVisit) {
      dispatch(
        showAlert({
          isOpen: true,
          variant: "success",
          title: "Поздравляем!",
          subtitle: "Вы получили ачивку Green_Pulse и +10 очков!",
        })
      );
    }
  }, [userId, achievements, dispatch]);

  const greenPulseScreenshots = [
    "https://i.imgur.com/JLDP6fr.png",
    "https://i.imgur.com/oCka4yv.png",
    "https://i.imgur.com/RhxNOxV.png",
    "https://i.imgur.com/Xu5ukib.png",
  ];

  const videoPlayer = [
    "https://drive.google.com/file/d/1R0qeiFTaRneWE7B72TGlJCX1-AV3Kaw9/preview",
  ];

  const handleLikeDislike = async (type: "like" | "dislike") => {
    if (!userId) return;

    await utilsHandleLikeDislike({
      type,
      userId,
      clickedTechs,
      dispatch,
      projectName: "Green_pulse",
      onAchievement: async (isAdded) => {
        await handleAchievement({
          userId,
          dispatch,
          context: "Green_pulse",
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
          {/* Кнопка "Назад" */}
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
                  <VideoPlayer videos={videoPlayer} />
                </div>
                <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                  <Gallery screenshots={greenPulseScreenshots} />
                </div>
              </div>
            </div>
            {/* Правая часть с текстом */}
            <div className="w-full md:w-1/2 px-4">
              <div className="flex flex-col justify-start h-full">
                <h2 className="text-3xl font-bold mb-4">Green Pulse</h2>
                <div className="space-y-4 mb-6">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    <span className="font-semibold text-green-800">
                      Green Pulse
                    </span>{" "}
                    — экологический веб-проект, разработанный в команде для
                    мониторинга качества воздуха и анализа экологической
                    обстановки в различных городах.
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">
                      Ключевые функции:
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>
                        {" "}
                        <span className="font-medium">
                          Мониторинг качества воздуха
                        </span>
                        — данные по различным городам в реальном времени
                      </li>
                      <li>
                        <span className="font-medium">
                          Экологический калькулятор
                        </span>
                        — расчет уровня загрязнения и рекомендации
                      </li>
                      <li>
                        <span className="font-medium">
                          Верияфикация по email
                        </span>
                        — отправка кода подтверждения на почту
                      </li>
                      <li>
                        <span className="font-medium">Визуализация данных</span>{" "}
                        — графики и диаграммы качества воздуха
                      </li>
                      <li>
                        <span className="font-medium">Геолокация</span> —
                        автоматическое определение местоположения
                      </li>
                      <li>
                        <span className="font-medium">Уведомления</span> —
                        оповещения о качестве воздуха
                      </li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Распределение задач:
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>
                        <span className="font-medium">
                          Фронтенд (моя часть)
                        </span>
                        — разработка пользовательского интерфейса, реализация
                        калькулятора, визуализация данных
                      </li>
                      <li>
                        <span className="font-medium">
                          Бэкенд + фронтенд (коллега)
                        </span>
                        — настройка серверной части, работа с API, email
                        верификация, базы данных
                      </li>
                    </ul>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Проект демонстрирует опыт командной работы и разделения
                    обязанностей по принципу full-stack разработки, где каждый
                    участник отвечал за свою область экспертизы.
                  </p>
                </div>
                <div className="flex gap-6 mt-3">
                  <div
                    onClick={() => handleLikeDislike("like")}
                    className={`flex items-center justify-center w-16 h-16 rounded-xl shadow-md cursor-pointer transition hover:scale-105 ${
                      hasLiked
                        ? "bg-green-300 border-2 border-green-500"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    <ThumbUpOffAltIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <div
                    onClick={() => handleLikeDislike("dislike")}
                    className={`flex items-center justify-center w-16 h-16 rounded-xl shadow-md cursor-pointer transition hover:scale-105 ${
                      hasDisliked
                        ? "bg-red-300 border-2 border-red-500"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
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

export default GreenPulse;
