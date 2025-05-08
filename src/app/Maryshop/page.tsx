"use client";

import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import Gallery from "../components/GalleryPhoto/Gallery";
import VideoPlayer from "../components/GalleryVideo/VideoPlayer";

const Maryshop = () => {
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
          <div className="flex flex-wrap -mx-4">
            {/* Левая часть с изображениями */}
            <div className="w-full md:w-1/2 px-4 mb-8">
              <VideoPlayer videos={maryshopVideo} />
              <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                <Gallery screenshots={maryshopScreenshots} />
              </div>
            </div>
            {/* Правая часть с текстом */}
            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-bold mb-4">Maryshop</h2>
              <p className="text-gray-700 mb-6 text-lg">
                В этом проекте реализовано - корзина товаров. Тут есть и
                регистрация, так же есть JSON-server. Добавление и удаление из
                корзины товаров.
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
                    Запуск сервера: <b>npm install</b>
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
    </>
  );
};

export default Maryshop;
