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
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAndVisit } from "../utils/checkAndSetVisit";
import { handleAchievement } from "../utils/handleAchievement";
import { utilsHandleLikeDislike } from "../utils/utilsHandleLikeDislike";

const InfoNews = () => {
  const userId = useSelector((state: RootState) => state.user.userId);
  const achievements = useSelector(
    (state: RootState) => state.user.achievements
  );
  const clickedTechs = useSelector(
    (state: RootState) => state.user.clickedTechs
  );
  const dispatch = useDispatch();
  const hasLiked = clickedTechs.includes("InfoNews_like");
  const hasDisliked = clickedTechs.includes("InfoNews_dislike");

  // Достижение за заход на проект
  useEffect(() => {
    if (!userId) return;

    const achievementsSafe = Array.isArray(achievements) ? achievements : [];

    const hasAchievement = achievementsSafe.some(
      (ach) => ach.title === "Зашёл в InfoNews"
    );

    if (!hasAchievement) {
      handleAchievement({
        userId,
        dispatch,
        context: "InfoNews",
        mode: "visit",
        isAdd: true,
      });
    }

    const isRepeatVisit = checkAndVisit("InfoNewsVisited");

    if (!isRepeatVisit) {
      dispatch(
        showAlert({
          isOpen: true,
          variant: "success",
          title: "Поздравляем!",
          subtitle: "Вы получили ачивку InfoNews и +10 очков!",
        })
      );
    }
  }, [userId, achievements, dispatch]);

  // Обработка лайка/дизлайка
  const handleLikeDislike = async (type: "like" | "dislike") => {
    if (!userId) return;

    await utilsHandleLikeDislike({
      type,
      userId,
      clickedTechs,
      dispatch,
      projectName: "InfoNews",
      onAchievement: async (isAdded) => {
        await handleAchievement({
          userId,
          dispatch,
          context: "InfoNews",
          mode: "action",
          isAdd: isAdded,
        });
      },
    });
  };

  const infoNewsScreenshots = [
    "https://i.imgur.com/2M7wfwY.png",
    "https://i.imgur.com/VB5v73g.png",
    "https://i.imgur.com/QrnMHP4.png",
    "https://i.imgur.com/DFdxb10.png",
    "https://i.imgur.com/0UwEGoZ.png",
  ];

  const videoPlayer = [
    "https://drive.google.com/file/d/11QVSCXkcemfz4ySJlLZpqtZ-BrE2n8Rs/preview",
  ];

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
                <h2 className="text-3xl font-bold mb-4">InfoNews</h2>
                <p className="text-gray-700 mb-6 text-lg">
                  В этом проекте я получаю API. Там имеется погода, биржа и даже
                  мини игра.
                </p>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Для запуска проекта локально:
                  </h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>
                      Установка зависимостей: <b>npm install</b>
                    </li>
                    <li>
                      Запуск проекта: <b>npm run dev</b>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center gap-2 mt-6 mb-3">
                  <a
                    href="https://github.com/Andrew1864/InfoNews/tree/Andrew"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-xl shadow-md cursor-pointer hover:bg-gray-300 transition"
                  >
                    <GitHubIcon className="w-8 h-8 text-gray-800" />
                  </a>
                  <span className="text-lg font-semibold text-gray-700">
                    GitHub
                  </span>
                </div>
                <div className="flex gap-6 mt-3">
                  <div
                    className={`flex items-center justify-center w-16 h-16 bg-gray-200 rounded-xl shadow-md cursor-pointer hover:bg-gray-300 transition ${
                      hasLiked ? "bg-green-200" : ""
                    }`}
                    onClick={() => handleLikeDislike("like")}
                  >
                    <ThumbUpOffAltIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <div
                    className={`flex items-center justify-center w-16 h-16 bg-gray-200 rounded-xl shadow-md cursor-pointer hover:bg-gray-300 transition ${
                      hasDisliked ? "bg-red-200" : ""
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

export default InfoNews;
