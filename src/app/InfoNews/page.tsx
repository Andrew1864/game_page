"use client";

import GitHubIcon from '@mui/icons-material/GitHub';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

const infoNews = () => {
  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4">
            {/* Левая часть с изображениями */}
            <div className="w-full md:w-1/2 px-4 mb-8">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
                alt="Product"
                className="w-full h-auto rounded-lg shadow-md mb-4"
                id="mainImage"
              ></img>
              <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                <img
                  src="https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080"
                  alt="Thumbnail 1"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                ></img>
                <img
                  src="https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
                  alt="Thumbnail 2"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                ></img>
                <img
                  src="https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
                  alt="Thumbnail 3"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                ></img>
                <img
                  src="https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
                  alt="Thumbnail 4"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                ></img>
              </div>
            </div>

            {/* Правая часть с текстом */}
            <div className="w-full md:w-1/2 px-4">
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

export default infoNews;