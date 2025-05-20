"use client";

import Link from "next/link";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import Alert from "../components/Alert/Alert";
import Gallery from "../components/GalleryPhoto/Gallery";
import VideoPlayer from "../components/GalleryVideo/VideoPlayer";
import { RootState } from "../slices/Store";
import {
  addClickedTech,
  setAchievements,
  setProgress,
} from "../slices/userSlice";
import { utilsHandleLikeDislike } from "../utils/utilsHandleLikeDislike";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const GreenPulse = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

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
    if (userId) {
      const hasAchievements = achievements.some(
        (ach) => ach.title === "Green_pulse"
      );

      const hasClicked = clickedTechs.includes("Green_pulse");
      if (!hasAchievements && !hasClicked) {
        setIsAlertOpen(true);
        dispatch(addClickedTech("Green_pulse"));
      }
    }
  }, [userId, achievements, clickedTechs, dispatch]);

  const infoNewsScreenshots = [
    "https://i.imgur.com/JLDP6fr.png",
    "https://i.imgur.com/oCka4yv.png",
    "https://i.imgur.com/RhxNOxV.png",
    "https://i.imgur.com/Xu5ukib.png",
  ];

  const videoPlayer = [
    "https://drive.google.com/file/d/1R0qeiFTaRneWE7B72TGlJCX1-AV3Kaw9/preview",
  ];

  const handleLikeDislike = (type: "like" | "dislike") => {
    if (!userId) return;

    utilsHandleLikeDislike({
      type,
      userId,
      clickedTechs,
      dispatch,
      projectName: "Green_pulse",
      onAchievement: () => handleSubmitClick(type),
    });
  };

  const handleSubmitClick = async (type: string) => {
    const achievementTitle =
      type === "like"
        ? "Поставил лайк или дизлайк в Green_pulse"
        : "Поставил лайк или дизлайк в Green_pulse";

    const newAchievement = {
      title: achievementTitle,
      points: 10,
      date: new Date().toISOString(),
      completed: true,
    };

    if (userId) {
      try {
        const res = await fetch(`http://localhost:3001/users/${userId}`);
        const user = await res.json();

        const updatedAchievements = [...user.achievements, newAchievement];

        await fetch(`http://localhost:3001/users/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            progress: user.progress + 10,
            achievements: updatedAchievements,
          }),
        });

        // Обновляем Redux Store
        dispatch(setAchievements(updatedAchievements)); // Обновляем весь список достижений
        dispatch(setProgress(user.progress + 10)); // Обновляем прогресс
        setIsAlertOpen(true);
      } catch (error) {
        console.error("Ошибка обновления:", error);
      }
    }
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
                  <Gallery screenshots={infoNewsScreenshots} />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <div className="flex flex-col justify-start h-full">
                <h2 className="text-3xl font-bold mb-4">Green_Pulse</h2>
                <p className="text-gray-700 mb-6 text-lg">
                  В этом проекте, я с коллегой реализовываем информацию о
                  загрязнение воздуха, так же у нас там есть калькулятор.
                </p>
                <div className="mb-5">
                  <h3 className="text-lg font-semibold mb-2">
                    Для запуска проекта локально:
                  </h3>
                  <h5 className="text-lg  mb-2">Для запуска бекенда:</h5>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>
                      Установка зависимостей:{" "}
                      <b>pip install -r requirements.txt</b>
                    </li>
                    <li>
                      Активация виртуального окружения:{" "}
                      <b>venv\Scripts\activate</b>
                    </li>
                    <li>
                      Так же должен быть Redis и установка Celery:{" "}
                      <b>
                        python -m celery -A core worker --loglevel=INFO
                        --pool=solo
                      </b>
                    </li>
                    <li>
                      Запуск проекта: <b>python manage.py runserver 8080</b>
                    </li>
                  </ul>
                  <ul className="list-disc list-inside text-gray-700 mt-4">
                    <h5 className="text-lg  mb-2">Для запуска фронтенд:</h5>
                    <li>
                      Запуск проекта: <b>npm run dev</b>
                    </li>
                  </ul>
                </div>
                <div className="flex gap-6 mt-3">
                  <div
                   onClick={() => handleLikeDislike("like")}
                    className={`flex items-center justify-center w-16 h-16 rounded-xl shadow-md cursor-pointer transition ${
                      hasLiked
                        ? "bg-green-300"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    <ThumbUpOffAltIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <div
                  onClick={() => handleLikeDislike("dislike")}
                    className={`flex items-center justify-center w-16 h-16 rounded-xl shadow-md cursor-pointer transition ${
                      hasDisliked
                        ? "bg-red-300"
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
      <Alert
        variant="success"
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title="Поздравляем!"
        subtitle="Вы получили ачивку и +10 очков! "
      />
    </>
  );
};

export default GreenPulse;
