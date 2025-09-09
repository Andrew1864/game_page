"use client";

import { GitHub, Telegram, WorkOutline } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="bg-black text-white  text-center">
      {/* Верхняя часть футера */}
      <div className="container mx-auto px-4 flex flex-col items-center">
        <p className="text-lg text-gray-300 mb-2">
          Предложите мне идею что реализовать.
        </p>
        <h2 className="text-4xl font-bold mb-2">Есть проект</h2>
        <p className="text-lg text-gray-300">Давайте разговаривать.</p>
      </div>
      {/* Имя на всю ширину */}
      <div className="w-full text-5xl sm:text-7xl md:text-9xl font-bold text-gray-700 uppercase flex items-center justify-center">
        frontend
      </div>
      {/* Нижний футер */}
      <div className="bg-[#272727] text-gray-300 py-8 w-full">
        <div className="container mx-auto px-4 text-center">
          {/* Социальные иконки */}
          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="https://github.com/Andrew1864"
              className="hover:text-white"
            >
              <GitHub fontSize="large" />
            </a>
            <a href="https://t.me/Andrew1864" className="hover:text-white">
              <Telegram fontSize="large" />
            </a>
            <a
              href="https://hh.ru/resume/25c0878fff0d395dee0039ed1f6f73454d6972"
              className="hover:text-white"
            >
              <WorkOutline fontSize="large" />
            </a>
          </div>
          {/* Контактная информация */}
          <div className="text-gray-400">
            <p>Доступен для проектов</p>
            <p>&copy; {new Date().getFullYear()} Андрей. Все права защищены.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
