"use client";

import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import Gallery from "../components/GalleryPhoto/Gallery";
import VideoPlayer from "../components/GalleryVideo/VideoPlayer";

const GreenPulse = () => {
  const infoNewsScreenshots = [
    "https://i.imgur.com/JLDP6fr.png",
    "https://i.imgur.com/oCka4yv.png",
    "https://i.imgur.com/RhxNOxV.png",
    "https://i.imgur.com/Xu5ukib.png",
  ];

  const videoPlayer = [
    "https://drive.google.com/file/d/1R0qeiFTaRneWE7B72TGlJCX1-AV3Kaw9/preview",
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
                  <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-xl shadow-md cursor-pointer hover:bg-gray-300 transition">
                    <ThumbUpOffAltIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-xl shadow-md cursor-pointer hover:bg-gray-300 transition">
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
