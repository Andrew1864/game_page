"use client";

import { GitHub, Telegram, WorkOutline } from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {/* Здесь будет основной контент страницы */}
      </div>
      <footer className="bg-black text-white py-12 text-center">
        {/* Верхняя часть футера */}
        <div className="container mx-auto px-4 flex flex-col items-center">
          <p className="text-lg text-gray-300 mb-2">
            Let's turn your ideas into a stunning reality.
          </p>
          <h2 className="text-4xl font-bold mb-2">Have a project?</h2>
          <p className="text-lg text-gray-300">Let's Talk</p>
        </div>
        {/* Имя на всю ширину */}
        <div className="w-full bg-black text-[#272727] text-5xl font-bold py-8 text-center">
          Андрей
        </div>
        {/* Нижний футер */}
        <div className="bg-[#272727] text-gray-300 py-8 w-full">
          <div className="container mx-auto px-4 text-center">
            {/* Навигационное меню */}
            <nav className="flex justify-center space-x-6 mb-4">
              <a href="#home" className="hover:text-white">
                Главная
              </a>
              <a href="#about" className="hover:text-white">
                Обо мне
              </a>
              <a href="#work" className="hover:text-white">
                Работы
              </a>
              <a href="#services" className="hover:text-white">
                Услуги
              </a>
            </nav>
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
              <p>
                &copy; {new Date().getFullYear()} Андрей. Все права защищены.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
